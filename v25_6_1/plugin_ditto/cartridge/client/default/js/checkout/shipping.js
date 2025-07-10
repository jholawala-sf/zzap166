const base = require('instorepickup/checkout/shipping');
var addressHelpers = require('base/checkout/address');

/**
 * Overrides checkout/shipping.js
 */
base.selectShippingMethod = function () {
    $('.shipping-method-list').change(function () {
        var $shippingForm = $(this).parents('form');
        var methodID = $(this).val();
        var shipmentUUID = $shippingForm.find('[name=shipmentUUID]').val();
        var urlParams = addressHelpers.methods.getAddressFieldsFromUI($shippingForm);
        urlParams.shipmentUUID = shipmentUUID;
        urlParams.methodID = methodID;
        urlParams.isGift = $shippingForm.find('.gift').prop('checked');
        urlParams.giftMessage = $shippingForm.find('textarea[name$=_giftMessage]').val();

        var url = $(this).data('select-shipping-method-url');
        base.methods.selectShippingMethodAjax(url, urlParams, $(this));
    });
};

/**
 * Updates the shipping method radio buttons within shipping forms
 * Overrides instorepickup
 * @param {Object} shipping - the shipping (shipment model) model
 */
base.methods.updateShippingMethods = function (shipping) {
    var uuidEl = $('input[value=' + shipping.UUID + ']');
    if (uuidEl && uuidEl.length > 0) {
        $.each(uuidEl, function (shipmentIndex, el) {
            var form = el.form;
            if (!form) return;

            var $shippingMethodList = $('.shipping-method-list', form);

            if ($shippingMethodList && $shippingMethodList.length > 0) {
                $shippingMethodList.empty();
                var shippingMethods = shipping.applicableShippingMethods;
                var selected = shipping.selectedShippingMethod || {};
                //
                // Create the new rows for each shipping method
                //
                $.each(shippingMethods, function (methodIndex, shippingMethod) {
                    var tmpl = $('#shipping-method-template').clone();
                    // set input
                    $('option', tmpl)
                        .prop('value', shippingMethod.ID)
                        .attr('selected', shippingMethod.ID === selected.ID)
                        .attr('data-pickup', shippingMethod.storePickupEnabled);

                    // set shipping method name
                    $('.display-name', tmpl).text(shippingMethod.displayName);
                    // set or hide arrival time
                    if (shippingMethod.estimatedArrivalTime) {
                        $('.arrival-time', tmpl)
                            .text('(' + shippingMethod.estimatedArrivalTime + ')')
                            .show();
                    }
                    // set shipping cost
                    $('.shipping-cost', tmpl).text(shippingMethod.shippingCost);
                    $shippingMethodList.append(tmpl.html());
                });
            }
        });
    }

    $('body').trigger('shipping:updateShippingMethods', { shipping: shipping });
};

module.exports = base;
