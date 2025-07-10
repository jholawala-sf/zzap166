'use strict';

/* API Includes */
var GiftCertificateMgr = require("dw/order/GiftCertificateMgr");
var Resource = require('dw/web/Resource');
var Transaction = require("dw/system/Transaction");

/**
 * Authorizes a payment using a gift certificate. The payment is authorized by redeeming the gift certificate and
 * simply setting the order no as transaction ID.
 * @param {string} orderNumber - order number
 * @param {Object} paymentInstrument - payment instrument
 * @param {Object} paymentProcessor - payment processor
 * @returns {Object} authorized true or error true
 */
function Authorize(orderNumber, paymentInstrument, paymentProcessor) {
    var serverErrors = [];
    var fieldErrors = {};
    var error = false;

    try {
        Transaction.wrap(function () {
            paymentInstrument.paymentTransaction.setTransactionID(orderNumber);
            paymentInstrument.paymentTransaction.setPaymentProcessor(paymentProcessor);
        });
    } catch (e) {
        error = true;
        serverErrors.push(
            Resource.msg('error.technical', 'checkout', null)
        );
    }

    // only execute if this is a gift certificate.
    // it could be a SF Payments split payment that uses the GIFT_CERTIFICATE payment method
    if (paymentInstrument.getGiftCertificateCode()) {
        var status = Transaction.wrap(function () {
            return GiftCertificateMgr.redeemGiftCertificate(paymentInstrument);
        });
        if (status.isError()) {
            error = true;
        }
    }

    return { fieldErrors: fieldErrors, serverErrors: serverErrors, error: error };
}

/**
 * no handling needed at this point for gift certificates
 * @returns {Object} object with errors
 */
function Handle() {
    return { fieldErrors: [], serverErrors: [], error: false };
}

/*
 * Module exports
 */
exports.Authorize = Authorize;
exports.Handle = Handle;
