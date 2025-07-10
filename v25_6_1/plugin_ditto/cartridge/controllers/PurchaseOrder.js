'use strict';

/**
 * @namespace PurchaseOrder
 */

const server = require('server');
const csrfProtection = require('*/cartridge/scripts/middleware/csrf');

/**
 * applies purchase order to basket
 */
server.post(
    'Submit',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var PaymentManager = require('dw/order/PaymentMgr');
        var HookManager = require('dw/system/HookMgr');
        var Resource = require('dw/web/Resource');
        var checkoutHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');


        var viewData = {};
        var formFieldErrors = [];
        var paymentForm = server.forms.getForm('billing');

        var paymentMethodIdValue = paymentForm.paymentMethod.value;
        if (!PaymentManager.getPaymentMethod(paymentMethodIdValue).paymentProcessor) {
            throw new Error(Resource.msg(
                'error.payment.processor.missing',
                'checkout',
                null
            ));
        }

        var paymentProcessor = PaymentManager.getPaymentMethod(paymentMethodIdValue).getPaymentProcessor();
        var paymentFormResult;
        if (HookManager.hasHook('app.payment.form.processor.' + paymentProcessor.ID.toLowerCase())) {
            paymentFormResult = HookManager.callHook(
                'app.payment.form.processor.' + paymentProcessor.ID.toLowerCase(),
                'processForm',
                req,
                paymentForm,
                viewData
            );
        } else {
            paymentFormResult = HookManager.callHook('app.payment.form.processor.default_form_processor', 'processForm');
        }

        if (paymentFormResult.error && paymentFormResult.fieldErrors) {
            formFieldErrors.push(paymentFormResult.fieldErrors);
        }

        if (formFieldErrors.length || paymentFormResult.serverErrors) {
            // respond with form data and errors
            res.json({
                form: paymentForm,
                fieldErrors: formFieldErrors,
                serverErrors: paymentFormResult.serverErrors ? paymentFormResult.serverErrors : [],
                error: true
            });
            return next();
        }

        res.setViewData(paymentFormResult.viewData);

        this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
            var BasketMgr = require('dw/order/BasketMgr');
            var HookMgr = require('dw/system/HookMgr');
            var PaymentMgr = require('dw/order/PaymentMgr');
            var Transaction = require('dw/system/Transaction');
            var AccountModel = require('*/cartridge/models/account');
            var OrderModel = require('*/cartridge/models/order');
            var URLUtils = require('dw/web/URLUtils');
            var Locale = require('dw/util/Locale');
            var basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');
            var hooksHelper = require('*/cartridge/scripts/helpers/hooks');

            var currentBasket = BasketMgr.getCurrentBasket();

            var billingData = res.getViewData();

            if (!currentBasket) {
                delete billingData.paymentInformation;
                res.json({
                    error: true,
                    cartError: true,
                    fieldErrors: [],
                    serverErrors: [],
                    redirectUrl: URLUtils.url('Cart-Show').toString()
                });
                return;
            }

            var billingForm = server.forms.getForm('billing');
            var paymentMethodID = billingData.paymentMethod.value;
            var result;

            // check to make sure there is a payment processor
            var processor = PaymentMgr.getPaymentMethod(paymentMethodID).getPaymentProcessor();
            if (!processor) {
                throw new Error(Resource.msg(
                    'error.payment.processor.missing',
                    'checkout',
                    null
                ));
            }

            if (HookMgr.hasHook('app.payment.processor.' + processor.ID.toLowerCase())) {
                result = HookMgr.callHook(
                    'app.payment.processor.' + processor.ID.toLowerCase(),
                    'Handle',
                    currentBasket,
                    billingData.paymentInformation,
                    paymentMethodID,
                    req
                );
            } else {
                result = HookMgr.callHook('app.payment.processor.default', 'Handle');
            }

            // need to invalidate fields
            if (result.error) {
                delete billingData.paymentInformation;
                res.json({
                    form: billingForm,
                    fieldErrors: result.fieldErrors,
                    serverErrors: result.serverErrors,
                    error: true
                });
                return;
            }

            // Calculate the basket
            Transaction.wrap(function () {
                basketCalculationHelpers.calculateTotals(currentBasket);
            });

            // Re-calculate the payments.
            var calculatedPaymentTransaction = checkoutHelpers.calculatePaymentTransaction(currentBasket);
            if (calculatedPaymentTransaction.error) {
                res.json({
                    form: paymentForm,
                    fieldErrors: [],
                    serverErrors: [Resource.msg('error.technical', 'checkout', null)],
                    error: true
                });
                return;
            }

            var usingMultiShipping = req.session.privacyCache.get('usingMultiShipping');
            if (usingMultiShipping === true && currentBasket.shipments.length < 2) {
                req.session.privacyCache.set('usingMultiShipping', false);
                usingMultiShipping = false;
            }

            hooksHelper('app.customer.subscription', 'subscribeTo', [paymentForm.subscribe.checked, currentBasket.customerEmail], function () {});

            var currentLocale = Locale.getLocale(req.locale.id);

            var basketModel = new OrderModel(
                currentBasket,
                { usingMultiShipping: usingMultiShipping, countryCode: currentLocale.country, containerView: 'basket' }
            );

            var accountModel = new AccountModel(req.currentCustomer);
            var renderedStoredPaymentInstrument = checkoutHelpers.getRenderedPaymentInstruments(
                req,
                accountModel
            );

            delete billingData.paymentInformation;

            res.json({
                renderedPaymentInstruments: renderedStoredPaymentInstrument,
                customer: accountModel,
                order: basketModel,
                form: billingForm,
                error: false
            });
        });

        return next();
    }
);

