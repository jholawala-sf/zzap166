'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Begin', function (req, res, next) {
    const BasketMgr = require('dw/order/BasketMgr');
    const URLUtils = require('dw/web/URLUtils');
    const paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');
    const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

    const currentBasket = BasketMgr.getCurrentBasket();
    if (!currentBasket) {
        res.redirect(URLUtils.url('Cart-Show'));
        return next();
    }

    const viewData = res.getViewData();

    // see if the total cost of the order is already covered by other payment instruments (gift certificates, purchase orders, etc)
    const remainingPaymentAmount = paymentHelpers.getPaymentAmount(currentBasket);
    viewData.remainingPaymentAmount = remainingPaymentAmount.value;

    // append purchase order details to the view data
    viewData.purchaseOrderDetails = purchaseOrderHelpers.getPurchaseOrderConfig(currentBasket);

    res.setViewData(viewData);
    next();
});


module.exports = server.exports();
