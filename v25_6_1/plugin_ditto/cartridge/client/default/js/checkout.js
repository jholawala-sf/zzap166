'use strict';

const processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('./checkout/checkout'));

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
            processInclude(require('./commercepayments/checkout/payments'));
        } catch (ex) {
            // plugin not in use
        }
    }

    try {
        // Instore pickup
        processInclude(require('instorepickup/checkout/instore'));
    } catch (ex) {
        // plugin not in use
    }

    try {
        // passwordless login
        processInclude(require('pwdless/passwordlessLogin/login'));
    } catch (err) {
        // plugin not in use
    }
});
