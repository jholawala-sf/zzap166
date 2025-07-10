'use strict';

const base = require('instorepickup/checkout/instore');
const storeLocator = require('base/storeLocator/storeLocator');

/**
 * Populate store finder html
 * @param {Object} target - Dom element that needs to be populated with store finder
 */
function loadStoreLocator(target) {
    $.ajax({
        url: target.data('url'),
        method: 'GET',
        success: function (response) {
            target.html(response.storesResultsHtml);
            storeLocator.search();
            storeLocator.changeRadius();
            storeLocator.selectStore();
            storeLocator.updateSelectStoreButton();
            if (!$('.results').data('has-results')) {
                $('.store-locator-no-results').show();
            }
        }
    });
}

/**
 * Show store locator when appropriate shipping method is selected
 * @param {Object} shippingForm - DOM element that contains current shipping form
 */
function showStoreFinder(shippingForm) {
    // hide address panel
    shippingForm.find('.shipment-selector-block').addClass('d-none');
    shippingForm.find('.shipping-address-block').addClass('d-none');
    shippingForm.find('.change-store').addClass('d-none');

    shippingForm.find('.gift-message-block').addClass('d-none');
    shippingForm.find('.gift').prop('checked', false);
    shippingForm.find('.gift-message').addClass('d-none');

    shippingForm.find('.pickup-in-store').empty().removeClass('d-none');

    loadStoreLocator(shippingForm.find('.pickup-in-store'));
}

/**
 * Hide store finder and restore address form
 * @param {Object} shippingForm - DOM element with current form
 * @param {Object} data - data containing customer and order objects
 */
function hideStoreFinder(shippingForm, data) {
    if (data.order.usingMultiShipping) {
        $('body').trigger('instore:hideMultiShipStoreFinder', {
            form: shippingForm,
            customer: data.customer,
            order: data.order
        });
    } else {
        $('body').trigger('instore:hideSingleShipStoreFinder', {
            form: shippingForm,
            customer: data.customer,
            order: data.order
        });
    }

    shippingForm.find('.pickup-in-store').addClass('d-none');
    shippingForm.find('.change-store').addClass('d-none');
    shippingForm.find('.gift-message-block').removeClass('d-none');

    shippingForm.find('input[name="storeId"]').remove();
}

base.watchForInStoreShipping = function () {
    $('body').on('checkout:updateCheckoutView', function (e, data) {
        var multiShipFlag = data.order.usingMultiShipping;
        if (!data.urlParams || !data.urlParams.shipmentUUID) {
            data.order.shipping.forEach(function (shipment) {
                var form = $('.shipping-form input[name="shipmentUUID"][value="' + shipment.UUID + '"]').closest('form');

                form.find('.pickup-in-store').data('url', shipment.pickupInstoreUrl);

                if (shipment.selectedShippingMethod && shipment.selectedShippingMethod.storePickupEnabled) {
                    showStoreFinder(form, multiShipFlag);
                } else {
                    hideStoreFinder(form, data);
                }
            });

            return;
        }

        var shipment = data.order.shipping.find(function (s) {
            return s.UUID === data.urlParams.shipmentUUID;
        });

        var shippingForm = $('.shipping-form input[name="shipmentUUID"][value="' + shipment.UUID + '"]').closest('form');
        shippingForm.find('.pickup-in-store').data('url', shipment.pickupInstoreUrl);

        if (shipment.selectedShippingMethod && shipment.selectedShippingMethod.storePickupEnabled) {
            showStoreFinder(shippingForm);
        } else {
            hideStoreFinder(shippingForm, data);
        }
    });
}

base.updateAddressLabelText = function () {
    $('body').on('shipping:updateAddressLabelText', function (e, data) {
        var addressLabelText = data.selectedShippingMethod &&
            data.selectedShippingMethod.storePickupEnabled
            ? data.resources.storeAddress
            : data.resources.shippingAddress;
        data.shippingAddressLabel.text(addressLabelText);
    });
};

module.exports = base;
