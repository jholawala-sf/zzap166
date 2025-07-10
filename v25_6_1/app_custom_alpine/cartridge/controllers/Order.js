'use strict';

const server = require('server');
server.extend(module.superModule);

const BasketMgr = require('dw/order/BasketMgr');
const Logger = require('dw/system/Logger');
const OrderMgr = require('dw/order/OrderMgr');
const Transaction = require('dw/system/Transaction');
const URLUtils = require('dw/web/URLUtils');
const cartHelper = require('*/cartridge/scripts/cart/cartHelpers');

server.get('Reorder', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    if (!currentBasket) {
        res.setStatusCode(500);
        res.json({
            error: true,
            redirectUrl: URLUtils.url('Cart-Show').toString()
        });
    }

    var params = req.querystring;
    var orderID = params.orderID;

    var order = OrderMgr.getOrder(orderID);
    if (!order) {
        res.setStatusCode(500);
        res.json({
            error: true,
            redirectUrl: URLUtils.url('Cart-Show').toString()
        });
    }

    var productLineItems = order.getAllProductLineItems().iterator();
    Transaction.wrap(function () {
        while (productLineItems.hasNext()) {
            var productLineItem = productLineItems.next();
            var productId = productLineItem.productID;
            var quantity = productLineItem.quantityValue;
            if (productId && quantity > 0) {
                try {
                    cartHelper.addProductToCart(
                        currentBasket,
                        productId,
                        quantity);
                } catch (e) {
                    Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
                }
            }
        }
    });

    res.redirect(URLUtils.url('Cart-Show'));
    next();
});

module.exports = server.exports();
