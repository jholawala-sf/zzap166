'use strict';

const Site = require('dw/system/Site');
const currentSite = Site.getCurrent();

const helpers = require('*/cartridge/scripts/helpers/passwordlessLoginHelpers');

const CALLBACK_SECRET_KEY = helpers.getSitePreference('passwordlessLoginCallbackSecretKey');
const OCAPI_VERSION = helpers.getSitePreference('ocapiVersion');
const multiSiteSupportEnabled = helpers.getSitePreference('supportMultiSite');

// optional, used to set the hostname if http-host and https-host do not exist in the alias configuration
const hostName = helpers.getSitePreference('hostname') || currentSite.httpsHostName;

module.exports = {
    SERVICE_IDS: {
        AUTH: 'plugin_slas.generic.scapi.auth',
        BASKETS: 'plugin_slas.generic.scapi.shopper-baskets',
        INTERNAL_CONTROLLER: 'plugin_slas.internal-controller',
        OCAPI_SESSION_BRIDGE: 'plugin_slas.generic.ocapi.sessions',
        PWDLESS_LOGIN: 'plugin_pwdless.scapi.auth'
    },
    SCAPI_CHANNEL_ID: currentSite.ID,
    LOCALE_ID: helpers.getCurrentLocale().toLowerCase().replace('_', '-'),
    PWDLESS_LOGIN_GRANT_TYPE: 'client_credentials',
    PWDLESS_LOGIN_HINT: 'pwdless_login',
    PWDLESS_LOGIN_MODE: 'callback',
    CALLBACK_SECRET_KEY: CALLBACK_SECRET_KEY,
    PWDLESS_LOGIN_CALLBACK_URI: helpers.getCallbackUrl(CALLBACK_SECRET_KEY),

    SLAS_CONFIGS: {
        // is plugin_slas cartridge being used? skip pwdless on session hook and use logic from plugin_slas
        IS_SLAS_PLUGIN_ENABLED: helpers.getSitePreference('isSlasPluginEnabled'),

        SHORTCODE: helpers.getSitePreference('shortCode'),

        ORGID: helpers.getSitePreference('orgId'),

        FETCH_DEFAULT_TIMEOUT: 5000,

        // Request parameter value for grant_type for the call to get access token and refresh token
        GRANT_TYPE_AUTH_CODE_PKCE: 'authorization_code_pkce',

        // Request parameter value for grant_type for the call to get access token from refresh token login
        GRANT_TYPE_REFRESH_TOKEN: 'refresh_token',

        // The value for 'channel_id' request parameter for SLAS service calls
        CHANNEL_ID: currentSite.ID,

        // The value for 'redirect_uri' parameter in guest and registered user login calls
        REDIRECT_URI: helpers.getSitePreference('redirectURI_SLAS'),

        // The custom preference to always drop refresh token cookies in browser during registered user login
        SAVE_REFRESH_TOKEN_ALWAYS: helpers.getSitePreference('saveRefreshToken_Always'),

        DWSID_COOKIE_NAME: 'dwsid',

        // session guard cookie name. This is set when a login occurs to stop guest sessions from refreshing while the existing session is active
        SESSION_GUARD_COOKIE_NAME: multiSiteSupportEnabled
            ? 'cc-sg_' + currentSite.ID
            : 'cc-sg',

        // The maximum age of this cookie. This must be less than the minimum age of a session (30 minutes) so that the guard is not active when the session expires.
        SESSION_GUARD_COOKIE_AGE: 30 * 60,

        // refresh token cookie name for registered users
        REFRESH_TOKEN_COOKIE_NAME_REGISTERED: multiSiteSupportEnabled
            ? 'cc-nx_' + currentSite.ID
            : 'cc-nx',

        // refresh token cookie name for guest users
        REFRESH_TOKEN_COOKIE_NAME_GUEST: multiSiteSupportEnabled
            ? 'cc-nx-g_' + currentSite.ID
            : 'cc-nx-g',

        USID_COOKIE_NAME: multiSiteSupportEnabled
            ? 'usid_' + currentSite.ID
            : 'usid',

        ACCESS_TOKEN_COOKIE_NAME: multiSiteSupportEnabled
            ? 'cc-at_' + currentSite.ID
            : 'cc-at',

        ACCESS_TOKEN_COOKIE_AGE: 30 * 60,

        // The maximum age of the usid cookie . This is set to match the refresh token
        USID_COOKIE_AGE: 90 * 24 * 60 * 60,

        // SCAPI end point for merging guest user basket during login
        SCAPI_BASKET_MERGE_ENDPOINT: '/baskets/actions/merge',

        // The header name set in Customer CDN settings -> Client IP Header Name. Allows B2C to retrieve the client IP during session bridging.
        CLIENT_IP_HEADER_NAME: helpers.getSitePreference('clientIPHeaderName'),

        // Feature toggle for using session signatures (dwsgst). Enabled by default. Disabling this will have the system fallback to DWSID.
        USE_DWGST: helpers.getSitePreference('use_dwsgst'),

        // controllers to exclude for guest login and token refresh
        CONTROLLERS_TO_EXCLUDE: [
            '__Analytics',
            '__Analytics-Start',
            '__SYSTEM',
            'ConsentTracking-Check',
            'ConsentTracking-GetContent',
            'ConsentTracking-SetConsent',
            'ConsentTracking-SetSession',
            'PasswordlessLogin-Callback',
            'PasswordlessLogin-RestoreData',
            'SLASSessionHelper-SaveSession',
            'TestHelper-TestGeoLocationSlasExclude'
        ],

        // The request URI used to fetch OCAPI Session in bridge service - SLAS
        OCAPI_SESSION_BRIDGE_URI_SLAS:
            'https://' +
            hostName +
            '/s/' +
            currentSite.ID +
            '/dw/shop/v' +
            OCAPI_VERSION +
            '/sessions',

        // list of configured service IDs
        SERVICE_IDS: {
            INTERNAL_CONTROLLER: 'plugin_slas.internal-controller'
        },

        // site preference used to enable restoration of session attributes after session bridge
        RESTORE_SESSION_ATTRIBUTES: helpers.getSitePreference('restoreSessionAttributes_SLAS')
    }
};
