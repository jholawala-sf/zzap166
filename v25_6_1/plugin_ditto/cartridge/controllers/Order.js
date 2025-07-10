'use strict';

/**
 * @namespace Order
 */

const server = require('server');
server.extend(module.superModule);

const BasketMgr = require('dw/order/BasketMgr');
const Resource = require('dw/web/Resource');
const Transaction = require('dw/system/Transaction');

const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
const csrfProtection = require('*/cartridge/scripts/middleware/csrf');
const somLoggedIn = require('*/cartridge/scripts/middleware/somLoggedIn');

/**
 * Order-Confirm : This endpoint is invoked when the shopper's Order is Placed and Confirmed
 * @name Base/Order-Confirm
 * @function
 * @memberof Order
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {querystringparameter} - ID - Order ID
 * @param {querystringparameter} - token - token associated with the order
 * @param {category} - sensitive
 * @param {serverfunction} - get
 */
server.replace(
    'Confirm',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
        var OrderMgr = require('dw/order/OrderMgr');
        var OrderModel = require('*/cartridge/models/order');
        var Locale = require('dw/util/Locale');

        var orderToken = req.form.orderToken ? req.form.orderToken : req.querystring.orderToken;
        var orderID = req.form.orderID ? req.form.orderID : req.querystring.orderID;

        if (!orderToken || !orderID) {
            res.render('/error', {
                message: Resource.msg('error.confirmation.error', 'confirmation', null)
            });

            return next();
        }

        var order = OrderMgr.getOrder(orderID, orderToken);

        if (!order || order.customer.ID !== req.currentCustomer.raw.ID
        ) {
            res.render('/error', {
                message: Resource.msg('error.confirmation.error', 'confirmation', null)
            });

            return next();
        }

        var config = {
            numberOfLineItems: '*'
        };

        var currentLocale = Locale.getLocale(req.locale.id);
        var replaced = req.querystring.replaced;

        var originalOrderNo;
        if (order.originalOrderNo !== order.orderNo) {
            originalOrderNo = order.originalOrderNo;
        }
        var orderModel = new OrderModel(
            order,
            { config: config, countryCode: currentLocale.country, containerView: 'order' }
        );
        var passwordForm;

        var reportingURLs = reportingUrlsHelper.getOrderReportingURLs(order);

        if (!req.currentCustomer.profile) {
            passwordForm = server.forms.getForm('newPasswords');
            passwordForm.clear();
            res.render('checkout/confirmation/confirmation', {
                order: orderModel,
                orderUUID: order.getUUID(),
                replaced: replaced,
                originalOrderNo: originalOrderNo,
                returningCustomer: false,
                passwordForm: passwordForm,
                reportingURLs: reportingURLs
            });
        } else {
            res.render('checkout/confirmation/confirmation', {
                order: orderModel,
                orderUUID: order.getUUID(),
                originalOrderNo: originalOrderNo,
                replaced: replaced,
                returningCustomer: true,
                reportingURLs: reportingURLs
            });
        }
        req.session.raw.custom.orderID = order.orderNo; // eslint-disable-line no-param-reassign
        return next();
    }
);

