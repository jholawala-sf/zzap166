'use strict';

/**
 * This model extends the default totals model, adding a giftCertificatesApplied property for display in
 * various areas where order totals are displayed.
 */

var formatMoney = require('dw/util/StringUtils').formatMoney;

function appendProperties(totals, name, piTotal, displayNegativeAmount) {
    if (piTotal.available && piTotal.value > 0) {

        if (displayNegativeAmount) {
            piTotal = piTotal.multiply(-1);
        }

        Object.defineProperty(totals, name, {
            value: {
                value: piTotal.value,
                formatted: formatMoney(piTotal)
            },
            writable: false,
            enumerable: true
        });
    } else {
        Object.defineProperty(totals, name, {
            value: {
                value: 0,
                formatted: '0'
            },
            writable: false,
            enumerable: true
        });
    }
}

/**
 * Override for customization of totals object, adding custom logic.
 * @param {Object} lineItemContainer Line item container object used in the construction of a regular totals model
 * @returns {module.superModule} Customized totals model, with the added custom methods
 */
function customTotals(lineItemContainer) {
    const ParentTotals = module.superModule;
    const PaymentInstrument = require('dw/order/PaymentInstrument');
    const Money = require('dw/value/Money');
    const totals = new ParentTotals(lineItemContainer);
    const paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');
    const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

    var giftCertTotal = new Money(0, lineItemContainer.currencyCode);
    var purchaseOrderTotal = new Money(0, lineItemContainer.currencyCode);
    var totalGrossPrice = lineItemContainer.totalGrossPrice;
    var remainingTotal = paymentHelpers.getPaymentAmount(lineItemContainer);

    if (lineItemContainer) {
        // Calculate the sub-total of applied gift certificates and purchase orders
        lineItemContainer.getPaymentInstruments().toArray().forEach((pi) => {
            var isPurchaseOrder = purchaseOrderHelpers.isPurchaseOrderPaymentInstrument(pi);
            if (isPurchaseOrder) {
                purchaseOrderTotal = purchaseOrderTotal.add(pi.paymentTransaction.amount);
            } else if (PaymentInstrument.METHOD_GIFT_CERTIFICATE.equals(pi.paymentMethod)) {
                giftCertTotal = giftCertTotal.add(pi.paymentTransaction.amount);
                totalGrossPrice = totalGrossPrice.subtract(pi.paymentTransaction.amount);
            }
        });

        totals.grandTotal = totalGrossPrice.available ? formatMoney(totalGrossPrice) : '-';
    }

    appendProperties(totals, 'giftCertificatesApplied', giftCertTotal, true);
    appendProperties(totals, 'purchaseOrderApplied', purchaseOrderTotal, true);

    var hasPurchaseOrderTotal = !!(purchaseOrderTotal.available && purchaseOrderTotal.value > 0);
    var hasRemainingTotal = !!(remainingTotal.available && remainingTotal.value > 0);

    if (hasPurchaseOrderTotal && hasRemainingTotal) {
        appendProperties(totals, 'remainingTotal', remainingTotal, false);
    }

    return totals;
}

module.exports = customTotals;