server.append('Submit', function (req, res, next) {
    this.on('route:BeforeComplete', function () {
        const BasketMgr = require('dw/order/BasketMgr');
        const Locale = require('dw/util/Locale');
        const AccountModel = require('*/cartridge/models/account');
        const OrderModel = require('*/cartridge/models/order');
        const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');
        const viewData = purchaseOrderHelpers.isPurchaseOrderLimitError(res.getViewData());

        if (viewData.poLimitError) {
            var currentBasket = BasketMgr.getCurrentBasket();
            if (currentBasket) {
                var accountModel = new AccountModel(req.currentCustomer);
                var usingMultiShipping = req.session.privacyCache.get('usingMultiShipping');
                if (usingMultiShipping === true && currentBasket.shipments.length < 2) {
                    req.session.privacyCache.set('usingMultiShipping', false);
                    usingMultiShipping = false;
                }
                var currentLocale = Locale.getLocale(req.locale.id);
                var basketModel = new OrderModel(
                    currentBasket,
                    {
                        usingMultiShipping: usingMultiShipping,
                        countryCode: currentLocale.country,
                        containerView: 'basket'
                    }
                );
                viewData.customer = accountModel;
                viewData.order = basketModel;
            }
        }

        res.setViewData(viewData);
    });
    next();
});

/**
 * removes purchase order payment instrument from basket
 */
server.post(
    'RemovePaymentInstrument',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        const BasketMgr = require('dw/order/BasketMgr');
        const Locale = require('dw/util/Locale');
        const Transaction = require('dw/system/Transaction');
        const AccountModel = require('*/cartridge/models/account');
        const OrderModel = require('*/cartridge/models/order');
        const basketCalculationHelpers = require('*/cartridge/scripts/helpers/basketCalculationHelpers');
        const checkoutHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
        const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

        var currentBasket = BasketMgr.getCurrentBasket();
        if (!currentBasket) {
            res.json({
                success: false
            });
            return next();
        }

        var uuid = req.querystring.uuid;
        if (uuid) {
            // remove the purchase order payment instrument
            Transaction.wrap(function () {
                purchaseOrderHelpers.removePurchaseOrderPaymentInstrument(currentBasket, uuid);
            });

            // Calculate the basket
            Transaction.wrap(function () {
                basketCalculationHelpers.calculateTotals(currentBasket);
            });

            // Re-calculate the payments.
            checkoutHelpers.calculatePaymentTransaction(currentBasket);
        }

        var usingMultiShipping = req.session.privacyCache.get('usingMultiShipping');
        if (usingMultiShipping === true && currentBasket.shipments.length < 2) {
            req.session.privacyCache.set('usingMultiShipping', false);
            usingMultiShipping = false;
        }

        var currentLocale = Locale.getLocale(req.locale.id);
        var basketModel = new OrderModel(currentBasket, {
            usingMultiShipping: usingMultiShipping,
            countryCode: currentLocale.country,
            containerView: 'basket'
        });

        var accountModel = new AccountModel(req.currentCustomer);
        var renderedPaymentInstruments = checkoutHelpers.getRenderedPaymentInstruments(req, accountModel);

        var viewData = {
            success: true,
            renderedPaymentInstruments: renderedPaymentInstruments,
            customer: accountModel,
            order: basketModel
        };

        res.json(viewData);
        return next();
    }
);

module.exports = server.exports();