server.post(
    'BumpOffer',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var OrderMgr = require('dw/order/OrderMgr');
        var URLUtils = require('dw/web/URLUtils');
        var pids = request.httpParameterMap.pid.stringValues;
        var currentOrderId = req.session.raw.custom.orderID;
        var currentOrder = OrderMgr.getOrder(currentOrderId);

        var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');
        var hooksHelper = require('*/cartridge/scripts/helpers/hooks');
        var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
        var validationHelpers = require('*/cartridge/scripts/helpers/basketValidationHelpers');
        var cartHelper = require('*/cartridge/scripts/cart/cartHelpers');

        Transaction.begin();
        var currentBasket = BasketMgr.createBasketFromOrder(currentOrder);

        for (var i = 0; i < pids.length; i++) {
            var pid = pids[i];

            var product = dw.catalog.ProductMgr.getProduct(pid);
            cartHelper.addLineItem(
                currentBasket,
                product,
                1,
                [],
                null,
                currentBasket.defaultShipment
            );
        }
        Transaction.commit();

        // Calculate the basket
        Transaction.wrap(function () {
            basketCalculationHelpers.calculateTotals(currentBasket);
        });

        if (!currentBasket) {
            res.json({
                error: true,
                cartError: true,
                fieldErrors: [],
                serverErrors: [],
                redirectUrl: URLUtils.url('Cart-Show').toString()
            });
            return next();
        }

        var validatedProducts = validationHelpers.validateProducts(currentBasket);
        if (validatedProducts.error) {
            res.json({
                error: true,
                cartError: true,
                fieldErrors: [],
                serverErrors: [],
                redirectUrl: URLUtils.url('Cart-Show').toString()
            });
            return next();
        }

        if (req.session.privacyCache.get('fraudDetectionStatus')) {
            res.json({
                error: true,
                cartError: true,
                redirectUrl: URLUtils.url('Error-ErrorCode', 'err', '01').toString(),
                errorMessage: Resource.msg('error.technical', 'checkout', null)
            });

            return next();
        }

        var validationOrderStatus = hooksHelper('app.validate.order', 'validateOrder', currentBasket, require('*/cartridge/scripts/hooks/validateOrder').validateOrder);
        if (validationOrderStatus.error) {
            res.json({
                error: true,
                errorMessage: validationOrderStatus.message
            });
            return next();
        }

        // Check to make sure there is a shipping address
        if (currentBasket.defaultShipment.shippingAddress === null) {
            res.json({
                error: true,
                errorStage: {
                    stage: 'shipping',
                    step: 'address'
                },
                errorMessage: Resource.msg('error.no.shipping.address', 'checkout', null)
            });
            return next();
        }

        // Check to make sure billing address exists
        if (!currentBasket.billingAddress) {
            res.json({
                error: true,
                errorStage: {
                    stage: 'payment',
                    step: 'billingAddress'
                },
                errorMessage: Resource.msg('error.no.billing.address', 'checkout', null)
            });
            return next();
        }

        // Calculate the basket
        Transaction.wrap(function () {
            basketCalculationHelpers.calculateTotals(currentBasket);
        });

        // Re-validates existing payment instruments
        var validPayment = COHelpers.validatePayment(req, currentBasket);
        if (validPayment.error) {
            res.json({
                error: true,
                errorStage: {
                    stage: 'payment',
                    step: 'paymentInstrument'
                },
                errorMessage: Resource.msg('error.payment.not.valid', 'checkout', null)
            });
            return next();
        }

        // Re-calculate the payments.
        var calculatedPaymentTransactionTotal = COHelpers.calculatePaymentTransaction(currentBasket);
        if (calculatedPaymentTransactionTotal.error) {
            res.json({
                error: true,
                errorMessage: Resource.msg('error.technical', 'checkout', null)
            });
            return next();
        }

        // Creates a new order.
        var order = COHelpers.createOrder(currentBasket);
        if (!order) {
            res.json({
                error: true,
                errorMessage: Resource.msg('error.technical', 'checkout', null)
            });
            return next();
        }

        // Handles payment authorization
        var handlePaymentResult = COHelpers.handlePayments(order, order.orderNo);

        // Handle custom processing post authorization
        var options = {
            req: req,
            res: res
        };
        var postAuthCustomizations = hooksHelper('app.post.auth', 'postAuthorization', handlePaymentResult, order, options, require('*/cartridge/scripts/hooks/postAuthorizationHandling').postAuthorization);
        if (postAuthCustomizations && Object.prototype.hasOwnProperty.call(postAuthCustomizations, 'error')) {
            res.json(postAuthCustomizations);
            return next();
        }

        if (handlePaymentResult.error) {
            res.json({
                error: true,
                errorMessage: Resource.msg('error.technical', 'checkout', null)
            });
            return next();
        }

        var fraudDetectionStatus = hooksHelper('app.fraud.detection', 'fraudDetection', currentBasket, require('*/cartridge/scripts/hooks/fraudDetection').fraudDetection);
        if (fraudDetectionStatus.status === 'fail') {
            Transaction.wrap(function () { OrderMgr.failOrder(order, true); });

            res.json({
                error: true,
                cartError: true,
                redirectUrl: URLUtils.url('Error-ErrorCode', 'err', fraudDetectionStatus.errorCode).toString(),
                errorMessage: Resource.msg('error.technical', 'checkout', null)
            });

            return next();
        }

        // Places the order
        var placeOrderResult = COHelpers.placeOrder(order, fraudDetectionStatus);
        if (placeOrderResult.error) {
            res.json({
                error: true,
                errorMessage: Resource.msg('error.technical', 'checkout', null)
            });
            return next();
        }

        if (order.getCustomerEmail()) {
            COHelpers.sendConfirmationEmail(order, req.locale.id);
        }

        req.session.raw.custom.bumpOffer = false;
        res.redirect(URLUtils.url('Order-Confirm', 'orderID', order.orderNo, 'orderToken', order.orderToken, 'replaced', 'true'));
        next();
    }
);

