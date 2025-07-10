'use strict';

var base = require('base/checkout/summary');
var baseUpdateTotals = base.updateTotals;

/**
 * updates the totals summary
 * @param {Array} totals - the totals data
 */
function updateTotals(totals) {
    baseUpdateTotals.call(this, totals);

    if ('giftCertificatesApplied' in totals) {
        if (totals.giftCertificatesApplied.formatted) {
            $('.gift-certificates-applied-total').text(totals.giftCertificatesApplied.formatted);
        }
        if (totals.giftCertificatesApplied.value < 0) {
            $('.gift-certificates-applied').removeClass('hide-gift-certificates-applied');
        } else {
            $('.gift-certificates-applied').addClass('hide-gift-certificates-applied');
        }
    }

    if ('purchaseOrderApplied' in totals) {
        if (totals.purchaseOrderApplied.formatted) {
            $('.purchase-order-applied-total').text(totals.purchaseOrderApplied.formatted);
        }
        if (totals.purchaseOrderApplied.value < 0) {
            $('.purchase-order-applied').removeClass('hide-purchase-order-applied');
        } else {
            $('.purchase-order-applied').addClass('hide-purchase-order-applied');
        }
    }

    if ('remainingTotal' in totals) {
        if (totals.remainingTotal.formatted) {
            $('.remaining-order-total-amount').text(totals.remainingTotal.formatted);
        }
        if (totals.remainingTotal.value > 0) {
            $('.remaining-order-total').removeClass('hide-remaining-total');
        } else {
            $('.remaining-order-total').addClass('hide-remaining-total');
        }
    } else {
        $('.remaining-order-total').addClass('hide-remaining-total');
    }
}

base.updateTotals = updateTotals;

module.exports = base;
