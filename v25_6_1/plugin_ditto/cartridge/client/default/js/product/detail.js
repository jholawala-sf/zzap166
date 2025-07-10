'use strict';

var base = require('./base');
var detail = require('commercepayments/product/detail');


/**
 * Update availability on change event on quantity selector and on store:afterRemoveStoreSelection event.
 * If store has been selected, exit function otherwise proceed to update attributes.
 * @param {Object} element DOM Element.
 */
function updateAvailability(element) {
    var searchPID = $(element).closest('.product-detail').attr('data-pid');
    var selectorPrefix = '.product-detail[data-pid="' + searchPID + '"]';
    if ($(selectorPrefix + ' .selected-store-with-inventory').is(':visible')) {
        return;
    }

    var $productContainer = $(element).closest('.product-detail');
    if (!$productContainer.length) {
        $productContainer = $(element).closest('.modal-content').find('.product-quickview');
    }

    if ($('.bundle-items', $productContainer).length === 0) {
        base.attributeSelect($(element).find('option:selected').data('url'),
            $productContainer);
    }
}

/**
 * Registering on change event on quantity selector. If store has been selected, exist function,
 * otherwise proceed to update attributes.
 */
function availability() {
    $(document).on('change', '.quantity-select', function (e) {
        e.preventDefault();

        updateAvailability($(this));
    });

    $(document).on('store:afterRemoveStoreSelection', function (e, element) {
        e.preventDefault();
        updateAvailability(element);
    });
}
// TODO this is a strange mixed bag of what base functions we're using (lots of unused code in ditto's base)
//   REFACTOR
var exportDetails = $.extend({}, detail, { availability: availability, init: base.init, addToCart: base.addToCart });

module.exports = exportDetails;
