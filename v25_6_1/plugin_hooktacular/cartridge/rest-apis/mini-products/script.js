var apiUtils = require('*/cartridge/scripts/apiUtils.js');
var apiImplementation = require('*/cartridge/scripts/apis/productExtend.js');

/**
 * This SCAPI CUSTOM API endpoint is used to lookup a mini-product
 * without calling full shopper-product
 *
 * It provides a SCAPI Custom API equivalent to the Custom Object API productExtend in
 * this cartridge .
 */
exports.miniProducts = function () {
    try {
        const params = request.httpParameters;
        const productIds = params.c_productIds && params.c_productIds.pop().replace('(', '').replace(')', '').split(',');

        apiUtils.createResponse(200, { miniProducts: productIds.map(apiImplementation.createExtendedProduct) });
    } catch (e) {
        apiUtils.createError(e.httpCode || 500, {
            title: e.name || 'Server error',
            type: 'https://custom.api.commercecloud.salesforce.com/documentation/error/v1/custom/product-extend/server-error',
            detail: e.message
        });
    }
};

exports.miniProducts.public = true;
