'use strict';

let cart = require('../cart/cart');

let updateMiniCart = true;
let addedToCart = false;

/**
 * appends params to a url
 * @param {string} data - data returned from the server's ajax call
 */
function displayMessageAndRemoveFromCart(data) {
    $.spinner().stop();
    var status = data.success ? 'alert-success' : 'alert-danger';

    if ($('.add-to-wishlist-messages').length === 0) {
        $('body').append('<div class="add-to-wishlist-messages "></div>');
    }
    $('.add-to-wishlist-messages')
        .append('<div class="add-to-wishlist-alert text-center ' + status + '">' + data.msg + '</div>');

    setTimeout(function () {
        $('.add-to-wishlist-messages').remove();
    }, 1500);
    var $targetElement = $('a[data-pid="' + data.pid + '"]').closest('.product-info').find('.remove-product');
    var itemToMove = {
        actionUrl: $targetElement.data('action'),
        productID: $targetElement.data('pid'),
        productName: $targetElement.data('name'),
        uuid: $targetElement.data('uuid')
    };
    $('body').trigger('afterRemoveFromCart', itemToMove);
}

/**
 * helper function to close minicart and hide embedded service chat
 */
function toggleMiniCart(shouldOpen = false) {
    var $miniCartContainer = $('.minicart-container');
    var $embeddedServiceHelpButton = $('.embeddedServiceHelpButton');
    if (!shouldOpen) {
        $miniCartContainer.removeClass('open');
        $embeddedServiceHelpButton.removeClass('hide');
        return;
    }
    $miniCartContainer.addClass('open');
    $embeddedServiceHelpButton.addClass('hide');
}

module.exports = function () {
    cart();

    $('body').on('click', '.product-move .move', function (e) {
        e.preventDefault();
        var url = $(this).attr('href');
        var pid = $(this).data('pid');
        var optionId = $(this).closest('.product-info').find('.lineItem-options-values').data('option-id');
        var optionVal = $(this).closest('.product-info').find('.lineItem-options-values').data('value-id');
        optionId = optionId || null;
        optionVal = optionVal || null;
        if (!url || !pid) {
            return;
        }

        $.spinner().start();
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {
                pid: pid,
                optionId: optionId,
                optionVal: optionVal
            },
            success: function (data) {
                displayMessageAndRemoveFromCart(data);
            },
            error: function (err) {
                displayMessageAndRemoveFromCart(err);
            }
        });
    });

    $('.minicart').on('count:update', function (event, count) {
        if (count && $.isNumeric(count.quantityTotal)) {
            $('.minicart .minicart-quantity').text(count.quantityTotal);
            $('.minicart .minicart-link').attr({
                'aria-label': count.minicartCountOfItems,
                title: count.minicartCountOfItems
            });
        }
    });

    $('.minicart').on('touchstart click', function (e, shouldOpen = true) {
        var url = $('.minicart').data('action-url');

        if (shouldOpen) {
            toggleMiniCart(shouldOpen);
        }

        if (!updateMiniCart) return;

        $('.minicart-container')
            .spinner()
            .start();

        $.get(url, function (data) {
            $('.minicart-container').empty();
            $('.minicart-container').append(data);

            updateMiniCart = false;

            $.spinner().stop();
        });

        if (addedToCart) {
            setTimeout(function () {
                toggleMiniCart(false);
                addedToCart = false;
            }, 3000);
        }
    });

    $('body').on('touchstart click', function (e) {
        var $button = $('.minicart');
        var $container = $('.minicart-container');
        if (
            !$button.is(e.target)
            && $button.has(e.target).length === 0
            && !$container.is(e.target)
            && $container.has(e.target).length === 0
        ) {
            toggleMiniCart(false);
        }
    });

    $('body').on('touchstart click', '.btn-close', function () {
        toggleMiniCart(false);
    });

    $('body').on('change', '.minicart .quantity', function () {
        if ($(this).parents('.bonus-product-line-item').length && $('.cart-page').length) {
            window.location.reload();
        }
    });
    $('body').on('product:afterAddToCart', function () {
        updateMiniCart = true;
        addedToCart = true;

        $('.minicart').trigger('click');
    });
    $('body').on('cart:update', function () {
        var params = [];
        if ($('.cart-page').length > 0) {
            params.push(false);
        } else {
            params.push(true);
        }

        updateMiniCart = true;
        $('.minicart').trigger('click', params);
    });
};
