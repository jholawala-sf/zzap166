const toggleMobileNavigation = function () {
    $('body').toggleClass('mobile-nav-open');
    $('.modal-background').toggleClass('open');
};

module.exports = function () {
    $('.dropdown a.active').each(function () {
        const $parent = $(this).parents('.dropdown');
        $parent.find('.dropdown-toggle').text($(this).text());
    });

    $('.mega-menu__item')
        .on('mouseenter', function () {
            $(this).addClass('mega-menu_open');
            $(this)
                .find('.mega-menu__sub')
                .attr('aria-expanded', true);
        })
        .on('mouseleave', function () {
            $(this).removeClass('mega-menu_open');
            $(this)
                .find('.mega-menu__sub')
                .attr('aria-expanded', false);
        });

    $('body').on('click', '.modal-background', function () {
        if ($('body').hasClass('mobile-nav-open')) {
            toggleMobileNavigation();
        }
    });

    $('[data-toggle="slide-collapse"]').on('click', function () {
        if (!$('body').hasClass('mobile-nav-open')) {
            $(window).scrollTop(0);
        }

        toggleMobileNavigation();
    });

    $('.mobile-nav-forward').on('click', function (e) {
        e.preventDefault();
        $(this)
            .siblings('ul')
            .addClass('active');
    });

    $('.mobile-nav-previous').on('click', function (e) {
        e.preventDefault();
        $(this)
            .closest('ul')
            .removeClass('active');
    });

    const siteHeaderHeight = $('.site-header').height();
    const $body = $('body');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > siteHeaderHeight) {
            $body.addClass('minify-header');
        } else {
            $body.removeClass('minify-header');
        }
    });
    $(window).trigger('scroll');
};
