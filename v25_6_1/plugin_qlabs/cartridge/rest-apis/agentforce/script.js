'use strict';

const RESTResponseMgr = require('dw/system/RESTResponseMgr');
const api = require('*/cartridge/scripts/qlabs/apis/agentforce');

/**
 * Generic handler for API endpoints that standardizes error handling
 * @param {Function} apiFunction - The API function to call
 * @param {Object} [params] - Optional parameters to pass to the API function
 * @returns {Object} - The rendered API response
 */
const handleEndpoint = (apiFunction, params) => {
    var apiResponse = RESTResponseMgr.createEmptySuccess(204);
    try {
        var result = params ? apiFunction(params) : apiFunction();
        if (result && result.error) {
            apiResponse = RESTResponseMgr.createError(500, result.error.code, result.error.message, result.error.details);
        } else {
            apiResponse = RESTResponseMgr.createSuccess(result);
        }
    } catch (e) {
        apiResponse = RESTResponseMgr.createError(500, 'server-error', e.name || 'Server Error', e.message);
    }
    return apiResponse.render();
};

/**
 * get all necessary data needed to create promotions via Agentforce
 */
exports.getPromotionData = function () {
    return handleEndpoint(api.getPromoData);
};

/**
 * import promotions via Agentforce
 */
exports.importPromotions = function () {
    return handleEndpoint(api.importPromotions);
};

/**
 * import customer groups via Agentforce
 */
exports.importCustomerGroups = function () {
    return handleEndpoint(api.importCustomerGroups);
};

exports.getPromotionData.public = true;
exports.importPromotions.public = true;
exports.importCustomerGroups.public = true;
