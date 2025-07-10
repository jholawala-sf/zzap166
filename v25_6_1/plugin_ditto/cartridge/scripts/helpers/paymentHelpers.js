const base = module.superModule;

/**
 * Gets the amount to be paid for the given basket or order. This is the total
 * gross price minus any applied gift certificates or purchase orders.
 * @param {Object} lineItemCtnr - either dw.order.Basket or dw.order.Order
 * @return {dw.value.Money} amount to be paid
 */
function getPaymentAmount(lineItemCtnr) {
    const PaymentInstrument = require('dw/order/PaymentInstrument');
    const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

    var amount = lineItemCtnr.totalGrossPrice;
    lineItemCtnr.getPaymentInstruments().toArray().forEach((pi) => {
        if (PaymentInstrument.METHOD_GIFT_CERTIFICATE.equals(pi.paymentMethod) || purchaseOrderHelpers.PURCHASE_ORDER_PAYMENT_METHOD_ID.equals(pi.paymentMethod)) {
            amount = amount.subtract(pi.paymentTransaction.amount);
        }
    });
    return amount;
}

/**
 * Ensure we're actually a Salesforce Payments order.
 */
function getPayPalOrder(lineItemCtnr) {
    if (base.getPaymentInstrument(lineItemCtnr)) {
        return base.getPayPalOrder(lineItemCtnr);
    }
    return null;
}

/**
 * Ensure we're actually a Salesforce Payments order.
 */
function getPaymentIntent(lineItemCtnr) {
    if (base.getPaymentInstrument(lineItemCtnr)) {
        return base.getPaymentIntent(lineItemCtnr);
    }
    return null;
}

/**
 * Returns the Salesforce Payments-related payment instrument in the given basket, if there is one.
 * @param {dw.order.Basket} basket - basket whose Salesforce Payments payment instrument to get
 * @returns {dw.order.OrderPaymentInstrument} Salesforce Payments payment instrument
 */
function getPaymentInstrument(basket) {
    if (base.getPaymentInstrument(basket)) {
        return base.getPaymentInstrument(basket);
    }
}

/**
 * Prepare a payment intent to pay for the given basket.
 * @param {dw.order.Basket} basket - basket for checkout
 * @param {string} zoneId - id of the payment zone
 * @param {string} paymentMethodType - type of payment method for payment intent
 * @param {boolean} stripeCustomerRequired - if the payment intent must have a Stripe customer
 * @param {string=} statementDescriptor - optional statement descriptor to use for the payment
 * @param {boolean} cardCaptureAutomatic - if the capture method should be automatic for card payments
 * @returns {dw.system.Status} result of creating the payment intent
 */
function preparePaymentIntent(basket, zoneId, paymentMethodType, stripeCustomerRequired, statementDescriptor, cardCaptureAutomatic) {
    const SalesforcePaymentsMgr = require('dw/extensions/payments/SalesforcePaymentsMgr');

    // Refund or cancel existing payment, if there is one
    base.reversePaymentIfNecessary(basket);

    // Remove any existing payment instruments from the basket
    base.removePaymentInstruments(basket);

    // Create a new payment intent with the latest basket calculation
    return SalesforcePaymentsMgr.createPaymentIntent(basket, basket.defaultShipment, zoneId,
        getPaymentAmount(basket), stripeCustomerRequired, {
            type: paymentMethodType,
            statementDescriptor: statementDescriptor,
            cardCaptureAutomatic: cardCaptureAutomatic
        });
}


/**
 * Returns payment instrument matching the specified payment method ID
 * @param {dw.order.Basket} basket - Current basket
 * @param {string} paymentMethodId - payment method ID
 * @param {dw.value.Money} amount - payment amount
 * @returns {dw.order.PaymentInstrument} payment instrument or null
 */
function getBasketPaymentInstrumentByPaymentMethodId(basket, paymentMethodId, amount) {
    var PaymentMgr = require('dw/order/PaymentMgr');
    if (!basket) return null;

    var paymentInstruments = basket.getPaymentInstruments();

    var iterator = paymentInstruments.iterator();
    while (iterator.hasNext()) {
        var paymentInstrument = iterator.next();
        var paymentMethod = PaymentMgr.getPaymentMethod(paymentInstrument.getPaymentMethod());
        if (paymentMethod && paymentMethod.ID === paymentMethodId && paymentInstrument.paymentTransaction.amount.value === amount) {
            return paymentInstrument;
        }
    }

    return null;
}

module.exports = Object.assign({}, base, {
    getBasketPaymentInstrumentByPaymentMethodId: getBasketPaymentInstrumentByPaymentMethodId,
    getPaymentAmount: getPaymentAmount,
    getPaymentIntent: getPaymentIntent,
    getPaymentInstrument: getPaymentInstrument,
    getPayPalOrder: getPayPalOrder,
    preparePaymentIntent: preparePaymentIntent
});
