var formValidation = require('base/components/formValidation');

var url;
var isDefault;

/**
 * Create an alert to display the error message
 * @param {Object} message - Error message to display
 */
function createErrorNotification(message) {
    var errorHtml = '<div class="alert alert-danger alert-dismissible valid-cart-error ' +
        'fade show" role="alert">' +
        '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
        '<span aria-hidden="true">&times;</span>' +
        '</button>' + message + '</div>';

    $('.error-messaging').append(errorHtml);
}

module.exports = {
    removeAddress: function () {
        $('.remove-address').on('click', function (e) {
            e.preventDefault();
            isDefault = $(this).data('default');
            if (isDefault) {
                url = $(this).data('url')
                    + '?addressId='
                    + $(this).data('id')
                    + '&isDefault='
                    + isDefault;
            } else {
                url = $(this).data('url') + '?addressId=' + $(this).data('id');
            }
            $('.product-to-remove').empty().append($(this).data('id'));
        });
    },

    removeAddressConfirmation: function () {
        $('.delete-confirmation-btn').click(function (e) {
            e.preventDefault();
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    $('#uuid-' + data.UUID).remove();

                    if (!$('.address-id').first().length) {
                        var noAddressMessage = $('.no-addresses-msg').text();
                        $('.list-group').text(noAddressMessage);
                        return;
                    }

                    if (isDefault) {
                        var addressId = $('.address-id').first().html();
                        var addressHeading = addressId + ' (' + data.defaultMsg + ')';
                        $('.address-id').first().html(addressHeading);
                        $('.make-default-address').first().remove();
                        $('.remove-address').first().data('default', true);
                    }
                },
                error: function (err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    } else {
                        createErrorNotification(err.responseJSON.errorMessage);
                    }
                    $.spinner().stop();
                }
            });
        });
    },

    submitAddress: function () {
        $('form.address-form').submit(function (e) {
            var $form = $(this);
            e.preventDefault();
            url = $form.attr('action');
            $form.spinner().start();
            $('form.address-form').trigger('address:submit', e);
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: $form.serialize(),
                success: function (data) {
                    $form.spinner().stop();
                    if (!data.success) {
                        formValidation($form, data);
                    } else {
                        location.href = data.redirectUrl;
                    }
                },
                error: function (err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    }
                    $form.spinner().stop();
                }
            });
            return false;
        });
    }
};
