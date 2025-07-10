'use strict';

var Resource = require('dw/web/Resource');
var Transaction = require('dw/system/Transaction');

/**
 * Verifies that entered credit card information is a valid card. If the information is valid a
 * credit card payment instrument is created
 * @param {dw.order.Basket} basket Current users's basket
 * @param {Object} paymentInformation - the payment information
 * @param {string} paymentMethodId - payment method ID
 * @return {Object} returns an error object
 */
function Handle(basket, paymentInformation, paymentMethodId) {
    const paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');
    const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');
    const configurationHelper = require('*/cartridge/scripts/configurationHelper');

    var currentBasket = basket;
    var purchaseOrderErrors = {};
    var serverErrors = [];
    var fieldErrors = [];
    var hasError = false;
    var purchaseOrderNumber = paymentInformation.purchaseOrderNumber.value;
    var paymentsConfiguration = configurationHelper.getConfiguration();


    // Validate if we have a po payment instrument and a po number
    if (!purchaseOrderNumber || (typeof purchaseOrderNumber === 'undefined')) {
        // Invalid Payment Instrument
        var invalidPaymentMethod = Resource.msg('error.payment.not.valid', 'checkout', null);
        return { fieldErrors: [], serverErrors: [invalidPaymentMethod], error: true };
    }

    // if we are using SF payments, split payment instruments have to use the GIFT_CERTIFICATE payment method
    var customPaymentMethodId = paymentsConfiguration
        && paymentsConfiguration.multiStepCheckoutEnabled ? 'GIFT_CERTIFICATE' : paymentMethodId;

    // delete payment instruments
    Transaction.wrap(function () {
        var paymentInstruments = currentBasket.getPaymentInstruments(customPaymentMethodId);
        var iterator = paymentInstruments.iterator();
        while (iterator.hasNext()) {
            var paymentInstrumentToRemove = iterator.next();
            if (purchaseOrderHelpers.isPurchaseOrderPaymentInstrument(paymentInstrumentToRemove)) {
                currentBasket.removePaymentInstrument(paymentInstrumentToRemove);
            }
        }
    });

    var piAmount = paymentHelpers.getPaymentAmount(currentBasket);
    var limit = purchaseOrderHelpers.getPurchaseOrderLimit(currentBasket.currencyCode);
    if (limit.available && limit.value > 0) {
        purchaseOrderErrors = purchaseOrderHelpers.validatePurchaseOrderNumberAmount(paymentInformation, limit);
        if (Object.keys(purchaseOrderErrors).length) {
            piAmount = limit;
            fieldErrors.push(purchaseOrderErrors);
            hasError = true;
        }
    }

    // create payment instrument
    Transaction.wrap(function () {
        var paymentInstrument = currentBasket.createPaymentInstrument(customPaymentMethodId, piAmount);
        paymentInstrument.custom.purchaseOrderNumber = purchaseOrderNumber;
    });

    return { fieldErrors: fieldErrors, serverErrors: serverErrors, error: hasError };
}

/**
 * Authorizes a payment using a credit card. Customizations may use other processors and custom
 *      logic to authorize credit card payment.
 * @param {number} orderNumber - The current order's number
 * @param {dw.order.PaymentInstrument} paymentInstrument -  The payment instrument to authorize
 * @param {dw.order.PaymentProcessor} paymentProcessor -  The payment processor of the current
 *      payment method
 * @return {Object} returns an error object
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

    return { fieldErrors: fieldErrors, serverErrors: serverErrors, error: error };
}

exports.Handle = Handle;
exports.Authorize = Authorize;
