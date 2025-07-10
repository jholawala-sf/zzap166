const defaultConfig = {
    rows: 0,
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                dots: true,
                infinite: true,
                rows: 0,
                slidesToShow: 3,
                slidesToScroll: 3

            }
        }, {
            breakpoint: 600,
            settings: {
                dots: true,
                infinite: true,
                rows: 0,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                dots: true,
                infinite: true,
                rows: 0,
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

/**
 * Dynamically creates Bootstrap carousel from response containing images
 * @param {string} html - The carousel html
 * @param {jQuery} $productContainer - DOM element for a given product
 */
const createProductCarousel = (html, $productContainer) => {
    const $carouselContainer = $productContainer.find('.carousel-container');
    const $oldCarousel = $($carouselContainer).find('.product-carousel');

    $carouselContainer.off('touchstart click', '.slick-paging-btn');
    $oldCarousel.off('beforeChange');
    $oldCarousel.find('.product-carousel').slick('unslick');

    $($carouselContainer)
        .empty()
        .append(html);

    const $carousel = $($carouselContainer).find('.product-carousel');
    initProductCarousel($carousel);
};

/**
 * Initializes the carousel with all the necessary events
 * @param {jQuery} $carousel The jQuery object for the carousel
 */
const initProductCarousel = ($carousel) => {
    const $carouselContainer = $carousel.parents('.carousel-container');

    $carousel.slick({
        rows: 0
    });

    $carousel.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var $slickPaging = $carouselContainer.find('.slick-paging');
        $slickPaging.find('.slick-paging-btn').removeClass('active');
        $slickPaging.find(`.slick-paging-btn:nth-child(${nextSlide + 1})`).addClass('active');
    });

    $carouselContainer.on('touchstart click', '.slick-paging-btn', function () {
        $carousel.slick('slickGoTo', $(this).index());
    });
};

const initMiniCarousel = ($carousel) => {
    const recConfig = {
        rows: 0,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    if (!$carousel.data('slick')) {
        $carousel.slick(recConfig);
    } else {
        $carousel.slick();
    }
};

const initCarousel = ($carousel) => {
    if (!$carousel.data('slick')) {
        $carousel.slick(defaultConfig);
    } else {
        $carousel.slick();
    }
};

const init = () => {
    $('.carousel').each(function () {
        initCarousel($(this));
    });

    $('.product-carousel').each(function () {
        initProductCarousel($(this));
    });

    $('.mini-carousel').each(function () {
        initMiniCarousel($(this));
    });

    $('body').on('shown.bs.modal', '.modal', function () {
        $(this).find('.product-carousel').each(function () {
            initProductCarousel($(this));
        });
    });

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
                const carousels = $(mutation.addedNodes).find('.slot-carousel');
                for (let i = 0, len = carousels.length; i < len; i++) {
                    initCarousel($(carousels[i]));
                }
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
};

module.exports = {
    init,
    methods: {
        createProductCarousel
    }
};
