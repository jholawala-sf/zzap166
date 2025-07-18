'use strict';

var customerHelpers = require('base/checkout/customer');
var addressHelpers = require('base/checkout/address');
var shippingHelpers = require('base/checkout/shipping');
var billingHelpers = require('commercepayments/checkout/billing');
var summaryHelpers = require('../../checkout/summary');
var formHelpers = require('base/checkout/formErrors');
var scrollAnimate = require('base/components/scrollAnimate');
var purchaseOrderHelpers = require('../../checkout/purchaseOrder');

/**
 * Create the jQuery Checkout Plugin.
 *
 * This jQuery plugin will be registered on the dom element in checkout.isml with the
 * id of "checkout-main".
 *
 * The checkout plugin will handle the different state the user interface is in as the user
 * progresses through the varying forms such as shipping and payment.
 *
 * Billing info and payment info are used a bit synonymously in this code.
 *
 */
(function ($) {
    $.fn.checkout = function () { // eslint-disable-line
        var plugin = this;

        //
        // Collect form data from user input
        //
        var formData = {
            // Customer Data
            customer: {},

            // Shipping Address
            shipping: {},

            // Billing Address
            billing: {},

            // Payment
            payment: {},

            // Gift Codes
            giftCode: {}
        };

        //
        // The different states/stages of checkout
        //
        var checkoutStages = [
            'customer',
            'shipping',
            'payment',
            'placeOrder'
        ];

        /**
         * Updates the URL to determine stage
         * @param {number} currentStage - The current stage the user is currently on in the checkout
         */
        function updateUrl(currentStage) {
            history.pushState(
                checkoutStages[currentStage],
                document.title,
                location.pathname
                + '?stage='
                + checkoutStages[currentStage]
                + '#'
                + checkoutStages[currentStage]
            );
        }

        /**
         * Gets the billing address
         * @returns {Object} the billing address in a serialized format
         */
        function getBillingAddressForm() {
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

            return billingAddressForm;
        }

        /**
         * Gets the Contact information
         * @returns {Object} the contact information in a serialized format
         */
        function getContactInfoForm() {
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

            return contactInfoForm;
        }

        /**
         * Submits the billing address form after payment intent confirmation
         * @param {$.Deferred} defer - The object to resolve or reject based on the submission response
         * @param {Object} confirmResult - The result of confirming the payment
         */
        function submitBilling(defer, confirmResult) {
            var billingAddressForm = getBillingAddressForm();

            var paymentInfoSelector = '#dwfrm_billing .salesforce-payments-fields :input';
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

            // Include billing form because of the csrf token.
            var paymentForm;
            var placeOrderUrl;
            if (confirmResult && confirmResult.orderNo) {
                paymentForm = {
                    orderID: confirmResult.orderNo,
                    orderToken: confirmResult.orderToken
                };
                placeOrderUrl = $('.place-order').data('submit-order-url');
            } else if (confirmResult && 'remainingPaymentAmount' in confirmResult && confirmResult.remainingPaymentAmount <= 0) {
                placeOrderUrl = $('.place-order').data('place-order-url');
            } else {
                paymentForm = billingAddressForm + '&' + paymentInfoForm;
                placeOrderUrl = $('.place-order').data('action');
            }

            // disable the Place Order button here
            $('body').trigger('checkout:disableButton', '.next-step-button button');

            $.ajax({
                url: placeOrderUrl,
                method: 'POST',
                data: paymentForm || undefined,
                success: function (data) {
                    // look for field validation errors
                    if (data.error) {
                        // enable the next:Place Order button here
                        $('body').trigger('checkout:enableButton', '.next-step-button button');

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

                        if (data.cartError) {
                            window.location.href = data.redirectUrl;
                            defer.reject();
                        } else {
                            // go to appropriate stage and display error message
                            defer.reject(data);
                        }
                    } else {
                        var redirect = $('<form>')
                            .appendTo(document.body)
                            .attr({
                                method: 'POST',
                                action: data.continueUrl
                            });

                        $('<input>')
                            .appendTo(redirect)
                            .attr({
                                name: 'orderID',
                                value: data.orderID
                            });

                        $('<input>')
                            .appendTo(redirect)
                            .attr({
                                name: 'orderToken',
                                value: data.orderToken
                            });

                        redirect.submit();

                        defer.resolve(data);
                    }
                },
                error: function (err) {
                    // enable the next:Place Order button here
                    $('body').trigger('checkout:enableButton', '.next-step-button button');
                    if (err.responseJSON && err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    }
                }
            });
        }

        /**
         * Trigger the event to refresh the payment methods if the billing country has changed.
         * @param {order} data - order data that encapsulates the billing information
         * @param {string} billingCountry - the previous billing country
         */
        function refreshPaymentMethodsOnBillingCountryChange(data, billingCountry) {
            // If the billing country has changed, then trigger a refresh of the payment methods
            var billingCountryAfterSubmit;
            try {
                billingCountryAfterSubmit = data.order.billing.billingAddress.address.countryCode.value;
            } catch (e) {
                // If there is no billing country after submit, then pass null.
                billingCountryAfterSubmit = null;
            }

            if (billingCountry !== billingCountryAfterSubmit) {
                $('body')
                    .trigger('checkout:billingCountrySelected', {
                        billingDetails: {
                            address: {
                                country: billingCountryAfterSubmit
                            }
                        }
                    });
            }
        }

        //
        // Local member methods of the Checkout plugin
        //
        var members = {

            // initialize the currentStage variable for the first time
            currentStage: 0,

            /**
             * Set or update the checkout stage (AKA the shipping, billing, payment, etc... steps)
             * @returns {Object} a promise
             */
            updateStage: function () {
                var stage = checkoutStages[members.currentStage];
                var defer = $.Deferred(); // eslint-disable-line

                if (stage === 'customer') {
                    // Disable the Pay Now button here
                    $('body').trigger('checkout:disableButton', '.salesforce-paymentrequest-element');

                    //
                    // Clear Previous Errors
                    //
                    customerHelpers.methods.clearErrors();

                    //
                    // Submit the Customer Form
                    //
                    var customerFormSelector = customerHelpers.methods.isGuestFormActive() ? customerHelpers.vars.GUEST_FORM : customerHelpers.vars.REGISTERED_FORM;
                    var customerForm = $(customerFormSelector);
                    $.ajax({
                        url: customerForm.attr('action'),
                        type: 'post',
                        data: customerForm.serialize(),
                        success: function (data) {
                            if (data.redirectUrl) {
                                window.location.href = data.redirectUrl;
                            } else {
                                customerHelpers.methods.customerFormResponse(defer, data);

                                // Enable the Pay Now button here
                                $('body').trigger('checkout:enableButton', '.salesforce-paymentrequest-element');
                            }
                        },
                        error: function (err) {
                            if (err.responseJSON && err.responseJSON.redirectUrl) {
                                window.location.href = err.responseJSON.redirectUrl;
                            }

                            // Enable the Pay Now button here
                            $('body').trigger('checkout:enableButton', '.salesforce-paymentrequest-element');

                            // Server error submitting form
                            defer.reject(err.responseJSON);
                        }
                    });
                    return defer;
                } else if (stage === 'shipping') {
                    //
                    // Clear Previous Errors
                    //
                    formHelpers.clearPreviousErrors('.shipping-form');

                    var billingCountry = $('.billing-address-block .billingCountry').val();

                    //
                    // Submit the Shipping Address Form
                    //
                    var isMultiShip = $('#checkout-main').hasClass('multi-ship');
                    var formSelector = isMultiShip ?
                        '.multi-shipping .active form' : '.single-shipping .shipping-form';
                    var form = $(formSelector);

                    if (isMultiShip && form.length === 0) {
                        // disable the next:Place Order button here
                        $('body').trigger('checkout:disableButton', '.next-step-button button');
                        // in case the multi ship form is already submitted
                        var url = $('#checkout-main').attr('data-checkout-get-url');
                        $.ajax({
                            url: url,
                            method: 'GET',
                            success: function (data) {
                                // enable the next:Payment button here
                                $('body').trigger('checkout:enableButton', '.next-step-button button');
                                if (!data.error) {
                                    $('body').trigger('checkout:updateCheckoutView',
                                        { order: data.order, customer: data.customer });
                                    refreshPaymentMethodsOnBillingCountryChange(data, billingCountry);
                                    defer.resolve();
                                } else if (data.message && $('.shipping-error .alert-danger').length < 1) {
                                    var errorMsg = data.message;
                                    var errorHtml = '<div class="alert alert-danger alert-dismissible valid-cart-error ' +
                                        'fade show" role="alert">' +
                                        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                                        '<span aria-hidden="true">&times;</span>' +
                                        '</button>' + errorMsg + '</div>';
                                    $('.shipping-error').append(errorHtml);
                                    scrollAnimate($('.shipping-error'));
                                    defer.reject();
                                } else if (data.redirectUrl) {
                                    window.location.href = data.redirectUrl;
                                }
                            },
                            error: function () {
                                // enable the next:Payment button here
                                $('body').trigger('checkout:enableButton', '.next-step-button button');
                                // Server error submitting form
                                defer.reject();
                            }
                        });
                    } else {
                        var shippingFormData = form.serialize();

                        $('body').trigger('checkout:serializeShipping', {
                            form: form,
                            data: shippingFormData,
                            callback: function (data) {
                                shippingFormData = data;
                            }
                        });
                        // disable the next:Place Order button here
                        $('body').trigger('checkout:disableButton', '.next-step-button button');
                        $.ajax({
                            url: form.attr('action'),
                            type: 'post',
                            data: shippingFormData,
                            success: function (data) {
                                // enable the next:Payment button here
                                $('body').trigger('checkout:enableButton', '.next-step-button button');
                                shippingHelpers.methods.shippingFormResponse(defer, data);
                                refreshPaymentMethodsOnBillingCountryChange(data, billingCountry);
                            },
                            error: function (err) {
                                // enable the next:Payment button here
                                $('body').trigger('checkout:enableButton', '.next-step-button button');
                                if (err.responseJSON && err.responseJSON.redirectUrl) {
                                    window.location.href = err.responseJSON.redirectUrl;
                                }
                                // Server error submitting form
                                defer.reject(err.responseJSON);
                            }
                        });
                    }
                    return defer;
                } else if (stage === 'payment') {
                    //
                    // Submit the Billing Address Form
                    //

                    formHelpers.clearPreviousErrors('.payment-form');

                    // Validate billing info first before submit payment
                    var billingAddressForm = getBillingAddressForm();
                    var contactInfoForm = getContactInfoForm();
                    var paymentForm = billingAddressForm + '&' + contactInfoForm;

                    // disable the next:Place Order button here
                    $('body').trigger('checkout:disableButton', '.next-step-button button');

                    $.ajax({
                        url: $('.place-order').data('submit-billing-url'),
                        type: 'post',
                        data: paymentForm,
                        success: function (data) {
                            // look for field validation errors
                            if (data.error) {
                                // enable the next:Place Order button here
                                $('body').trigger('checkout:enableButton', '.next-step-button button');

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

                                if (data.cartError) {
                                    window.location.href = data.redirectUrl;
                                    defer.reject();
                                } else {
                                    // go to appropriate stage and display error message
                                    defer.reject(data);
                                }
                            } else {
                                // Confirm payment before billing submission
                                $('body').trigger('checkout:confirmPayment', {
                                    remainingPaymentAmount: data.remainingPaymentAmount,
                                    billingDetails: data.billingDetails,
                                    callback: function (confirmResult) {
                                        return submitBilling(defer, confirmResult);
                                    },
                                    errorCallback: function (confirmResult) {
                                        if (confirmResult && confirmResult.orderNo) {
                                            $.ajax({
                                                url: $('.place-order').data('fail-order-url'),
                                                method: 'POST',
                                                data: {
                                                    orderID: confirmResult.orderNo,
                                                    orderToken: confirmResult.orderToken
                                                },
                                                success: function () {
                                                    // enable the next:Place Order button here
                                                    $('body').trigger('checkout:enableButton', '.next-step-button button');
                                                },
                                                error: function (err) {
                                                    // enable the next:Place Order button here
                                                    $('body').trigger('checkout:enableButton', '.next-step-button button');
                                                    if (err.responseJSON && err.responseJSON.redirectUrl) {
                                                        window.location.href = err.responseJSON.redirectUrl;
                                                    }
                                                }
                                            });
                                        } else {
                                            // enable the next:Place Order button here
                                            $('body').trigger('checkout:enableButton', '.next-step-button button');
                                        }
                                    }
                                });
                            }
                        },
                        error: function (err) {
                            // enable the next:Place Order button here
                            $('body').trigger('checkout:enableButton', '.next-step-button button');
                            if (err.responseJSON && err.responseJSON.redirectUrl) {
                                window.location.href = err.responseJSON.redirectUrl;
                            }
                        }
                    });

                    return defer;
                }
                var p = $('<div>').promise(); // eslint-disable-line
                setTimeout(function () {
                    p.done(); // eslint-disable-line
                }, 500);
                return p; // eslint-disable-line
            },

            /**
             * Initialize the checkout stage.
             *
             * TODO: update this to allow stage to be set from server?
             */
            initialize: function () {
                // set the initial state of checkout
                members.currentStage = checkoutStages
                    .indexOf($('.data-checkout-stage').data('checkout-stage'));
                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);

                //
                // Handle login buttons
                //
                $('body').on('click', '.submit-customer-login', function (e) {
                    e.preventDefault();
                    members.nextStage();
                });

                $('body').on('click', '.submit-customer', function (e) {
                    e.preventDefault();
                    members.nextStage();
                });

                //
                // Handle Next State button click
                //
                $(plugin).on('click', '.next-step-button button', function () {
                    members.nextStage();
                });

                //
                // Handle Edit buttons on summary cards
                //
                $('.customer-summary .edit-button', plugin).on('click', function () {
                    members.gotoStage('customer');
                });

                $('.shipping-summary .edit-button', plugin).on('click', function () {
                    if (!$('#checkout-main').hasClass('multi-ship')) {
                        $('body').trigger('shipping:selectSingleShipping');
                    }

                    members.gotoStage('shipping');
                });

                $('.payment-summary .edit-button', plugin).on('click', function () {
                    members.gotoStage('payment');
                });

                //
                // Handle multi-step checkout PayPal order approval
                //
                $('body').on('checkout:paypalOrderApproved', function () {
                    // Place the order without submitting the billing form
                    submitBilling($.Deferred());    // eslint-disable-line
                });

                //
                // remember stage (e.g. shipping)
                //
                updateUrl(members.currentStage);

                //
                // Listen for foward/back button press and move to correct checkout-stage
                //
                $(window).on('popstate', function (e) {
                    //
                    // Back button when event state less than current state in ordered
                    // checkoutStages array.
                    //
                    if (e.state === null ||
                        checkoutStages.indexOf(e.state) < members.currentStage) {
                        members.handlePrevStage(false);
                    } else if (checkoutStages.indexOf(e.state) > members.currentStage) {
                        // Forward button  pressed
                        members.handleNextStage(false);
                    }
                });

                //
                // Set the form data
                //
                plugin.data('formData', formData);
            },

            /**
             * The next checkout state step updates the css for showing correct buttons etc...
             */
            nextStage: function () {
                var promise = members.updateStage();

                promise.done(function () {
                    // Update UI with new stage
                    $('.error-message').hide();
                    members.handleNextStage(true);
                });

                promise.fail(function (data) {
                    // show errors
                    if (data) {
                        if (data.errorStage) {
                            members.gotoStage(data.errorStage.stage);

                            if (data.errorStage.step === 'billingAddress') {
                                var $billingAddressSameAsShipping = $(
                                    'input[name$="_shippingAddressUseAsBillingAddress"]'
                                );
                                if ($billingAddressSameAsShipping.is(':checked')) {
                                    $billingAddressSameAsShipping.prop('checked', false);
                                }
                            }
                        }

                        if (data.errorMessage) {
                            $('.error-message').show();
                            $('.error-message-text').text(data.errorMessage);
                        }
                    }
                });
            },

            /**
             * The next checkout state step updates the css for showing correct buttons etc...
             *
             * @param {boolean} bPushState - boolean when true pushes state using the history api.
             */
            handleNextStage: function (bPushState) {
                if (members.currentStage < checkoutStages.length - 1) {
                    // move stage forward
                    members.currentStage++;

                    //
                    // show new stage in url (e.g.payment)
                    //
                    if (bPushState) {
                        updateUrl(members.currentStage);
                    }
                }

                // Set the next stage on the DOM
                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);
            },

            /**
             * Previous State
             */
            handlePrevStage: function () {
                if (members.currentStage > 0) {
                    // move state back
                    members.currentStage--;
                    updateUrl(members.currentStage);
                }

                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);
            },

            /**
             * Use window history to go to a checkout stage
             * @param {string} stageName - the checkout state to goto
             */
            gotoStage: function (stageName) {
                members.currentStage = checkoutStages.indexOf(stageName);
                updateUrl(members.currentStage);
                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);
            }
        };

        //
        // Initialize the checkout
        //
        members.initialize();

        return this;
    };
}(jQuery));


