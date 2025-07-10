'use strict';

const mockedResponses = require('~/cartridge/scripts/tests/data/mockedResponses');
const MOCK_SUCCESS = true;

/**
 * set mock text
 * @param {Object} jsonObject - the object to stringify
 * @returns {string} stringified JSON object
 */
function setMockText(jsonObject) {
    if (!jsonObject || !Object.keys(jsonObject).length) return '';
    jsonObject.isMocked = true; // eslint-disable-line no-param-reassign
    return JSON.stringify(jsonObject);
}

var ScapiMockService = {
    getUserAccessTokenResponse: function () {
        if (MOCK_SUCCESS) {
            return {
                statusCode: 200,
                statusMessage: 'OK',
                text: setMockText(mockedResponses.userAccessToken.success)
            };
        }
        return {
            statusCode: 401,
            statusMessage: 'ERROR',
            errorText: setMockText(mockedResponses.userAccessToken.error)
        };
    },

    getPasswordlessAuthCustomerResponse: function () {
        if (MOCK_SUCCESS) {
            return {
                statusCode: 200,
                statusMessage: 'OK',
                text: null
            };
        }
        return {
            statusCode: 400,
            statusMessage: 'ERROR',
            errorText: setMockText(mockedResponses.passwordlessAuthCustomer.error)
        };
    },

    getPasswordlessAccessTokenResponse: function () {
        if (MOCK_SUCCESS) {
            return {
                statusCode: 200,
                statusMessage: 'OK',
                text: setMockText(mockedResponses.passwordlessAccessToken.success)
            };
        }
        return {
            statusCode: 401,
            statusMessage: 'ERROR',
            errorText: setMockText(mockedResponses.passwordlessAccessToken.error)
        };
    },

    getMergeBasketResponse: function () {
        if (MOCK_SUCCESS) {
            return {
                statusCode: 200,
                statusMessage: 'OK',
                text: setMockText(mockedResponses.mergeBasket.success)
            };
        }
        return {
            statusCode: 409,
            statusMessage: 'ERROR',
            errorText: setMockText(mockedResponses.mergeBasket.error)
        };
    }
};

module.exports = ScapiMockService;
