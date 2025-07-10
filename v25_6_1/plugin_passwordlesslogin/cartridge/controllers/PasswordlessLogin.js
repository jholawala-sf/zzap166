'use strict';

const server = require('server');
const csrfProtection = require('*/cartridge/scripts/middleware/csrf');

/**
 * creates error response based on source
 * @param {string} source - the source of the request (form or select-modal)
 * @param {string} errorMessage - error message
 * @returns {Object} error response based on source
 */
const createErrorResponse = (source, errorMessage) => {
    const errResp = { success: false };
    if (source === 'form') {
        errResp.fields = {
            loginEmail: errorMessage
        };
        return errResp;
    }
    errResp.error = [errorMessage];
    return errResp;
};

/**
 * PasswordlessLogin-Auth : PasswordlessLogin-Auth endpoint will render the shopper's account page. Once a shopper logs in they will see is a dashboard that displays profile, address, payment and order information.
 * @name PasswordlessLogin-Auth
 * @function
 * @memberof PasswordlessLogin
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {querystringparameter} - rurl - redirect url. The value of this is a number. This number then gets mapped to an endpoint set up in oAuthRenentryRedirectEndpoints.js
 * @param {httpparameter} - loginEmail - The email associated with the shopper's account.
 * @param {httpparameter} - csrf_token - a CSRF token
 * @param {category} - sensitive
 * @param {returns} - json
 * @param {serverfunction} - post
 *
 */
server.post(
    'Auth',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        const HashMap = require('dw/util/HashMap');
        const Resource = require('dw/web/Resource');
        const Template = require('dw/util/Template');
        const URLUtils = require('dw/web/URLUtils');
        const helpers = require('*/cartridge/scripts/helpers/passwordlessLoginHelpers');
        const scapiModel = require('*/cartridge/models/scapiModel');

        var email = req.form.loginEmail;
        var login = req.form.login || null;
        var source = req.form.source || 'form';
        var reentryEndpoint = req.querystring.reentryEndpoint || 1;
        var errorMessage = Resource.msg('error.message.passwordlesslogin.form', 'login', null);

        const handleAuthResult = helpers.handleAuth({ login, email });

        var receivedMsgHeading = Resource.msg('msg.passwordless.login.received.heading', 'login', null);
        var buttonText = Resource.msg('msg.passwordless.token.button', 'login', null);

        var template = new Template('account/components/passwordlessMsgBody');
        var receivedMsgBodyParams = new HashMap();
        receivedMsgBodyParams.profiles = [];
        receivedMsgBodyParams.reentryEndpoint = reentryEndpoint;
        const successObject = {
            success: true,
            showTokenForm: true,
            usid: null,
            receivedMsgHeading: receivedMsgHeading,
            receivedMsgBody: template.render(receivedMsgBodyParams).text,
            buttonText: buttonText,
            redirectUrl: URLUtils.url('PasswordlessLogin-Login').toString()
        };

        // if the email is not found, skip SCAPI call, do not let user know email is not in the system
        if (handleAuthResult.status === 'NOT_FOUND') {
            res.json(successObject);
            return next();
        }

        // handle error
        if (handleAuthResult.status === 'ERROR') {
            res.json(createErrorResponse(source, handleAuthResult.error || errorMessage));
            return next();
        }

        // multiple profiles found, show the user a list of profiles to choose from
        if (handleAuthResult.status === 'MULTI') {
            receivedMsgBodyParams.profiles = handleAuthResult.profiles;
            res.json({
                success: true,
                receivedMsgHeading: handleAuthResult.message || '',
                receivedMsgBody: template.render(receivedMsgBodyParams).text
            });
            return next();
        }

        const authResult = scapiModel.authPasswordlessCustomer(handleAuthResult.loginId);
        if (authResult.success) {
            successObject.usid = authResult.usid || null;
            res.json(successObject);
        } else {
            res.json(createErrorResponse(source, Resource.msg('error.message.passwordlesslogin.auth', 'login', null)));
        }
        return next();
    }
);

/**
 * PasswordlessLogin-Callback : This endpoint is called as the callback for Passwordless Login auth calls
 * @name PasswordlessLogin-Callback
 * @function
 * @memberof PasswordlessLogin
 * @param {middleware} - server.middleware.https
 * @param {serverfunction} - post
 */
