'use strict';

/**
 * Model for SCAPI Services
 * @module models/scapiModel
 */

/* Script Modules */
const Logger = require('dw/system/Logger').getLogger('SCAPI_API');
const scapiConfig = require('*/cartridge/scripts/config/scapiConfig');
const ScapiServiceFactory = require('*/cartridge/scripts/util/scapiServiceFactory');
const ScapiServiceMgr = require('*/cartridge/scripts/services/scapiServiceMgr');
const helpers = require('*/cartridge/scripts/helpers/passwordlessLoginHelpers');

const ScapiModel = ({
    /**
     * Return SCAPI response for passwordless login auth customer
     * @param {string} loginId - Customer's login ID
     * @param {string} usid - unique shopper id
     * @returns {Object} service response object
     */
    authPasswordlessCustomer: function (loginId, usid) {
        var result = {
            success: false,
            usid: null
        };

        try {
            if (!loginId) return result;

            var pwdlessRequestParams = { loginId: loginId };

            // get usid from guest refresh token if cookie is present
            if (!usid) {
                var usidResult = helpers.getUsidFromRefreshCookie();
                if (usidResult && usidResult.usid) {
                    usid = usidResult.usid; // eslint-disable-line no-param-reassign
                }
            }
            if (usid) {
                result.usid = usid;
                pwdlessRequestParams.usid = usid;
            }

            var requestContainer = ScapiServiceFactory.buildPwdlessAuthCustomerRequestContainer(pwdlessRequestParams);
            const scapiService = ScapiServiceMgr.getScapiService(scapiConfig.SERVICE_IDS.PWDLESS_LOGIN);
            var serviceResult = scapiService.call(requestContainer);
            if (serviceResult.isOk()) {
                result.success = true;
            }
        } catch (e) {
            Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        }
        return result;
    },

    /**
     * Return SCAPI response for passwordless access token
     * @param {string} token - customer's passwordless login token
     * @param {string} usid - guest usid
     * @returns {Object} service response object
     */
    getPasswordlessAccessToken: function (token, usid) {
        var result = {
            success: false,
            responseObject: null,
            accessToken: null,
            refreshToken: null,
            refreshTokenExpiresIn: null
        };

        try {
            if (!token) return result;
            var requestContainer = ScapiServiceFactory.buildPwdlessAccessTokenRequestContainer({
                token: token,
                usid: usid
            });
            const scapiService = ScapiServiceMgr.getScapiService(scapiConfig.SERVICE_IDS.PWDLESS_LOGIN);
            var serviceResult = scapiService.call(requestContainer);
            var serviceObject = serviceResult ? serviceResult.getObject() : null;
            if (serviceResult.isOk() && serviceObject && serviceObject.responseObject) {
                result.success = true;
                result.responseObject = serviceObject.responseObject;
                result.accessToken = serviceObject.responseObject.access_token;
                result.refreshToken = serviceObject.responseObject.refresh_token;
                result.refreshTokenExpiresIn = serviceObject.responseObject.refresh_token_expires_in;
            }
        } catch (e) {
            Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        }
        return result;
    }
});

module.exports = ScapiModel;
