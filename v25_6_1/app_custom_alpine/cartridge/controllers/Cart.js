'use strict';

const server = require('server');
server.extend(module.superModule);

const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

const BasketMgr = require('dw/order/BasketMgr');
const Logger = require('dw/system/Logger');
const Transaction = require('dw/system/Transaction');
const URLUtils = require('dw/web/URLUtils');
const cartHelper = require('*/cartridge/scripts/cart/cartHelpers');

server.post('AddMultipleProducts', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    if (!currentBasket) {
        res.setStatusCode(500);
        res.json({
            error: true,
            redirectUrl: URLUtils.url('Cart-Show').toString()
        });
    }

    if (Object.keys(req.form).length) {
        Transaction.wrap(function () {
            Object.keys(req.form).forEach((key) => {
                var keyParts = key.split('_');
                if (keyParts.length === 3 && keyParts[2] === 'productId') {
                    var productId = req.form[key];
                    var qtyField = key.replace('productId', 'quantity');
                    var quantity = parseInt(req.form[qtyField], 10) || 0;
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
        });
    }

    res.redirect(URLUtils.url('Cart-Show'));
    next();
});

server.post('AddVariantProducts', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    if (!currentBasket) {
        res.setStatusCode(500);
        res.json({
            error: true,
            redirectUrl: URLUtils.url('Cart-Show').toString()
        });
    }

    if (Object.keys(req.form).length) {
        Transaction.wrap(function () {
            Object.keys(req.form).forEach((key) => {
                if (key.substring(0, 4) === 'QTY_') {
                    var quantity = parseInt(req.form[key], 10);
                    if (quantity > 0) {
                        var fields = key.split('__');
                        if (fields.length >= 2) {
                            var productToAdd = fields[2];
                            if (productToAdd) {
                                try {
                                    cartHelper.addProductToCart(
                                        currentBasket,
                                        productToAdd,
                                        quantity);
                                } catch (e) {
                                    Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    res.redirect(URLUtils.url('Cart-Show'));
    next();
});

/**
 * For "Cart Upload" functionality - adds each item to the cart.
 */
server.post('AddCartUploadProducts', function (req, res, next) {
    var currentBasket = BasketMgr.getCurrentOrNewBasket();
    if (!currentBasket) {
        res.setStatusCode(500);
        res.json({
            error: true,
            redirectUrl: URLUtils.url('Cart-Show').toString()
        });
    }

    var listOfProducts = req.form.uploadFile ? req.form.uploadFile.split('\r\n') : [];
    if (listOfProducts.length > 0) {
        Transaction.wrap(function () {
            for (var i = 0; i < listOfProducts.length; i++) {
                var productLine = listOfProducts[i].split(',');
                var productToAdd = productLine[0].replace(/^"|"$/g, '');
                var quantity = parseInt(productLine[1], 10);

                if (productToAdd && quantity > 0) {
                    try {
                        cartHelper.addProductToCart(
                            currentBasket,
                            productToAdd,
                            quantity);
                    } catch (e) {
                        Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
                    }
                }
            }
        });
    }

    res.redirect(URLUtils.url('Cart-Show'));
    next();
});

server.get('cartUploadBegin', userLoggedIn.validateGatedCommerce, function (req, res, next) {
    res.render('cart/cartUploadPage');
    next();
});

module.exports = server.exports();
