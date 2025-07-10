var apiUtils = require('*/cartridge/scripts/apiUtils.js');
var apiImplementation = require('*/cartridge/scripts/apis/sendMail.js');

/**
 * This SCAPI CUSTOM API endpoint is used to trigger an email sending
 *
 * It provides a SCAPI Custom API equivalent to the Custom Object API this cartridge .
 */
exports.sendMail = function () {
    try {
        const params = request.httpParameters;
        const action = params.c_action && params.c_action.pop();

        apiUtils.createResponse(200, apiImplementation.api(action));
    } catch (e) {
        apiUtils.createError(e.httpCode || 500, {
            title: e.name || 'Server error',
            type: 'https://custom.api.commercecloud.salesforce.com/documentation/error/v1/custom/product-extend/server-error',
            detail: e.message
        });
    }
};

exports.sendMail.public = true;
