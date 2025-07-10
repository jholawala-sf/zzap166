module.exports = function () {
    $('body').on('product:updateAddToCart', function (e, response) {
        if (response.product.readyToOrder) {
            var applePayButton = $('.apple-pay-pdp', response.$productContainer);
            if (applePayButton.length !== 0) {
                applePayButton.attr('sku', response.product.id);
            } else {
                var showApplePay = true;
                if (typeof $('.cart-and-ipay').data('ipay-enabled') !== 'undefined') {
                    showApplePay = $('.cart-and-ipay').data('ipay-enabled');
                }
                if ($('.apple-pay-pdp').length === 0 && showApplePay) {
                    // eslint-disable-line no-lonely-if
                    var applePayButtonIsmlString = '<div class="pdp-apple-pay-button">'
            + '<isapplepay class="apple-pay-pdp btn btn-block"'
            + 'sku='
            + response.product.id
            + '></isapplepay>';
                    $('.cart-and-ipay').append(applePayButtonIsmlString);
                }
            }
        } else {
            $('.pdp-apple-pay-button').remove();
        }
    });
};
