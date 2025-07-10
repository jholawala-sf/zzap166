var apiUtils = require('*/cartridge/scripts/apiUtils.js');
var apiImplementation = require('*/cartridge/scripts/apis/guestOrder.js');

/**
 * This SCAPI CUSTOM API endpoint is used to lookup a guest order
 * using the standard 3-factors (orderno, email, postalcode)
 *
 * It provides a SCAPI Custom API equivalent to the Custom Object API guestOrder in
 * this cartridge .
 */
exports.getGuestOrder = function () {
    try {
        const params = request.httpParameters;
        const orderNo = request.httpPath.split('/').pop();
        const email = params.c_email && params.c_email[0];
        const postalCode = params.c_postalCode && params.c_postalCode[0];
        const action = params.c_subAPI && params.c_subAPI[0];
        const lines = params.c_lines && params.c_lines[0] && params.c_lines[0].split(',');
        apiUtils.createResponse(200, apiImplementation.getOrder(orderNo, email, postalCode, action, lines));
    } catch (e) {
        apiUtils.createError(e.httpCode || 500, {
            title: e.name || 'Server error',
            type: 'https://custom.api.commercecloud.salesforce.com/documentation/error/v1/custom/guest-order/server-error',
            detail: e.message
        });
    }
};

exports.getGuestOrder.public = true;
