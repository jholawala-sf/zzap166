'use strict';

const server = require('server');
const page = module.superModule;
server.extend(page);

/**
 * Set default shipment method
 * added to prevent error in store pickup when no shipping method is selected
 * @param {dw.system.Request} req - Request object
 * @param {dw.system.Response} res - Response object
 * @param {function} next - Next function
 * @returns {function} Next function
 */
const setDefaultShipmentMethod = function (req, res, next) {
    const BasketMgr = require('dw/order/BasketMgr');
    const Transaction = require('dw/system/Transaction');
    const URLUtils = require('dw/web/URLUtils');
    const shippingHelpers = require('*/cartridge/scripts/checkout/shippingHelpers');

    const currentBasket = BasketMgr.getCurrentBasket();
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

    var shipmentUUID = req.querystring.shipmentUUID || req.form.shipmentUUID;
    var shipment;

    if (shipmentUUID) {
        shipment = shippingHelpers.getShipmentByUUID(currentBasket, shipmentUUID);
    } else {
        shipment = currentBasket.defaultShipment;
    }

    if (shipment && !shipment.shippingMethod) {
        var form = server.forms.getForm('shipping');
        var shippingMethodId = form.shippingAddress
        && form.shippingAddress.shippingMethodID
        && form.shippingAddress.shippingMethodID.value
            ? form.shippingAddress.shippingMethodID.value.toString()
            : null;

        Transaction.wrap(function () {
            if (shippingMethodId) {
                shippingHelpers.selectShippingMethod(shipment, shippingMethodId);
            }

            if (!shipment.shippingMethod) {
                shippingHelpers.ensureShipmentHasMethod(shipment);
            }
        });
    }

    return next();
};

server.prepend('SubmitShipping', function (req, res, next) {
    setDefaultShipmentMethod(req, res, next);
});

server.prepend('SelectShippingMethod', function (req, res, next) {
    setDefaultShipmentMethod(req, res, next);
});

server.append('SubmitShipping', function (req, res, next) {
    this.on('route:BeforeComplete', function () {
        const viewData = res.getViewData();

        if (viewData.order
            && !viewData.order.orderEmail
            && viewData.customer
            && viewData.customer.profile
            && viewData.customer.profile.email) {
            viewData.order.orderEmail = viewData.customer.profile.email;
        }

        res.setViewData(viewData);
    });
    next();
});

module.exports = server.exports();