server.post('Callback',
    server.middleware.https,
    function (req, res, next) {
        const helpers = require('*/cartridge/scripts/helpers/passwordlessLoginHelpers');

        var parsedBody = helpers.parsePasswordlessLoginCallback(req);
        var secretKey = req.querystring.key || null;
        var { success, token, email, pwdlessCustomer } = helpers.validateCallback(parsedBody, secretKey);

        if (success) {
            helpers.sendPasswordlessLoginEmail(email, token, pwdlessCustomer);
        }

        res.json({
            success: success
        });
        next();
    }
);

/**
 * PasswordlessLogin-Login : This endpoint is called from customer email or sms and will contain passwordless login token
 * @name PasswordlessLogin-Login
 * @function
 * @memberof PasswordlessLogin
 * @param {middleware} - server.middleware.https
 * @param {serverfunction} - get
 */
server.use('Login',
    server.middleware.https,
    function (req, res, next) {
        const BasketMgr = require('dw/order/BasketMgr');
        const Logger = require('dw/system/Logger');
        const Resource = require('dw/web/Resource');
        const cartMergeService = require('*/cartridge/scripts/services/CartMergeService');
        const config = require('*/cartridge/scripts/config/SLASConfig');
        const helpers = require('*/cartridge/scripts/helpers/passwordlessLoginHelpers');
        const scapiModel = require('*/cartridge/models/scapiModel');
        const slasAuthHelper = require('*/cartridge/scripts/helpers/slasAuthHelper');

        var source = req.querystring.source || req.form.source || 'form';
        var token = req.querystring.token || req.querystring.Token || req.form.token;
        var usid = req.querystring.usid || req.form.usid || null;
        var rurl = req.querystring.rurl || req.form.rurl || 1;
        var errorMessage = Resource.msg('error.passwordless.login.failure', 'login', null);
        var cookiesToRemove = [config.REFRESH_TOKEN_COOKIE_NAME_GUEST];
        var isTokenValid = token && /^\d{8}$/.test(token);

        // error out if token is not present
        if (!token || !isTokenValid) {
            errorMessage = Resource.msg('error.message.token.invalid', 'login', null);
            if (source === 'ajax') {
                res.json({
                    success: false,
                    error: [errorMessage]
                });
                return next();
            }
            res.render('/error', {
                message: errorMessage
            });
            return next();
        }

        // if user session ID (usid) is not passed, see if we can get the usid from the refresh cookie
        // NOTE: we can not refresh a guest token if "authorizePasswordlessCustomer"
        // has already executed using the same usid so this will most likely fail
        if (!usid) {
            var usidResult = helpers.getUsidFromRefreshCookie();
            if (usidResult && usidResult.usid) {
                usid = usidResult.usid;
            }
        }

        // call SCAPI for access token
        const authResult = scapiModel.getPasswordlessAccessToken(token, usid);
        if (!authResult || !authResult.accessToken) {
            if (source === 'ajax') {
                res.json({
                    success: false,
                    error: [errorMessage]
                });
                return next();
            }
            res.render('/error', {
                message: errorMessage
            });
            return next();
        }

        var ocapiSessionBridgeCookies = {};
        try {
            ocapiSessionBridgeCookies = slasAuthHelper.getOCAPISessionBridgeCookies(authResult.accessToken, req.remoteAddress);
            if (BasketMgr.getCurrentBasket() && usid) {
                cartMergeService.mergeBasket(authResult.accessToken);
            }
        } catch (e) {
            Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        }

        var cookiesToSet = ocapiSessionBridgeCookies;
        if (config.SAVE_REFRESH_TOKEN_ALWAYS) {
            cookiesToSet[config.REFRESH_TOKEN_COOKIE_NAME_REGISTERED] = {
                value: authResult.refreshToken,
                maxAge: authResult.refreshTokenExpiresIn
            };
        }

        cookiesToSet[config.SESSION_GUARD_COOKIE_NAME] = {
            value: 1,
            maxAge: config.SESSION_GUARD_COOKIE_AGE
        };

        cookiesToSet[config.ACCESS_TOKEN_COOKIE_NAME] = {
            value: authResult.accessToken,
            maxAge: config.ACCESS_TOKEN_COOKIE_AGE
        };

        slasAuthHelper.setCookiesToResponse(cookiesToSet, res.base);

        cookiesToRemove.forEach(function (cookie) {
            slasAuthHelper.removeCookie(cookie, res.base);
        });

        var redirectUrl = require('*/cartridge/scripts/helpers/accountHelpers').getLoginRedirectURL(rurl, req.session.privacyCache, false).toString();
        if (source === 'ajax') {
            res.json({
                success: true,
                redirectUrl: redirectUrl
            });
            return next();
        }

        res.redirect(redirectUrl);
        return next();
    }
);

module.exports = server.exports();
