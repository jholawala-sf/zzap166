'use strict';

var baseCheckout = require('./baseCheckout');
const pluginBilling = require('./billing');
const pluginShipping = require('./shipping');
const pluginInstore = require('./instore');
const pluginPurchaseOrder = require('./purchaseOrder');

// overwrite baseCheckout if commerce payments are enabled
if ($('#checkout-main').hasClass('commercepayments')) {
    baseCheckout = require('../commercepayments/checkout/checkout');
}

[pluginShipping, pluginBilling, pluginInstore, pluginPurchaseOrder].forEach(function (library) {
    Object.keys(library).forEach(function (key) {
        if (typeof library[key] === 'object') {
            baseCheckout[key] = $.extend({}, baseCheckout[key], library[key]);
        } else {
            baseCheckout[key] = library[key];
        }
    });
});

module.exports = baseCheckout;
