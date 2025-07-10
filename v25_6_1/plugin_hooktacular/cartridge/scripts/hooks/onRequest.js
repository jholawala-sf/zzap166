'use strict';

/**
 * The onRequest hook is called with every top-level request in a site. This happens both for requests to cached and non-cached pages.
 * For performance reasons the hook function should be kept short.
 *
 * @module  request/onRequest
 */

/**
 * The onRequest hook function.
 */
exports.onRequest = function () {
    var isRequestResolver = request.httpParameterMap.requestResolver.booleanValue === true;

    if (isRequestResolver) {
        var URLUtils = require('dw/web/URLUtils');
        response.redirect(URLUtils.url('SystemAction-Serialize', 'url', request.httpURL.toString()));
    }
};
