'use strict';

const Site = require('dw/system/Site');
const currentSite = Site.getCurrent();

/**
 * get site preference value by name
 * @param {string} name - site preference name
 * @returns {string|null} the site preference
 */
const getSitePreference = (name) => {
    if (!name || !currentSite || !currentSite.preferences) return null;
    var sitePrefValue = Object.hasOwnProperty.call(currentSite.preferences.custom, name) ? currentSite.getCustomPreferenceValue(name) : null;
    if (sitePrefValue && Object.hasOwnProperty.call(sitePrefValue, 'value')) {
        sitePrefValue = sitePrefValue.value;
    }
    return sitePrefValue;
};

/**
 * gets default locale
 * @return {string} the current locale
 */
const getCurrentLocale = () => {
    var locale = request && request.locale ? request.locale : null;
    if (!locale) {
        locale = currentSite.getDefaultLocale();
    }

    if (locale === 'default') {
        locale = require('dw/web/Resource').msg('config.defaultLocale', 'config', 'en_US');
    }

    return locale;
};

const getCallbackUrl = (secretKey) => {
    const Logger = require('dw/system/Logger');
    const URLAction = require('dw/web/URLAction');
    const URLParameter = require('dw/web/URLParameter');
    const URLUtils = require('dw/web/URLUtils');

    const locale = getCurrentLocale();
    const siteId = currentSite.getID();

    if (!secretKey) {
        secretKey = getSitePreference('passwordlessLoginCallbackSecretKey'); // eslint-disable-line no-param-reassign
    }
    const action = 'PasswordlessLogin-Callback';
    const parameter = new URLParameter('key', secretKey);

    // optional, used to set the hostname if http-host and https-host do not exist in the alias configuration
    const hostName = getSitePreference('hostname');

    try {
        if (siteId && locale) {
            if (hostName) {
                return URLUtils.https(new URLAction(action, siteId, locale, hostName), parameter).toString();
            }
            return URLUtils.https(new URLAction(action, siteId, locale), parameter).toString();
        }
    } catch (ex) {
        Logger.error(ex.toString() + ' in ' + ex.fileName + ':' + ex.lineNumber);
    }
    return URLUtils.https(action, 'key', secretKey).toString();
}

/**
 * Parse passwordless login callback post
 * @param {dw.system.Request} req - request object
 * @returns {Object} parsed JSON body
 */
const parsePasswordlessLoginCallback = (req) => {
    const Logger = require('dw/system/Logger');
    const Request = require('dw/system/Request');
    var parsedBody = {};
    if (!req) return parsedBody;
    var requestBody = null;

    // updated to support req as an instance of dw.system.Request or as the SFRA req wrapper object
    if (req instanceof Request && req.httpParameterMap) {
        requestBody = req.httpParameterMap.requestBodyAsString;
    } else if (req.body) {
        requestBody = req.body;
    }
    if (!requestBody) return parsedBody;
    try {
        parsedBody = JSON.parse(requestBody);
    } catch (ex) {
        Logger.error(ex.toString() + ' in ' + ex.fileName + ':' + ex.lineNumber);
    }
    return parsedBody;
};

/**
 * Validates the callback from the passwordless login
 * @param {Object} parsedBody - the parsed request object
 * @param {string} secretKey - a secret key that must be present in the querystring of the request
 * @returns {Object} results object
 */
const validateCallback = (parsedBody, secretKey) => {
    const scapiConfig = require('*/cartridge/scripts/config/scapiConfig');
    const CustomerMgr = require('dw/customer/CustomerMgr');

    const email = parsedBody.email_id || null;
    const login = parsedBody.login_id || null;
    const token = parsedBody.token || null;
    const customerId = parsedBody.customer_id || null;
    const pwdlessCustomer = login ? CustomerMgr.getCustomerByLogin(login) : null;

    // check that secret key is valid
    const isSecretKeyValid = secretKey && decodeURIComponent(secretKey) === scapiConfig.CALLBACK_SECRET_KEY;

    // check that the token contains only digits
    const isTokenValid = token && /^\d+$/.test(token);

    const success = !!(isSecretKeyValid && isTokenValid && email && customerId
        && pwdlessCustomer
        && pwdlessCustomer.profile
        && String(pwdlessCustomer.profile.email).toLowerCase() === String(email).toLowerCase()
        && pwdlessCustomer.ID === customerId);

    return {
        success,
        email,
        token,
        pwdlessCustomer
    };
};

/**
 * Checks if the email value entered is correct format
 * @param {string} email - email string to check if valid
 * @returns {boolean} Whether email is valid
 */
const validateEmail = (email) => {
    var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regex.test(email);
};

/**
 * Searches customer profiles
 * @param {string} email - email to search profiles for
 * @returns {Object} a plain javascript object of matching profiles and external profile ID, if applicable
 */
