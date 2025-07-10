'use strict';

const formHelpers = require('base/checkout/formErrors');
const scrollAnimate = require('base/components/scrollAnimate');

function updatePaymentOrderPaymentList(order) {
    if (order && order.billing && order.billing.payment && Object.hasOwnProperty.call(order.billing.payment, 'purchaseOrdersHtml')) {
        $('.purchase-order-payment-details').empty().html(order.billing.payment.purchaseOrdersHtml);
    }
}

var $contactBlock = $('.contact-info-block');
var $purchaseOrderBlock = $('.purchase-order-block');
if ($contactBlock.length && $purchaseOrderBlock.length) {
    $contactBlock.addClass('no-bottom-border');
}

module.exports = {
    methods: {
        updatePaymentOrderPaymentList: updatePaymentOrderPaymentList
    },

    onPurchaseOrderApplyClick: function () {
        $('body').on('click', '.apply-po-btn', function (e) {
            e.preventDefault();

            var billingAddressForm = $('#dwfrm_billing .billing-address-block :input').serialize();
            $('body').trigger('checkout:serializeBilling', {
                form: $('#dwfrm_billing .billing-address-block'),
                data: billingAddressForm,
                callback: function (data) {
                    if (data) {
                        billingAddressForm = data;
                    }
                }
            });

            var contactInfoForm = $('#dwfrm_billing .contact-info-block :input').serialize();
            $('body').trigger('checkout:serializeBilling', {
                form: $('#dwfrm_billing .contact-info-block'),
                data: contactInfoForm,
                callback: function (data) {
                    if (data) {
                        contactInfoForm = data;
                    }
                }
            });

            var paymentInfoSelector = '#dwfrm_billing .purchase-order-content .payment-form-fields :input';
            var paymentInfoForm = $(paymentInfoSelector).serialize();
            $('body').trigger('checkout:serializeBilling', {
                form: $(paymentInfoSelector),
                data: paymentInfoForm,
                callback: function (data) {
                    if (data) {
                        paymentInfoForm = data;
                    }
                }
            });

            var paymentForm = billingAddressForm + '&' + contactInfoForm + '&' + paymentInfoForm;
            $.ajax({
                url: $(this).data('action'),
                method: 'POST',
                data: paymentForm,
                success: function (data) {
                    // look for field validation errors
                    if (data.error) {
                        if (data.fieldErrors.length) {
                            data.fieldErrors.forEach(function (error) {
                                if (Object.keys(error).length) {
                                    formHelpers.loadFormErrors('.payment-form', error);
                                }
                            });
                        }

                        if (data.serverErrors.length) {
                            data.serverErrors.forEach(function (error) {
                                $('.error-message').show();
                                $('.error-message-text').text(error);
                                scrollAnimate($('.error-message'));
                            });
                        }

                        if (data.poLimitError && data.order) {
                            $('body').trigger('checkout:updateCheckoutView', {
                                order: data.order,
                                customer: data.customer
                            });
                        }
                    } else {
                        $('body').trigger('checkout:updateCheckoutView', {
                            order: data.order,
                            customer: data.customer
                        });

                        // hide payment form, purchase order covers full amount
                        $('.payment-method-form').toggle(false);
                    }
                }
            });
        });
    },

    removePurchaseOrderPaymentInstrument: function () {
        $('body').on('click', '.remove-purchase-order', function (e) {
            e.preventDefault();
            const url = $(this).data('action');
            $.spinner().start();
            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                data: {
                    csrf_token: $('input[name="csrf_token"]').val()
                },
                success: function (data) {
                    $('#purchaseOrderNumber').val('');
                    formHelpers.clearPreviousErrors('.purchase-order-content ');

                    // show commerce payments form, purchase order has been removed
                    $('.payment-method-form').toggle(true);
                    if (data.order) {
                        $('body').trigger('checkout:updateCheckoutView', {
                            order: data.order,
                            customer: data.customer
                        });
                    }
                    $.spinner().stop();
                }
            });
        });
    }
};
