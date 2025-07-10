'use strict';

const PURCHASE_ORDER_PAYMENT_METHOD_ID = 'Purchase Order';

/**
 * Get purchase order configuration
 * @param {dw.order.Basket} basket - the current basket
 * @returns {Object} - purchase order configuration
 */
function getPurchaseOrderConfig(basket) {
    const BasketMgr = require('dw/order/BasketMgr');
    const Locale = require('dw/util/Locale');
    const PaymentMgr = require('dw/order/PaymentMgr');

    var currentLocale = Locale.getLocale(request.locale);
    var countryCode = currentLocale.country;

    var paymentMethods;
    var purchaseOrderPaymentMethod;

    if (!basket) {
        basket = BasketMgr.getCurrentBasket();
    }

    if (basket) {
        paymentMethods = PaymentMgr.getApplicablePaymentMethods(basket.customer, countryCode, basket.totalGrossPrice.value);
        if (paymentMethods.length) {
            for (var i = 0; i < paymentMethods.length; i++) {
                var paymentMethod = paymentMethods[i];
                if (paymentMethod.ID === PURCHASE_ORDER_PAYMENT_METHOD_ID) {
                    purchaseOrderPaymentMethod = paymentMethod;
                    break;
                }
            }
        }
    }

    return {
        isActive: purchaseOrderPaymentMethod && purchaseOrderPaymentMethod.active,
        labels: getPurchaseOrderLabels(paymentMethod)
    }

}

function getLabel(customLabels, labelKey, resourceKey, defaultMessage) {
    const Resource = require('dw/web/Resource');
    if (customLabels && Object.hasOwnProperty.call(customLabels, labelKey) && customLabels[labelKey]) {
        return customLabels[labelKey];
    }
    return resourceKey ? Resource.msg(resourceKey, 'payment', defaultMessage) : defaultMessage;
}

/**
 * used to get customizable labels for purchase order so this can functionality can be used for other demo purposes
 */
function getPurchaseOrderLabels() {
    const Logger = require('dw/system/Logger');
    const PaymentMgr = require('dw/order/PaymentMgr');
    const Resource = require('dw/web/Resource');

    const paymentMethod = PaymentMgr.getPaymentMethod(PURCHASE_ORDER_PAYMENT_METHOD_ID);
    const paymentMethodName = paymentMethod ? paymentMethod.name : Resource.msg('header.purchase.order', 'payment', null);
    var customLabels;

    try {
        customLabels = paymentMethod && Object.hasOwnProperty.call(paymentMethod.custom, 'customLabels') ? paymentMethod.custom.customLabels : null;
        if (customLabels) {
            customLabels = JSON.parse(customLabels);
        }
    } catch (e) {
        Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
    }

    return {
        methodName: paymentMethodName,
        removeLinkTitle: Resource.msgf('text.remove.purchaseOrder', 'payment', null, paymentMethodName),
        cardLabel: getLabel(customLabels, 'cardLabel', '', paymentMethodName),
        listHeader: getLabel(customLabels, 'listHeader', 'purchaseOrder.appliedList.header', null),
        listLabel: getLabel(customLabels, 'listLabel', 'purchaseOrder.appliedList.label', null),
        summaryLabel: getLabel(customLabels, 'summaryLabel', 'purchaseOrder.summary.label', null),
        placeHolder: getLabel(customLabels, 'placeHolder', 'purchaseOrderNumber.placeHolder', null),
        rangeError: getLabel(customLabels, 'rangeError', 'purchaseOrderNumber.rangeError', null),
        missingError: getLabel(customLabels, 'missingError', 'purchaseOrderNumber.missingError', null),
        parseError: getLabel(customLabels, 'parseError', 'purchaseOrderNumber.parseError', null),
        limitError: getLabel(customLabels, 'limitError', 'purchaseOrderNumber.limitError', null)
    };
}

/**
 * get the purchase order limit. pull from custom profile attribute first, then site pref
 * @param {String} currencyCode - currency code
 * @returns {dw.value.Money} purchase order limit
 */
