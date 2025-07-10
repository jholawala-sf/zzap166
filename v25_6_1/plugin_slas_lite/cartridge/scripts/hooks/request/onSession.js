'use strict';

/**
 * The onSession hook is called for every new session in a site. For performance reasons the hook function should be kept short.
 */
const Status = require('dw/system/Status');
const config = require('*/cartridge/scripts/config/SLASConfig');
const urlHelper = require('*/cartridge/scripts/helpers/urlHelper');
const slasAuthHelper = require('*/cartridge/scripts/helpers/slasAuthHelper');
const slasAuthService = require('*/cartridge/scripts/services/SLASAuthService');

/**
 * Checks to see if there is a session guard in place. This guard is used in refresh token login flows
 * to stop loops caused by the post-login session bridge creating a new dwsid.
 * @returns {boolean} boolean value suggesting if session guard is active.
 */
function isSessionGuardActive() {
    var dwsidCookie = slasAuthHelper.getCookie(config.DWSID_COOKIE_NAME);
    var sessionGuardCookie = slasAuthHelper.getCookie(config.SESSION_GUARD_COOKIE_NAME);

    /*
        Session guard is active if:
            a) a dwsid cookie exists. If there is no dwsid cookie, ECOM will assign a brand new dwsid and we should log in.
            b) a cc-sg cookie exists.
            c) the cc-sg cookie is younger than 30 minutes
    */
    var activeSessionGuard = dwsidCookie
        && sessionGuardCookie
        && sessionGuardCookie.maxAge < config.SESSION_GUARD_COOKIE_AGE;

    // Session guard has been used to block loop. Can now remove the session guard cookie
    slasAuthHelper.removeCookie(config.SESSION_GUARD_COOKIE_NAME, response);
    return activeSessionGuard;
}

/**
 * The onSession hook is called for every new session in a site. For performance reasons the hook function should be kept short.
 * This hook is only triggered if a dwsid is either expired or is missing.
 * @returns {dw/system/Status} status - return status
 */
exports.onSession = function () {
    var isStorefrontSession = !!(session && session.userName === 'storefront');
    var isNotRegisteredUser = !session.customer.profile;
    var isGetRequest = request.httpMethod === 'GET';
    var isSlasPluginEnabled = config.IS_SLAS_PLUGIN_ENABLED;
    var isSCAPI = request.isSCAPI();

    /**
     Only run login if:
     a) plugin_slas is not enabled
     b) the request url is not excluded in SLASConfig.CONTROLLERS_TO_EXCLUDE
     c) there is no active session guard
     d) the request is for a storefront (in other words, not a business manager session)
     e) user is not already logged in
     f) the request is a GET request. Other request types are excluded
     g) the request is NOT originating from SCAPI
     */
    if (
        isSlasPluginEnabled
        || !slasAuthHelper.isValidRequestURI(request.httpPath)
        || isSessionGuardActive()
        || !isStorefrontSession
        || !isNotRegisteredUser
        || !isGetRequest
        || isSCAPI
    ) {
        return new Status(Status.OK);
    }

    var tokenData = {};
    var ocapiSessionBridgeCookies = {};
    var redirectURL = '';
    var guestRefreshTokenCookie = slasAuthHelper.getCookie(config.REFRESH_TOKEN_COOKIE_NAME_GUEST);

    if (guestRefreshTokenCookie && guestRefreshTokenCookie.value) {
        tokenData = slasAuthService.getAccessToken({
            grant_type: config.GRANT_TYPE_REFRESH_TOKEN,
            refresh_token: guestRefreshTokenCookie.value
        });

        /* Refresh token logins are not supported by session-bridge endpoint.
            So we use OCAPI session bridge to manually bridge sessions between SLAS and ECOM. */
        ocapiSessionBridgeCookies = slasAuthHelper.getOCAPISessionBridgeCookies(tokenData.access_token, request.httpRemoteAddress);

        redirectURL = urlHelper.getSEOUrl(
            request.httpPath,
            request.httpQueryString
        );
    } else {
        var sessionId = config.USE_DWGST ? session.generateGuestSessionSignature() : request.httpHeaders.get('x-is-session_id');
        tokenData = slasAuthHelper.getSLASAccessTokenForGuestSessionBridge(sessionId);
    }

    if (Object.keys(tokenData).length) {
        var refreshTokenCookieToSet = config.REFRESH_TOKEN_COOKIE_NAME_GUEST;

        var cookiesToSet = ocapiSessionBridgeCookies;
        cookiesToSet[refreshTokenCookieToSet] = {
            value: tokenData.refresh_token,
            maxAge: tokenData.refresh_token_expires_in
        };
        cookiesToSet[config.SESSION_GUARD_COOKIE_NAME] = {
            value: 1,
            maxAge: config.SESSION_GUARD_COOKIE_AGE
        };
        cookiesToSet[config.USID_COOKIE_NAME] = {
            value: tokenData.usid,
            maxAge: config.USID_COOKIE_AGE
        };
        cookiesToSet[config.ACCESS_TOKEN_COOKIE_NAME] = {
            value: tokenData.access_token,
            maxAge: config.ACCESS_TOKEN_COOKIE_AGE
        };

        slasAuthHelper.setCookiesToResponse(cookiesToSet, response);
    }

    if (redirectURL) {
        response.redirect(redirectURL);
    }
    return new Status(Status.OK);
};
