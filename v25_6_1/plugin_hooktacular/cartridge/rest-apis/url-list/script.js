var apiUtils = require('*/cartridge/scripts/apiUtils.js');
var apiImplementation = require('*/cartridge/scripts/apis/urls.js');

/**
 * SCAPI CUSTOM API to retrieve urls
 *
 * It provides a SCAPI Custom API equivalent to the Custom Object API this cartridge .
 */
exports.urlList = function () {
    try {
        const params = request.httpParameters;

        apiUtils.createResponse(200, apiImplementation.api(params.c_types));
    } catch (e) {
        apiUtils.createError(e.httpCode || 500, {
            title: e.name || 'Server error',
            type: 'https://custom.api.commercecloud.salesforce.com/documentation/error/v1/custom/product-extend/server-error',
            detail: e.message
        });
    }
};

exports.urlList.public = true;