const searchProfiles = (email) => {
    const CustomerMgr = require('dw/customer/CustomerMgr');
    const Resource = require('dw/web/Resource');

    const result = [];
    const profiles = CustomerMgr.searchProfiles('email = {0}', null, email).asList().toArray();
    if (profiles.length) {
        for (var i = 0; i < profiles.length; i++) {
            var profile = profiles[i];
            var credentials = profile.getCredentials();
            if (!credentials.isEnabled()) continue; // eslint-disable-line no-continue

            var profileObject = {
                email: email,
                login: credentials.getLogin(),
                externalProfileIds: [],
                oauthProvider: '',
                buttonText: Resource.msg('button.text.login.brand', 'login', null),
                buttonClass: '',
                buttonIcon: ''
            };

            var externalProfiles = profile.getCustomer().getExternalProfiles().toArray();
            if (externalProfiles.length) {
                profileObject.externalProfileIds = externalProfiles.map((extProfile) => String(extProfile.authenticationProviderID).toLowerCase());

                // set button text
                if (profileObject.externalProfileIds.length === 1) {
                    profileObject.oauthProvider = profileObject.externalProfileIds[0];
                    profileObject.buttonText = Resource.msg('button.text.login.' + profileObject.oauthProvider, 'login', null);
                    profileObject.buttonClass = `oauth-${profileObject.oauthProvider}`;
                    profileObject.buttonIcon = Resource.msg('button.icon.' + profileObject.oauthProvider, 'login', null);
                } else {
                    profileObject.buttonText = Resource.msgf('button.text.login.multi', 'login', null, profileObject.externalProfileIds.join(', '));
                }
            }

            result.push(profileObject);
        }
    }

    // updates results so that empty oAuthProvider (ecom login) is first and the IDPs are sorted desc (salesforce, google, facebook)
    result.sort((a, b) => (a.oauthProvider > b.oauthProvider) ? 1 : -1).reverse();
    result.unshift(result.pop()); // move last index to first position

    return result;
};

/**
 * Handles the authentication for passwordless login
 * @param {Object} params - an object containing login and email
 * @returns {Object} results object
 */
const handleAuth = ({login, email}) => {
    const CustomerMgr = require('dw/customer/CustomerMgr');
    const Resource = require('dw/web/Resource');
    const status = {
        OK: 'OK',
        ERROR: 'ERROR',
        MULTI: 'MULTI',
        NOT_FOUND: 'NOT_FOUND'
    }
    const result = {
        status: status.OK,
        loginId: null,
        error: null,
        profiles: []
    };
    const errorMessage = Resource.msg('error.message.passwordlesslogin.form', 'login', null);

    if (!login && (!email || !validateEmail(email))) {
        result.status = status.ERROR;
        result.error = errorMessage;
        return result;
    }

    var loginId = login || null;
    if (!loginId && email) {
        result.profiles = searchProfiles(email);
        // if we have more than 1 matching profile, have customer select correct login
        if (result.profiles.length === 1 && result.profiles[0] && result.profiles[0].login) {
            loginId = result.profiles[0].login;
        } else if (result.profiles.length > 1) {
            result.status = status.MULTI;
            result.message = Resource.msg('msg.passwordless.login.multi.heading', 'login', null);
            return result;
        }
    }

    // error if login has not been set
    if (!loginId) {
        result.status = status.NOT_FOUND;
        result.error = errorMessage;
        return result;
    }

    // error if no profile is found for the login
    const pwdlessCustomer = CustomerMgr.getCustomerByLogin(loginId);
    if (!pwdlessCustomer) {
        result.status = status.NOT_FOUND;
        result.error = errorMessage;
        return result;
    }

    result.loginId = loginId;
    return result;
};

/**
 * Sends the email with passwordless login instructions
 * @param {string} email - email for passwordless login
 * @param {string} passwordlessToken - password less token
 * @param {Object} passwordlessCustomer - the customer requesting passwordless login
 */
const sendPasswordlessLoginEmail = (email, passwordlessToken, passwordlessCustomer) => {
    const Resource = require('dw/web/Resource');
    const emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');

    var objectForEmail = {
        passwordlessToken: passwordlessToken || '',
        firstName: passwordlessCustomer && passwordlessCustomer.profile ? passwordlessCustomer.profile.firstName : null,
        passwordlessCustomer: passwordlessCustomer
    };

    var emailObj = {
        to: email,
        subject: Resource.msg('msg.passwordless.login.subject', 'login', null),
        from: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
        type: emailHelpers.emailTypes.passwordlessLoginToken
    };

    emailHelpers.sendEmail(emailObj, '/account/password/passwordlessLoginEmail', objectForEmail);
};

/**
 * get usid from guest refresh token if cookie is present
 * @returns {Object} javascript results object
 */
const getUsidFromRefreshCookie = () => {
    const config = require('*/cartridge/scripts/config/SLASConfig');
    const slasAuthHelper = require('*/cartridge/scripts/helpers/slasAuthHelper');

    const result = { usid: null };
    var usidCookie = slasAuthHelper.getCookie(config.USID_COOKIE_NAME);
    var guestRefreshTokenCookie = slasAuthHelper.getCookie(config.REFRESH_TOKEN_COOKIE_NAME_GUEST);

    if (usidCookie && usidCookie.value) {
        result.usid = usidCookie.value;
    } else if (guestRefreshTokenCookie && guestRefreshTokenCookie.value) {
        var refreshTokenLogin = slasAuthHelper.getSLASAccessTokenForRefreshLogin(guestRefreshTokenCookie.value);
        result.usid = refreshTokenLogin.usid;
    }

    return result;
};

module.exports = {
    getSitePreference,
    getCurrentLocale,
    getCallbackUrl,
    handleAuth,
    getUsidFromRefreshCookie,
    parsePasswordlessLoginCallback,
    searchProfiles,
    sendPasswordlessLoginEmail,
    validateCallback,
    validateEmail
};
