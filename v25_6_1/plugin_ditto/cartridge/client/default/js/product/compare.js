'use strict';

var $compareBar = $('.compare-bar-wrapper');
var maxSlots = parseInt($('.compare-bar').data('max-slots'), 10);
var productsForComparison = [];
var compareButtonText = $('button.compare').text();

var lastKnownUrl = location.href;


/**
 * @typedef ProductComparisonList
 * @type Object
 * @property {string} pid - ID for product to compare
 * @property {string} imgSrc - Image URL for selected product
 */

/**
 * Compiles the HTML for a single slot
 *
 * @param {ProductComparisonList} product - Selected product to compare
 * @param {number} idx - Slot number (zero-based)
 * @return {string} - HTML for a single slot
 */
function compileSlot(product, idx) {
    var pid = product.pid;
    var name = 'pid' + idx;

    return '' +
        '<div class="col-3 selected-product">' +
            '<div class="slot" data-pid="' + pid + '">' +
                '<img src="' + product.imgSrc + '" />' +
                '<button type="button" class="close">' +
                    '<i class="fal fa-times fa-xs"></i>' +
                '</but>' +
            '</div>' +
            '<input type="hidden" name="' + name + '" value="' + pid + '" />' +
        '</div>\n';
}

/**
 * Draw and render the Compare Bar product slots
 *
 * @param {ProductComparisonList []} productsToCompare - List of ID's of the products to compare
 */
function redrawCompareSlots(productsToCompare) {
    var html = productsToCompare.map(function (product, idx) {
        return compileSlot(product, idx);
    }).join('');

    // Render empty slots
    if (productsToCompare.length < maxSlots) {
        var numAvailableSlots = maxSlots - productsToCompare.length;

        for (var i = 0; i < numAvailableSlots; i++) {
            html += '<div class="col-3 selected-product"><div class="slot"></div></div>';
        }
    }

    $('.compare-bar .product-slots').empty().append(html);
    $compareBar.removeClass('minimized');
}

/**
 * Enables/disables the Compare button, depending on whether at least two products have been
 * selected for comparison
 *
 * @param {number} numProducts - Number of products selected for comparison
 */
function setCompareButton(numProducts) {
    if (numProducts > 0) {
        $('button.compare').text(compareButtonText + '(' + numProducts + ')');
    } else {
        $('button.compare').text(compareButtonText);
    }
    if (numProducts < 2) {
        $('button.compare').attr('disabled', true);
    } else {
        $('button.compare').removeAttr('disabled');
    }
}

/**
 * Returns a copy of a list of products to compare
 *
 * @param {ProductComparisonList []} productsToCompare - List of ID's of the products to compare
 * @return {ProductComparisonList []} List of ID's of the products to compare
 */
function copyProducts(productsToCompare) {
    return productsToCompare.map(function (product) {
        var proxy = {};

        Object.keys(product).forEach(function (key) {
            proxy[key] = product[key];
        });

        return proxy;
    });
}

/**
 * Handles the selection of a product for comparison
 *
 * @param {ProductComparisonList []} products - List of ID's of the products to compare
 * @param {string} pid - ID for product to compare
 * @param {string} imgSrc - Image URL for selected product
 * @return {ProductComparisonList []} List of ID's of the products to compare
 */
function selectProduct(products, pid, imgSrc) {
    var productsToCompare = copyProducts(products) || [];

    if (productsToCompare.length < maxSlots) {
        productsToCompare.push({
            pid: pid,
            imgSrc: imgSrc
        });

        if (productsToCompare.length === maxSlots) {
            $('input[type=checkbox]:not(:checked)').attr('disabled', true);
        }

        redrawCompareSlots(productsToCompare);
        setCompareButton(productsToCompare.length);
        $compareBar.show();
    }

    return productsToCompare;
}

/**
 * Handles the deselection of a product
 *
 * @param {ProductComparisonList []} products - List of ID's of the products to compare
 * @param {string} pid - ID for product to compare
 * @return {ProductComparisonList []} List of ID's of the products to compare
 */
function deselectProduct(products, pid) {
    var productsToCompare = copyProducts(products) || [];

    productsToCompare = productsToCompare.filter(function (product) {
        return product.pid !== pid;
    });

    if (productsToCompare.length === 0) {
        $compareBar.hide();
    }

    $('input#' + pid).prop('checked', false);
    $('input[type=checkbox]:not(:checked)').removeAttr('disabled');

    redrawCompareSlots(productsToCompare);
    setCompareButton(productsToCompare.length);
    return productsToCompare;
}

