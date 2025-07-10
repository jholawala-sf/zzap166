'use strict';

const base = module.superModule || {};

var config = require('*/cartridge/scripts/config/SLASConfig');

var Fetch = require('*/cartridge/scripts/services/fetch');
var SecureRandom = require('dw/crypto/SecureRandom');
var Encoding = require('dw/crypto/Encoding');
var MessageDigest = require('dw/crypto/MessageDigest');
var Bytes = require('dw/util/Bytes');
var slasServiceUtils = require('*/cartridge/scripts/services/slasServiceUtils');

var SERVICE = require('*/cartridge/scripts/config/scapiConfig').SERVICE_IDS.AUTH;

/**
 * Returns the base URL
 * @returns {string} url - the url for this instance
 */
function getBaseURL() {
    return (
        'https://' +
        config.SHORTCODE +
        '.api.commercecloud.salesforce.com/shopper/auth/v1/organizations/' +
        config.ORGID
    );
}

/**
 * Encodes a string to base64 and be url friendly
 * @param {string} str - a string
 * @returns {string} the base 64 encoded url friendly string
 */
function encodeURLSafeBase64(str) {
    return Encoding.toBase64(str)
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

/**
 * Generates a code verifier and code challenge for use with SLAS requests
 * @returns {Object} an object containing the code verifier and code challenge
 */
function generateCodeVerifierAndChallenge() {
    var random = new SecureRandom();
    var codeVerifier = encodeURLSafeBase64(random.nextBytes(96));

    var messageDigest = new MessageDigest(MessageDigest.DIGEST_SHA_256);
    var codeChallenge = encodeURLSafeBase64(
        messageDigest.digestBytes(new Bytes(codeVerifier))
    );

    return {
        code_verifier: codeVerifier,
        code_challenge: codeChallenge
    };
}

/**
 * Get an authorization code for logging in guest users.
 *
 * @param {Object} parameters - an object containing request parameters
 * @returns {Object} response containing usid, code, and code verifier
 */
base.authorizeCustomer = base.authorizeCustomer || function authorizeCustomer(parameters) {
    var authorizeUrl = getBaseURL() + '/oauth2/authorize';

    var codeVerifierAndChallenge = generateCodeVerifierAndChallenge();

    var authorizeOptions = {
        method: 'GET',
        queryParameters: {
            redirect_uri: parameters.redirect_uri || config.REDIRECT_URI,
            response_type: 'code',
            hint: parameters.hint,
            code_challenge: codeVerifierAndChallenge.code_challenge
        },
        onCredentials: function (options, credentials) {
            options.queryParameters.client_id = credentials.user; // eslint-disable-line no-param-reassign
        }
    };

    var authorizeResult = Fetch.fetch(SERVICE, authorizeUrl, authorizeOptions);

    // We are expecting to receive a HTTP 303 from this endpoint since our service does not
    // automatically follow redirects. Rather than follow the redirect, we extract
    // the USID and CODE from the query parameters of the URL provided by the Location header
    // to save us from needlessly doing an extra request
    if (authorizeResult.status !== 303) {
        Fetch.throwHttpError(authorizeResult, 'SLAS authorizeCustomer error');
    }

    var locationHeader = authorizeResult.headers.get('Location')[0];
    var locationQueryParameters = locationHeader.split('?')[1];
    var response = Fetch.deserializeQueryString(locationQueryParameters);
    response.code_verifier = codeVerifierAndChallenge.code_verifier;

    return response;
};

/**
 * Gets the shopper's JWT
 *
 * @param {Object} parameters - an object containing request parameters
 * @returns {Object} Response containing the shopper's JWT
 */
base.getAccessToken = base.getAccessToken || function getAccessToken(parameters) {
    var accessTokenUrl = getBaseURL() + '/oauth2/token';

    // SLAS will throw an error if grant_type is refresh_token
    // and there is an undefined code, usid, or code_verifier in the request
    var queryParameters = {
        grant_type: parameters.grant_type,
        channel_id: parameters.channel_id || config.CHANNEL_ID,
        redirect_uri: parameters.redirect_uri || config.REDIRECT_URI,
        useCredentials: true
    };
    if (parameters.grant_type === config.GRANT_TYPE_REFRESH_TOKEN) {
        queryParameters.refresh_token = parameters.refresh_token;
    } else if (parameters.grant_type === config.GRANT_TYPE_AUTH_CODE_PKCE) {
        queryParameters.code_verifier = parameters.code_verifier;
        queryParameters.usid = parameters.usid;
        queryParameters.code = parameters.code;
    }

    var accessTokenOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        queryParameters: queryParameters,
        useCredentials: slasServiceUtils.isPrivateClient(),
        onCredentials: function (options, credentials) {
            options.queryParameters.client_id = credentials.user; // eslint-disable-line no-param-reassign
        }
    };

    var accessTokenResponse = Fetch.fetch(
        SERVICE,
        accessTokenUrl,
        accessTokenOptions
    );

    if (!accessTokenResponse.ok) {
        Fetch.throwHttpError(accessTokenResponse, 'SLAS getAccessToken error');
    }

    return JSON.parse(accessTokenResponse.body);
};

