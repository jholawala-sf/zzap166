'use strict';

var debounce = require('lodash/debounce');
var endpoint = $('.suggestions-wrapper').data('url');
var minChars = 3;

/**
 * Retrieves Suggestions element relative to scope
 *
 * @param {Object} scope - Search input field DOM element
 * @return {JQuery} - .suggestions-wrapper element
 */
function getSuggestionsWrapper(scope) {
    return $(scope)
        .parents('form')
        .children('.suggestions-wrapper');
}

/**
 * Tear down Suggestions panel
 */
function tearDownSuggestions() {
    $('input.search-field').val('');
    $('.search-mobile .suggestions').unbind('scroll');
    $('.suggestions-wrapper').empty();
    $('body').removeClass('site-search-active');
}

/**
 * Toggle search field icon from search to close and vice-versa
 *
 * @param {string} action - Action to toggle to
 */
function toggleSuggestionsIcon(action) {
    var mobileSearchIcon = '.search-mobile span.';
    var iconSearch = 'fa-search';
    var iconSearchClose = 'fa-close';

    if (action === 'close') {
        $(mobileSearchIcon + iconSearch)
            .removeClass(iconSearch)
            .addClass(iconSearchClose);
    } else {
        $(mobileSearchIcon + iconSearchClose)
            .removeClass(iconSearchClose)
            .addClass(iconSearch);
    }
}

/**
 * Process Ajax response for SearchServices-GetSuggestions
 *
 * @param {Object|string} response - Empty object literal if null response or string with rendered
 *                                   suggestions template contents
 */
function processResponse(response) {
    var $suggestionsWrapper = getSuggestionsWrapper(this).empty();

    $.spinner().stop();

    if (!(typeof response === 'object')) {
        $suggestionsWrapper.append(response).show();
        $('body').addClass('site-search-active');
    } else {
        $suggestionsWrapper.hide();
        $('body').removeClass('site-search-active');
    }
}

/**
 * Retrieve suggestions
 *
 * @param {Object} scope - Search field DOM element
 */
function getSuggestions(scope) {
    if ($(scope).val().length >= minChars) {
        $.spinner().start();
        $.ajax({
            context: scope,
            url: endpoint + encodeURIComponent($(scope).val()),
            method: 'GET',
            success: processResponse,
            error: function () {
                $.spinner().stop();
            }
        });
    } else {
        toggleSuggestionsIcon('search');
        getSuggestionsWrapper(scope).empty();
    }
}

module.exports = function () {
    $('input.search-field').each(function () {
    /**
     * Use debounce to avoid making an Ajax call on every single key press by waiting a few
     * hundred milliseconds before making the request. Without debounce, the user sees the
     * browser blink with every key press.
     */
        var debounceSuggestions = debounce(getSuggestions, 300);

        $(this).on('keyup click', function (e) {
            debounceSuggestions(this, e);
        });
    });

    $('body').on('click', function (e) {
        if (!$('.suggestions').has(e.target).length && !$(e.target).hasClass('search-field')) {
            $('.suggestions').hide();
        }
    });

    $('body').on('click touchend', '.search-mobile span.fa-close', function () {
        $('.suggestions').hide();
        $('body').removeClass('site-search-active');
        toggleSuggestionsIcon('search');
        tearDownSuggestions();
    });

    $('.mobile-search_btn').on('click', function () {
        $('body').toggleClass('site-search-active');
    });
};
