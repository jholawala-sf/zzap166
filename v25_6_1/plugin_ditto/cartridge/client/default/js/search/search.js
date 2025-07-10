/**
 * Helper for updating the search url based on the ajax request
 * @param {string} ajaxUrl The ajax url for the search query
 */
function updateUrl(ajaxUrl) {
    const baseUrl = new URL(window.location.href);
    const url = new URL(ajaxUrl, baseUrl);
    baseUrl.search = url.search;

    window.history.pushState({}, null, baseUrl);
}

/**
 * Update DOM elements with Ajax results
 *
 * @param {Object} $results - jQuery DOM element
 * @param {string} selector - DOM element to look up in the $results
 * @return {undefined}
 */
function updateDom($results, selector) {
    var $updates = $results.find(selector);
    $(selector).empty().html($updates.html());
    $('body').trigger('search:updateDom', selector);
}

/**
 * Keep refinement panes expanded/collapsed after Ajax refresh
 *
 * @param {Object} $results - jQuery DOM element
 * @return {undefined}
 */
function handleRefinements($results) {
    $('.refinement').each(function () {
        const $currentHeader = $(this).find('.refinement-header');
        const $currentBody = $(this).find('.refinement-body');
        const $activeDiv = $results.find($(this).data('refinement'));
        $activeDiv
            .find('.refinement-header')
            .attr('class', $currentHeader.attr('class'))
            .attr('aria-expanded', $currentHeader.attr('aria-expanded'));
        $activeDiv.find('.refinement-body').attr('class', $currentBody.attr('class'));
    });

    updateDom($results, '.refinements');
}

/**
 * Parse Ajax results and updated select DOM elements
 *
 * @param {string} response - Ajax response HTML code
 * @return {undefined}
 */
function parseResults(response) {
    var $results = $(response);
    var specialHandlers = {
        '.refinements': handleRefinements
    };

    // Update DOM elements that do not require special handling
    [
        '.grid-header',
        '.header-bar',
        '.header.page-title',
        '.product-grid',
        '.show-more',
        '.filter-bar',
        '.sort'
    ].forEach(function (selector) {
        updateDom($results, selector);
    });

    Object.keys(specialHandlers).forEach(function (selector) {
        specialHandlers[selector]($results);
    });
}

/**
 * This function retrieves another page of content to display in the content search grid
 * @param {JQuery} $element - the jquery element that has the click event attached
 * @param {JQuery} $target - the jquery element that will receive the response
 * @return {undefined}
 */
function getContent($element, $target) {
    var showMoreUrl = $element.data('url');
    $.spinner().start();
    $.ajax({
        url: showMoreUrl,
        method: 'GET',
        success: function (response) {
            $target.append(response);
            $.spinner().stop();
        },
        error: function () {
            $.spinner().stop();
        }
    });
}

/**
 * Update sort option URLs from Ajax response
 *
 * @param {string} response - Ajax response HTML code
 * @return {undefined}
 */
function updateSortOptions(response) {
    var $tempDom = $('<div>').append($(response));
    var sortOptions = $tempDom.find('.grid-footer').data('sort-options').options;
    sortOptions.forEach(function (option) {
        $('option.' + option.id).val(option.url);
    });
}

module.exports = {
    init: function () {
        $(window).bind('popstate', function () {
            window.location = location.href;
        });
    },
    // Display refinements bar when Menu icon clicked
    filter: function () {
        $('.search-results').on('click', '.filter-results', function () {
            $('body').addClass('refinement-bar-open');
        });
    },
    // Refinements close button
    closeRefinements: function () {
        $('.search-results').on('click', '.refinement-bar button.close, .filter-footer .filter', function () {
            $('body').removeClass('refinement-bar-open');
        });
    },
    // Handle sort order menu selection
    sort: function () {
        $('.search-results').on('change', '[name=sort-order]', function (e) {
            e.preventDefault();

            $.spinner().start();
            $(this).trigger('search:sort', this.value);
            $.ajax({
                url: this.value,
                data: { selectedUrl: this.value },
                method: 'GET',
                success: function (response) {
                    parseResults(response);
                    updateUrl(this.value);
                    $('body').trigger('search:updateDom', '.product-grid');
                    $.spinner().stop();
                },
                error: function () {
                    $.spinner().stop();
                }
            });
        });
    },
    // Show more products
    showMore: function () {
        $('.search-results').on('click', '.show-more button', function (e) {
            e.stopPropagation();
            var showMoreUrl = $(this).data('url');

            e.preventDefault();

            $.spinner().start();
            $(this).trigger('search:showMore', e);
            $.ajax({
                url: showMoreUrl,
                data: { selectedUrl: showMoreUrl },
                method: 'GET',
                success: function (response) {
                    $('.grid-footer').replaceWith(response);
                    $('body').trigger('search:updateDom', '.grid-footer');
                    updateSortOptions(response);
                    $.spinner().stop();
                },
                error: function () {
                    $.spinner().stop();
                }
            });
        });
    },
    // Handle refinement value selection and reset click
    applyFilter: function () {
        $('.search-results').on(
            'click change',
            '.refinement-link, .filter-bar .btn, .filter-footer .reset, .form-check-input',
            function (e) {
                e.preventDefault();
                e.stopPropagation();

                if ($(this).hasClass('disabled')) return;

                $.spinner().start();
                $(this).trigger('search:filter', e);

                var searchUrl = $(this).data('href') || $(this).attr('href');
                var seoUrl = $(this).data('seo-href') || searchUrl;
                if (seoUrl) {
                    window.history.pushState({}, null, seoUrl);
                }

                var attributeId = '#' + $(this).find('span').last().attr('id');
                $.ajax({
                    url: searchUrl,
                    data: {
                        page: $('.grid-footer').data('page-number'),
                        selectedUrl: searchUrl
                    },
                    method: 'GET',
                    success: function (response) {
                        parseResults(response);
                        $.spinner().stop();
                        $(attributeId).parent('button').focus();
                    },
                    error: function () {
                        $.spinner().stop();
                        $(attributeId).parent('button').focus();
                    }
                });
            }
        );
    },

    showContentTab: function () {
        // Display content results from the search
        $('.search-results').on('click', '.content-search', function () {
            if ($('#content-search-results').html() === '') {
                getContent($(this), $('#content-search-results'));
            }
        });

        // Display the next page of content results from the search
        $('.search-results').on('click', '.show-more-content button', function () {
            getContent($(this), $('#content-search-results'));
            $('.show-more-content').remove();
        });
    },

    onPopState: function () {
        $(window).on('popstate', function () {
            window.location = window.location.href;
        });
    },

    toggleFilter: function () {
        $('.refinement-bar-toggle').on('click', function () {
            $('body').toggleClass('refinement-bar-closed');

        });
    }
};
