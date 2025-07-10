'use strict';


/**
 * Toggle the back to top button
 */
function toggleScrollToTop() {
    var currentPosition = $(window).scrollTop();
    if (currentPosition > 110) {
        $('.back-to-top').addClass('show');
    } else {
        $('.back-to-top').removeClass('show');
    }
}

module.exports = {
    backToTop: function () {
        if ($('.back-to-top').length) {
            $(window).on('scroll', toggleScrollToTop);
            toggleScrollToTop();
        }
    }
};