/**
 * Order-History : This endpoint is invoked to get Order History for the logged in shopper
 * @name Order-History
 * @function
 * @memberof Order
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - server.middleware.https
 * @param {middleware} - somLoggedIn.validateGuestOrUserLoggedIn
 * @param {category} - sensitive
 * @param {serverfunction} - get
 */
server.replace('History',
    consentTracking.consent,
    server.middleware.https,
    somLoggedIn.validateGuestOrUserLoggedIn,
    function (req, res, next) {
        const URLUtils = require('dw/web/URLUtils');
        const orderHelpers = require('*/cartridge/scripts/order/orderHelpers');

        var breadcrumbs = [
            {
                htmlValue: Resource.msg('global.home', 'common', null),
                url: URLUtils.home().toString()
            },
            {
                htmlValue: Resource.msg('page.title.myaccount', 'account', null),
                url: URLUtils.url('Account-Show').toString()
            }
        ];
        try {
            breadcrumbs = orderHelpers.getBreadcrumbs('History', true, req);
        } catch (ex) {
            // don't need to log anything here }
        }
        var ordersResult = orderHelpers.getOrders(
            req.currentCustomer,
            req.querystring,
            req.locale.id);
        var orders = ordersResult.orders;
        var filterValues = ordersResult.filterValues;

        res.render('account/order/history', {
            orders: orders,
            filterValues: filterValues,
            orderFilter: req.querystring.orderFilter,
            accountlanding: false,
            breadcrumbs: breadcrumbs,
            apiResponseOk: Object.hasOwnProperty.call(ordersResult, 'ok') ? ordersResult.ok : null,
            exitLinkText: Resource.msg('link.orderdetails.orderhistory', 'account', null),
            exitLinkUrl: URLUtils.https('Account-Show').toString(),
            orderCardContext: 'history'
        });
        next();
    }
);

/**
 * Order-Details : This endpoint is called to get Order Details
 * @name Order-Details
 * @function
 * @memberof Order
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - server.middleware.https
 * @param {middleware} - somLoggedIn.validateGuestOrUserLoggedIn,
 * @param {querystringparameter} - orderID - Order ID
 * @param {querystringparameter} - orderFilter - Order Filter ID
 * @param {category} - sensitive
 * @param {serverfunction} - get
 */
server.replace('Details',
    consentTracking.consent,
    server.middleware.https,
    somLoggedIn.validateGuestOrUserLoggedIn,
    function (req, res, next) {
        const OrderMgr = require('dw/order/OrderMgr');
        const URLUtils = require('dw/web/URLUtils');
        const orderHelpers = require('*/cartridge/scripts/order/orderHelpers');

        var breadcrumbs = [
            {
                htmlValue: Resource.msg('global.home', 'common', null),
                url: URLUtils.home().toString()
            },
            {
                htmlValue: Resource.msg('page.title.myaccount', 'account', null),
                url: URLUtils.url('Account-Show').toString()
            },
            {
                htmlValue: Resource.msg('label.orderhistory', 'account', null),
                url: URLUtils.url('Order-History').toString()
            }
        ];
        try {
            breadcrumbs = orderHelpers.getBreadcrumbs('Details', !!req.currentCustomer.profile);
        } catch (ex) {
            // don't need to log anything here
        }

        var order = OrderMgr.getOrder(req.querystring.orderID);
        var orderCustomerNo;
        var currentCustomerNo;
        if (req.currentCustomer.profile) {
            currentCustomerNo = order.customer.profile.customerNo;
            orderCustomerNo = req.currentCustomer.profile.customerNo;
        }

        if (order && (order.customer.profile === null || (orderCustomerNo && currentCustomerNo && orderCustomerNo === currentCustomerNo))) {
            res.render('account/orderDetails', {
                exitLinkText: Resource.msg('link.orderdetails.orderhistory', 'account', null),
                exitLinkUrl: breadcrumbs[breadcrumbs.length - 1].url,
                breadcrumbs: breadcrumbs,
                order: orderHelpers.getOrderDetails(req),
                orderID: req.querystring.orderID,
                orderSummaryId: req.querystring.orderSummaryId,
                fulfillmentId: req.querystring.fulfillmentId
            });
        } else {
            res.redirect(URLUtils.https('Account-Show'));
        }
        next();
    }
);

module.exports = server.exports();
