'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('SubmitBilling', function (req, res, next) {
    const BasketMgr = require('dw/order/BasketMgr');
    const URLUtils = require('dw/web/URLUtils');
    const paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');

    var viewData = res.getViewData();

    var currentBasket = BasketMgr.getCurrentBasket();
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

    // remove any existing SF payments payment instruments from the basket
    paymentHelpers.removePaymentInstruments(currentBasket);

    // see if the total cost of the order is already covered by other payment instruments (gift certificates, purchase orders, etc)
    var remainingPaymentAmount = paymentHelpers.getPaymentAmount(currentBasket);
    viewData.remainingPaymentAmount = remainingPaymentAmount.value;

    res.setViewData(viewData);
    return next();
});

module.exports = server.exports();
