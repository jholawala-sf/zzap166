'use strict';

/* API Modules */
const Logger = require('dw/system/Logger');

/* Script Modules */
const scapiConfig = require('*/cartridge/scripts/config/scapiConfig');

/* ***************************************************
 * private functions
 * ************************************************* */

const ScapiServiceFactory = {
    ACTIONS: {
        AUTH_PWDLESS_CUSTOMER: 'AUTH_PWDLESS_CUSTOMER',
        PWDLESS_ACCESS_TOKEN: 'PWDLESS_ACCESS_TOKEN'
    },
    PATHS: {
        AUTH_PWDLESS_CUSTOMER: 'login',
        PWDLESS_ACCESS_TOKEN: 'token'
    },
    CONTENT_TYPES: {
        FORM: 'application/x-www-form-urlencoded',
        JSON: 'application/json'
    },

    /* ***************************************************
     * Other Getters
     * ************************************************* */

    getLogger: function (method) {
        var categoryName = method !== null ? method : 'scapi-service-general';
        var fileName = 'scapi-service';

        return Logger.getLogger(fileName, categoryName);
    },

    /* ***************************************************
     * Build requestContainer helpers
     * ************************************************* */
    /**
     * builds request container for passwordless login auth customer
     * @param {Object} requestParams request parameter object
     * @returns {Object} the request container
     */
    buildPwdlessAuthCustomerRequestContainer: function (requestParams) {
        const requestContainer = {
            requestMethod: 'POST',
            action: ScapiServiceFactory.ACTIONS.AUTH_PWDLESS_CUSTOMER,
            path: ScapiServiceFactory.PATHS.AUTH_PWDLESS_CUSTOMER,
            headers: {
                'Content-Type': ScapiServiceFactory.CONTENT_TYPES.FORM
            },
            data: {
                channel_id: scapiConfig.SCAPI_CHANNEL_ID,
                mode: scapiConfig.PWDLESS_LOGIN_MODE,
                callback_uri: scapiConfig.PWDLESS_LOGIN_CALLBACK_URI,
                locale: scapiConfig.LOCALE_ID,
                user_id: requestParams.loginId
            }
        };

        if (requestParams.usid) {
            requestContainer.data.usid = requestParams.usid;
        }

        return requestContainer;
    },

    /**
     * builds request container for passwordless access token
     * @param {Object} requestParams request parameter object
     * @returns {Object} the request container
     */
    buildPwdlessAccessTokenRequestContainer: function (requestParams) {
        const requestContainer = {
            requestMethod: 'POST',
            action: ScapiServiceFactory.ACTIONS.PWDLESS_ACCESS_TOKEN,
            path: ScapiServiceFactory.PATHS.PWDLESS_ACCESS_TOKEN,
            headers: {
                'Content-Type': ScapiServiceFactory.CONTENT_TYPES.FORM
            },
            data: {
                grant_type: scapiConfig.PWDLESS_LOGIN_GRANT_TYPE,
                hint: scapiConfig.PWDLESS_LOGIN_HINT,
                pwdless_login_token: requestParams.token
            }
        };

        if (requestParams.usid) {
            requestContainer.data.usid = requestParams.usid;
        }

        return requestContainer;
    }
};

module.exports = ScapiServiceFactory;