var exports = {
    initialize: function () {
        $('#checkout-main').checkout();
    },

    updateCheckoutView: function () {
        $('body').on('checkout:updateCheckoutView', function (e, data) {
            if (data.csrfToken) {
                $("input[name*='csrf_token']").val(data.csrfToken);
            }
            customerHelpers.methods.updateCustomerInformation(data.customer, data.order);
            shippingHelpers.methods.updateMultiShipInformation(data.order);
            summaryHelpers.updateTotals(data.order.totals);
            data.order.shipping.forEach(function (shipping) {
                shippingHelpers.methods.updateShippingInformation(
                    shipping,
                    data.order,
                    data.customer,
                    data.options
                );
            });
            billingHelpers.methods.updateBillingInformation(
                data.order,
                data.customer,
                data.options
            );
            billingHelpers.methods.updatePaymentInformation(data.order, data.options);
            summaryHelpers.updateOrderProductSummaryInformation(data.order, data.options);
            purchaseOrderHelpers.methods.updatePaymentOrderPaymentList(data.order);
        });
    },

    disableButton: function () {
        $('body').on('checkout:disableButton', function (e, button) {
            $(button).attr('disabled', true);
        });
    },

    enableButton: function () {
        $('body').on('checkout:enableButton', function (e, button) {
            $(button).attr('disabled', false);
        });
    }


};

[customerHelpers, billingHelpers, shippingHelpers, addressHelpers].forEach(function (library) {
    Object.keys(library).forEach(function (item) {
        if (typeof library[item] === 'object') {
            exports[item] = $.extend({}, exports[item], library[item]);
        } else {
            exports[item] = library[item];
        }
    });
});

module.exports = exports;
