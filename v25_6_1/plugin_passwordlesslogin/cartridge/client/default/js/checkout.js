'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    // Apple pay
    if (window.dw &&
        window.dw.applepay &&
        window.ApplePaySession &&
        window.ApplePaySession.canMakePayments()) {
        $('body').addClass('apple-pay-enabled');
    }

    if ($('#checkout-main').hasClass('commercepayments')) {
        // Commerce Payments
        try {
            processInclude(require('commercepayments/checkout/checkout'));
            processInclude(require('commercepayments/checkout/payments'));
        } catch (ex) {
            // plugin not in use
            processInclude(require('base/checkout/checkout'));
        }
    } else {
        // Instore Pickup
        try {
            processInclude(require('instorepickup/checkout/checkout'));
            processInclude(require('instorepickup/checkout/instore'));
        } catch (ex) {
            // plugin not in use
            processInclude(require('base/checkout/checkout'));
        }
    }

    // Passwordless Login
    processInclude(require('./passwordlessLogin/login'));
});