function getPurchaseOrderLimit(currencyCode) {
    const Money = require('dw/value/Money');
    const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');

    var limit = new Money(0, currencyCode);
    if (customer && customer.profile) {
        var profile = customer.profile;
        limit = Object.hasOwnProperty.call(profile.custom, 'purchaseOrderLimit')
        && profile.custom.purchaseOrderLimit > 0
            ? new Money(profile.custom.purchaseOrderLimit, currencyCode)
            : limit;
    }

    if (!limit.available || limit.value <= 0) {
        var prefLimit = siteHelpers.getSitePreference('dittoPurchaseOrderLimit');
        if (prefLimit != null && prefLimit > 0) {
            limit = new Money(prefLimit, currencyCode);
        }
    }

    return limit;
}

/**
 * Check if purchase order is enabled
 * @returns {boolean} - true if purchase order is enabled
 */
function isPurchaseOrderEnabled() {
    const PaymentMgr = require('dw/order/PaymentMgr');
    var paymentMethods = PaymentMgr.getActivePaymentMethods();
    if (paymentMethods.length) {
        for (var i = 0; i < paymentMethods.length; i++) {
            var paymentMethod = paymentMethods[i];
            if (paymentMethod.active && paymentMethod.ID === PURCHASE_ORDER_PAYMENT_METHOD_ID) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Check if the error is a purchase order limit error
 * @param {Object} viewData - view data
 * @returns {Object} - updated view data
 */
function isPurchaseOrderLimitError(viewData) {
    if (viewData && viewData.error && viewData.fieldErrors && viewData.fieldErrors.length) {
        // look for purchase order field errors with id of "PO_LIMIT_REACHED".
        // if found, delete the instance and add rendered payment methods to viewData
        var fieldErrors = viewData.fieldErrors;
        for (var i = 0; i < fieldErrors.length; i++) {
            var errorObject = fieldErrors[i];
            if (Object.keys(errorObject).length) {
                Object.keys(errorObject).forEach(key => {
                    if (key === 'PO_LIMIT_REACHED') {
                        delete errorObject[key];
                        viewData.poLimitError = true;
                    }
                });
            }
        }
    }
    return viewData;
}

/**
 * Check to see if payment instrument is a purchase order
 * it could be a SF Payments split payment that uses the GIFT_CERTIFICATE payment method
 * @param {dw.order.OrderPaymentInstrument} paymentInstrument - Salesforce Payments payment instrument
 * @returns {boolean} - true if purchase order is enabled
 */
function isPurchaseOrderPaymentInstrument(paymentInstrument) {
    const PaymentInstrument = require('dw/order/PaymentInstrument');

    if (!paymentInstrument || !paymentInstrument.paymentMethod) return false;

    if (PURCHASE_ORDER_PAYMENT_METHOD_ID.equals(paymentInstrument.paymentMethod)) {
        return true;
    }

    if (PaymentInstrument.METHOD_GIFT_CERTIFICATE.equals(paymentInstrument.paymentMethod)) {
        var purchaseOrderNumber = Object.hasOwnProperty.call(paymentInstrument.custom, 'purchaseOrderNumber') ? paymentInstrument.custom.purchaseOrderNumber : null;
        if (purchaseOrderNumber) return true;
    }

    return false;
}

/**
 * Replace purchase order payment instrument in the basket
 * Salesforce Payments requires a payment instrument of GIFT_CERTIFICATE to be used for split payments
 * After the payments are complete, replace the GIFT_CERTIFICATE payment instrument with the PURCHASE_ORDER payment instrument
 * @param {dw.order.LineItemCtnr} lineItemContainer - Current user's basket/order
 * @param {dw.order.PaymentInstrument} paymentInstrument - Salesforce Payments payment instrument
 * @returns {dw.order.PaymentInstrument} - the purchase order payment instrument
 */
function replaceGiftCertificatePaymentInstrument(lineItemContainer, paymentInstrument) {
    const Transaction = require('dw/system/Transaction');

    if (!lineItemContainer || !paymentInstrument) return;

    return Transaction.wrap(function () {
        var purchaseOrderPaymentInstrument = lineItemContainer.createPaymentInstrument(PURCHASE_ORDER_PAYMENT_METHOD_ID, paymentInstrument.paymentTransaction.getAmount());
        if (!purchaseOrderPaymentInstrument) return;

        var purchaseOrderNumber = Object.hasOwnProperty.call(paymentInstrument.custom, 'purchaseOrderNumber') ? paymentInstrument.custom.purchaseOrderNumber : null;
        if (purchaseOrderNumber) {
            purchaseOrderPaymentInstrument.custom.purchaseOrderNumber = purchaseOrderNumber;
        }

        return purchaseOrderPaymentInstrument;
    });
}

/**
 * Remove purchase order payment instrument from the basket
 * @param {dw.order.Basket} currentBasket - Current basket
 * @param {string} uuid - UUID of the payment instrument to remove
 */
function removePurchaseOrderPaymentInstrument(currentBasket, uuid) {
    var paymentInstruments = currentBasket.getPaymentInstruments();
    var iterator = paymentInstruments.iterator();
    while (iterator.hasNext()) {
        var paymentInstrument = iterator.next();
        if (paymentInstrument.UUID === uuid) {
            currentBasket.removePaymentInstrument(paymentInstrument);
            break;
        }
    }
}

/**
 * Validate purchase order form fields
 * @param {Object} form - the form object with pre-validated form fields
 * @returns {Object} the names of the invalid form fields
 */
function validatePurchaseOrder(form) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Resource = require('dw/web/Resource');
    var checkoutHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');

    var result = {};
    var currentBasket = BasketMgr.getCurrentBasket();

    if (!form.paymentMethod.value) {
        if (currentBasket.totalGrossPrice.value > 0) {
            result[form.paymentMethod.htmlName] = Resource.msg('error.no.selected.payment.method', 'forms', null);
        }
        return result;
    }

    var errorObject = checkoutHelpers.validateFields(form.purchaseOrderFields);
    if (Object.keys(errorObject).length) {
        var labels = getPurchaseOrderLabels();
        Object.keys(errorObject).forEach(key => {
            if (Object.hasOwnProperty.call(labels, errorObject[key]) && labels[errorObject[key]]) {
                errorObject[key] = labels[errorObject[key]];
            } else {
                errorObject[key] = Resource.msg('purchaseOrderNumber.' + errorObject[key], 'payment', labels[errorObject[key]]);
            }
        });
    }
    return errorObject;
}

/**
 * Validate purchase order amount
 * @param {Object} form  - the form object with purchase order information
 * @param {dw.value.Money} limit - the purchase order limit
 * @returns {Object} the names of the invalid form.
 */
function validatePurchaseOrderNumberAmount(form, limit) {
    const BasketMgr = require('dw/order/BasketMgr');
    const paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');

    var result = {};
    var currentBasket = BasketMgr.getCurrentBasket();
    if (!currentBasket) return result;

    // if limit is greater than zero, ensure the entire order amount can be covered with this purchase order
    if (limit != null && limit.available && limit.value > 0) {
        var remainingTotal = paymentHelpers.getPaymentAmount(currentBasket);
        if (remainingTotal > limit.value) {
            var labels = getPurchaseOrderLabels();
            result[form.purchaseOrderNumber.htmlName] = labels.limitError;
            result.PO_LIMIT_REACHED = 'PO_LIMIT_REACHED';
        }
    }

    return result;
}

module.exports = {
    PURCHASE_ORDER_PAYMENT_METHOD_ID,
    getPurchaseOrderConfig,
    getPurchaseOrderLabels,
    getPurchaseOrderLimit,
    isPurchaseOrderEnabled,
    isPurchaseOrderLimitError,
    isPurchaseOrderPaymentInstrument,
    replaceGiftCertificatePaymentInstrument,
    removePurchaseOrderPaymentInstrument,
    validatePurchaseOrder,
    validatePurchaseOrderNumberAmount
};
