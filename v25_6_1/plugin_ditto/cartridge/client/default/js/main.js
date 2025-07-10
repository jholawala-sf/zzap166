// eslint-disable-next-line no-multi-assign
window.jQuery = window.$ = require('jquery');

var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('base/components/cookie'));
    processInclude(require('./components/carousel'));
    processInclude(require('./components/consentTracking'));
    processInclude(require('./components/menu'));
    processInclude(require('./components/footer'));
    processInclude(require('./components/miniCart'));
    processInclude(require('./components/search'));
    processInclude(require('./components/dateTime'));
    processInclude(require('./components/tooltip'));
    processInclude(require('base/components/clientSideValidation'));
    processInclude(require('./components/countrySelector'));
    processInclude(require('./experience/assets/einsteinCarousel'));
    processInclude(require('./experience/layouts/carouselBanner'));
    processInclude(require('./documentation/documentation'));

    try {
        processInclude(require('commercepayments/components/payment'));
    } catch (err) {
    // plugin not in use
    }
});

require('./components/spinner');

require('popper.js');
require('bootstrap/js/src/util');
require('bootstrap/js/src/collapse');
require('bootstrap/js/src/dropdown');
require('bootstrap/js/src/modal');
require('bootstrap/js/src/tab');
require('bootstrap/js/src/tooltip');

require('slick-carousel/slick/slick');