/**
 * Gets the shopper's JWT and initiates a session bridge. Only supports new guest logins
 *
 * @param {Object} parameters - an object containing request parameters
 * @returns {Object} Response containing the shopper's JWT
 */
base.getSessionBridgeAccessToken = base.getSessionBridgeAccessToken || function getSessionBridgeAccessToken(parameters) {
    var sessionBridgeUrl = getBaseURL() + '/oauth2/session-bridge/token';
    var isPrivateClient = slasServiceUtils.isPrivateClient();

    var sessionBridgeOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        queryParameters: {
            channel_id: parameters.channel_id || config.CHANNEL_ID,
            login_id: 'sb-guest'
        },
        useCredentials: isPrivateClient,
        onCredentials: function (options, credentials) {
            options.queryParameters.client_id = credentials.user; // eslint-disable-line no-param-reassign
        }
    };

    if (isPrivateClient) {
        sessionBridgeOptions.queryParameters.grant_type = 'client_credentials';
    } else {
        sessionBridgeOptions.queryParameters.grant_type = 'session_bridge';
        sessionBridgeOptions.queryParameters.code_verifier = parameters.code_verifier;
        sessionBridgeOptions.queryParameters.usid = parameters.usid;
        sessionBridgeOptions.queryParameters.code = parameters.code;
    }

    if (parameters.dwsgst) {
        sessionBridgeOptions.queryParameters.dwsgst = parameters.dwsgst;
    } else if (parameters.dwsid) {
        sessionBridgeOptions.queryParameters.dwsid = parameters.dwsid;
    }

    var sessionBridgeTokenResponse = Fetch.fetch(
        SERVICE,
        sessionBridgeUrl,
        sessionBridgeOptions
    );

    if (!sessionBridgeTokenResponse.ok) {
        Fetch.throwHttpError(
            sessionBridgeTokenResponse,
            'SLAS getSessionBridgeAccessToken error'
        );
    }

    return JSON.parse(sessionBridgeTokenResponse.body);
};

/**
 * Logout a customer
 * @param {Object} parameters - an object containing request parameters
 * @returns {Object} response
 */
base.logoutCustomer = base.logoutCustomer || function logoutCustomer(parameters) {
    var logoutUrl = getBaseURL() + '/oauth2/logout';

    var logoutOptions = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + parameters.access_token
        },
        queryParameters: {
            channel_id: config.CHANNEL_ID,
            refresh_token: parameters.refresh_token
        },
        useCredentials: slasServiceUtils.isPrivateClient(),
        onCredentials: function (options, credentials) {
            options.queryParameters.client_id = credentials.user; // eslint-disable-line no-param-reassign
        }
    };

    var logoutResponse = Fetch.fetch(SERVICE, logoutUrl, logoutOptions);

    if (!logoutResponse.ok) {
        Fetch.throwHttpError(logoutResponse, 'SLAS logoutCustomer error');
    }

    return JSON.parse(logoutResponse.body);
};

module.exports = base;
