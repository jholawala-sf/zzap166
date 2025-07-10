'use strict';

const RESTResponseMgr = require('dw/system/RESTResponseMgr');
const apiImplementation = require('*/cartridge/scripts/apis/sitePreference');

/**
 * This SCAPI CUSTOM API endpoint is used to look up site preferences for the specified site by site preference Id
 *
 * This endpoint will productized soon. As such, for security concerns, it will only return site preferences
 * for development instances. Password fields will not be returned
 * @returns {Object} JSON object
 */
exports.getById = function () {
    var apiResponse = RESTResponseMgr.createEmptySuccess(204);
    try {
        const ids = request.httpPath.split('/')
            .pop()
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map(id => decodeURIComponent(id));
        apiResponse = RESTResponseMgr.createSuccess({
            results: ids.reduce((acc, id) => {
                const result = apiImplementation.get(id);
                acc[result.id] = result;
                return acc;
            }, {})
        });
    } catch (e) {
        apiResponse = RESTResponseMgr.createError(500, 'server-error', e.name || 'Server Error', e.message);
    }
    return apiResponse.render();
};
exports.getById.public = true;

/**
 * This SCAPI CUSTOM API endpoint is used to look up site preferences for the specified site by site preference group Id
 *
 * This endpoint will productized soon. As such, for security concerns, it will only return site preferences
 * for development instances. Password fields will not be returned
 * @returns {Object} JSON object
 */
exports.getByGroupId = function () {
    var apiResponse = RESTResponseMgr.createEmptySuccess(204);
    try {
        const ids = request.httpPath.split('/')
            .pop()
            .replace('(', '')
            .replace(')', '')
            .split(',')
            .map(id => decodeURIComponent(id));
        apiResponse = RESTResponseMgr.createSuccess({
            results: ids.reduce((acc, id) => {
                acc[id] = apiImplementation.getGroup(id);
                return acc;
            }, {})
        });
    } catch (e) {
        apiResponse = RESTResponseMgr.createError(500, 'server-error', e.name || 'Server Error', e.message);
    }
    return apiResponse.render();
};
exports.getByGroupId.public = true;
