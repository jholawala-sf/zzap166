var apiUtils = require('*/cartridge/scripts/apiUtils.js');
var apiImplementation = require('*/cartridge/scripts/apis/customerGroups.js');

/**
 * This SCAPI CUSTOM API endpoint is used to lookup customer groups
 *
 * It provides a SCAPI Custom API equivalent to the Custom Object API customerGroups in
 * this cartridge .
 */
exports.customerGroups = function () {
    try {
        apiUtils.createResponse(200, { customerGroupIds: apiImplementation.get() });
    } catch (e) {
        apiUtils.createError(e.httpCode || 500, {
            title: e.name || 'Server error',
            type: 'https://custom.api.commercecloud.salesforce.com/documentation/error/v1/custom/product-extend/server-error',
            detail: e.message
        });
    }
};

exports.customerGroups.public = true;
