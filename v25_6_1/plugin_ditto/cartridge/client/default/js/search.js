var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('./search/search'));
    processInclude(require('./product/quickView'));
    processInclude(require('./product/compare'));
    processInclude(require('./product/wishlistHeart'));

    // Shop by Store
    try {
        processInclude(require('shopbystore/search/shopByStore'));
    } catch (ex) {
        // plugin not in use
    }
});