/**
 * Clears the Compare Bar and hides it
 * @return {undefined}
 */
function clearCompareBar() {
    productsForComparison.forEach(function (product) {
        $(this).trigger('compare:deselected', { pid: product.pid });
    });

    productsForComparison = [];
    $('.compare input').prop('checked', false);
    $('.compare input[type=checkbox]:not(:checked)').removeAttr('disabled');
    $compareBar.removeClass('minimized');
    $compareBar.hide();
}

/**
 * Update form action url to not have query string
 * @returns {undefined}
 */
function updateSubmitUrl() {
    var form = $('.compare-products-form');
    var targetUrl = form.attr('action');
    var urlParts = targetUrl.split('?');
    if (urlParts[1]) {
        urlParts[1].split('&').forEach(function (keyValue) {
            var splittedValues = keyValue.split('=');
            var key = decodeURIComponent(splittedValues[0]);
            var value = decodeURIComponent(splittedValues[1]);
            if (key && value) {
                if (form.find('[name="' + key + '"]').length === 0) {
                    form.append('<input type="hidden" name="' + key + '" value="' + value + '" />');
                }
            }
        });
        form.attr('action', urlParts[0]);
    }
}

module.exports = {
    handleMinimize: function () {
        $('div.page').on('click', '.minimize-compare .btn', function () {
            $compareBar.toggleClass('minimized');
        });
    },
    /**
     * Handles Compare checkbox click
     */
    handleCompareClick: function () {
        $('div.page').on('click', '.compare input[type=checkbox]', function () {
            var pid = $(this).attr('id');
            var checked = $(this).is(':checked');
            var imgSrc = $(this).closest('.product-tile')
                .find('.tile-image')
                .prop('src');

            if (checked) {
                productsForComparison = selectProduct(productsForComparison, pid, imgSrc);
                $(this).trigger('compare:selected', { pid: pid });
            } else {
                productsForComparison = deselectProduct(productsForComparison, pid);
                $(this).trigger('compare:deselected', { pid: pid });
            }
        });
    },

    /**
     * Handles the Clear All link
     */
    handleClearAll: function () {
        $('.compare-bar .clear-all').on('click', function (e) {
            e.preventDefault();
            clearCompareBar();
        });
    },

    /**
     * Handles deselection of a product on the Compare Bar
     */
    deselectProductOnCompareBar: function () {
        $('.compare-bar').on('click', '.close', function () {
            var pid = $(this).closest('.slot').data('pid').toString();
            productsForComparison = deselectProduct(productsForComparison, pid);
            $(this).trigger('compare:deselected', { pid: pid });
        });
    },

    /**
     * Selects products for comparison based on the checked status of the Compare checkboxes in
     * each product tile.  Used when user goes back from the Compare Products page.
     */
    selectCheckedProducts: function () {
        $('.product-grid').ready(function () {
            if (location.hash) {
                location.hash.replace('#', '').split(',').forEach(function (id) {
                    $('input#' + id).prop('checked', 'checked');
                });
            }
            $('.compare input:checked').each(function () {
                var pid = $(this).prop('id');
                var imgSrc = $(this).closest('.product-tile')
                    .find('img.tile-image')
                    .prop('src');
                productsForComparison = selectProduct(productsForComparison, pid, imgSrc);
                $(this).trigger('compare:selected', { pid: pid });
            });
        });
    },

    /**
     * Sets the "backUrl" property to the last attribute selected URL to ensure that when the user
     * goes back from the Compare Products page, the previously selected attributes are still
     * selected and applied to the previous search.
     */
    setBackUrl: function () {
        $('.search-results').on('click', '.refinements a', function () {
            $('input[name="backUrl"]').val($(this).prop('href'));
        });
    },

    /**
     * Sets the history.pushState for history.back() to work from the Compare Products page.
     */
    setPushState: function () {
        $('.compare-products-form').on('submit', function () {
            updateSubmitUrl();
            var selectedProducts = $('.compare input:checked').map(function () { return this.id; }).get().join(',');
            history.pushState({}, document.title, lastKnownUrl + '#' + selectedProducts);
            location.hash = selectedProducts;

            $(this).find('input[name="cgid"]').attr('value', $('input.category-id').val());
        });
    },
    catchFilterChange: function () {
        $('.container').on('click', '.refinements li a, .refinement-bar a.reset', function (e) {
            e.preventDefault();
            clearCompareBar();
        });
    },
    listenToFilterChange: function () {
        $('body').on('search:filter', function (e, data) {
            lastKnownUrl = data.currentTarget.href;
        });
    }
};
