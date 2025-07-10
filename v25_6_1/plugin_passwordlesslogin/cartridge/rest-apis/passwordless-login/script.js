'use strict';

const Resource = require('dw/web/Resource');
const RESTResponseMgr = require('dw/system/RESTResponseMgr');
const helpers = require('*/cartridge/scripts/helpers/passwordlessLoginHelpers');
const scapiModel = require('*/cartridge/models/scapiModel');

/**
 * This SCAPI CUSTOM API endpoint is used to handle the authroization of a passwordless customer
 * we are using a custom API to ensure the callback url and the secret key are not exposed to the client
 * additionally, this can be extended to handled additional logic for multiple customers being returned for the same email (IDP scenario)
 * @returns {Object} JSON object
 */
exports.authorizeCustomer = function () {
    var apiResponse = RESTResponseMgr.createEmptySuccess(204);
    try {
        const params = request.httpParameters;
        const errorMessage = Resource.msg('error.message.passwordlesslogin.form', 'login', null);

        var email = params.c_emailId && params.c_emailId[0];
        var login = params.c_loginId && params.c_loginId[0];
        var usid = params.c_usid && params.c_usid[0];
        var loginId = null;

        const handleAuthResult = helpers.handleAuth({ login, email });

        // if the email is not found, skip SCAPI call, do not let user know email is not in the system
        if (handleAuthResult.status === 'NOT_FOUND') {
            return apiResponse.render();
        }

        // handle error
        if (handleAuthResult.status === 'ERROR') {
            apiResponse = RESTResponseMgr.createError(400, 'bad-request', 'Bad Request', handleAuthResult.error || errorMessage);
            return apiResponse.render();
        }

        // TODO - implement multi profile handling
        if (handleAuthResult.status === 'MULTI') {
            var profile = handleAuthResult.profiles.find(p => p.login === email);
            if (profile) {
                loginId = profile.login;
            }
            // apiResponse = RESTResponseMgr.createSuccess({
            //     status: handleAuthResult.status,
            //     profiles: handleAuthResult.profiles,
            //     message: handleAuthResult.message || ''
            // });
            // return apiResponse.render();
        }

        if (!loginId) {
            loginId = handleAuthResult.loginId;
        }
        const authResult = scapiModel.authPasswordlessCustomer(loginId, usid);
        if (!authResult.success) {
            apiResponse = RESTResponseMgr.createError(500, 'server-error', 'Server Error', authResult.error || errorMessage);
        }
    } catch (e) {
        apiResponse = RESTResponseMgr.createError(500, 'server-error', e.name || 'Server Error', e.message);
    }
    return apiResponse.render();
};
exports.authorizeCustomer.public = true;
