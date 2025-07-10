var apiUtils = require('*/cartridge/scripts/apiUtils.js');
var apiImplementation = require('*/cartridge/scripts/apis/geoIp.js');

/**
 * This SCAPI CUSTOM API endpoint is to get location for an ip address
 *
 * It provides a SCAPI Custom API equivalent to the Custom Object API this cartridge .
 */
exports.geoIp = function () {
    try {
        const params = request.httpParameters;
        const ip = params.c_ipaddress && params.c_ipaddress.pop();

        apiUtils.createResponse(200, apiImplementation.api(ip));
    } catch (e) {
        apiUtils.createError(e.httpCode || 500, {
            title: e.name || 'Server error',
            type: 'https://custom.api.commercecloud.salesforce.com/documentation/error/v1/custom/product-extend/server-error',
            detail: e.message
        });
    }
};

exports.geoIp.public = true;
