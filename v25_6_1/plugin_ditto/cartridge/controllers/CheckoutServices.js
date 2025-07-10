'use strict';

/**
 * @namespace CheckoutServices
 */

var server = require('server');

server.extend(module.superModule);

/**
 * CheckoutServices-PlaceOrder : The CheckoutServices-PlaceOrder endpoint places the order
 * @name Base/CheckoutServices-PlaceOrder
 * @function
 * @memberof CheckoutServices
 * @param {middleware} - server.middleware.https
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.append('PlaceOrder', server.middleware.https, function (req, res, next) {
    req.session.raw.custom.bumpOffer = true;
    return next();
});

server.append('LoginCustomer', function (req, res, next) {
    this.on('route:Complete', function () {
        if (customer.isAuthenticated() && require('dw/system/HookMgr').hasHook('app.customer.loggedIn')) {
            require('dw/system/HookMgr').callHook(
                'app.customer.loggedIn',
                'loggedIn'
            );
        }
    });
    next();
});

module.exports = server.exports();
