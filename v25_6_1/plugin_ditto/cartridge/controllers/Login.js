'use strict';

var server = require('server');

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

server.extend(module.superModule);

server.replace(
    'Show',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var URLUtils = require('dw/web/URLUtils');

        var target = req.querystring.rurl || 1;

        var rememberMe = false;
        var userName = '';
        var actionUrl = URLUtils.url('Account-Login', 'rurl', target);

        if (req.currentCustomer.credentials) {
            rememberMe = true;
            userName = req.currentCustomer.credentials.username;
        }

        var profileForm = server.forms.getForm('profile');
        profileForm.clear();

        res.render('/account/login', {
            rememberMe: rememberMe,
            userName: userName,
            actionUrl: actionUrl,
            profileForm: profileForm,
            oAuthReentryEndpoint: 1
        });

        next();
    }
);

server.get(
    'Register',
    consentTracking.consent,
    server.middleware.https,
    csrfProtection.generateToken,
    function (req, res, next) {
        var URLUtils = require('dw/web/URLUtils');

        var target = req.querystring.rurl || 1;

        var rememberMe = false;
        var userName = '';
        var actionUrl = URLUtils.url('Account-Login', 'rurl', target);
        var createAccountUrl = URLUtils.url('Account-SubmitRegistration', 'rurl', target).relative().toString();

        if (req.currentCustomer.credentials) {
            rememberMe = true;
            userName = req.currentCustomer.credentials.username;
        }

        var profileForm = server.forms.getForm('profile');
        profileForm.clear();

        res.render('/account/register', {
            rememberMe: rememberMe,
            userName: userName,
            actionUrl: actionUrl,
            profileForm: profileForm,
            oAuthReentryEndpoint: 1,
            createAccountUrl: createAccountUrl
        });

        next();
    }
);

server.get('OAuthReentrySalesforce', server.middleware.https, consentTracking.consent, function (req, res, next) {
    var URLUtils = require('dw/web/URLUtils');
    var oauthLoginFlowMgr = require('dw/customer/oauth/OAuthLoginFlowMgr');
    var CustomerMgr = require('dw/customer/CustomerMgr');
    var Transaction = require('dw/system/Transaction');
    var Resource = require('dw/web/Resource');

    var destination = req.session.privacyCache.store.oauthLoginTargetEndPoint;

    var finalizeOAuthLoginResult = oauthLoginFlowMgr.finalizeOAuthLogin();
    if (!finalizeOAuthLoginResult) {
        res.redirect(URLUtils.url('Login-Show'));
        return next();
    }

    var response = finalizeOAuthLoginResult.userInfoResponse.userInfo;
    var oauthProviderID = finalizeOAuthLoginResult.accessTokenResponse.oauthProviderId;

    if (!oauthProviderID) {
        res.render('/error', {
            message: Resource.msg('error.oauth.login.failure', 'login', null)
        });

        return next();
    }

    if (!response) {
        res.render('/error', {
            message: Resource.msg('error.oauth.login.failure', 'login', null)
        });

        return next();
    }

    var externalProfile = JSON.parse(response);
    if (!externalProfile) {
        res.render('/error', {
            message: Resource.msg('error.oauth.login.failure', 'login', null)
        });

        return next();
    }

    var userID = externalProfile.user_id;
    if (!userID) {
        res.render('/error', {
            message: Resource.msg('error.oauth.login.failure', 'login', null)
        });

        return next();
    }

    var authenticatedCustomerProfile = CustomerMgr.getExternallyAuthenticatedCustomerProfile(
        oauthProviderID,
        userID
    );

    if (!authenticatedCustomerProfile) {
        // Create new profile
        Transaction.wrap(function () {
            var newCustomer = CustomerMgr.createExternallyAuthenticatedCustomer(
                oauthProviderID,
                userID
            );

            authenticatedCustomerProfile = newCustomer.getProfile();
            authenticatedCustomerProfile.setFirstName(externalProfile.given_name);
            authenticatedCustomerProfile.setLastName(externalProfile.family_name);
            authenticatedCustomerProfile.setEmail(externalProfile.email);
        });
    }

    var credentials = authenticatedCustomerProfile.getCredentials();
    if (credentials.isEnabled()) {
        Transaction.wrap(function () {
            CustomerMgr.loginExternallyAuthenticatedCustomer(oauthProviderID, userID, false);
        });
    } else {
        res.render('/error', {
            message: Resource.msg('error.oauth.login.failure', 'login', null)
        });

        return next();
    }

    req.session.privacyCache.clear();
    res.redirect(URLUtils.url(destination));

    return next();
});


/**
 * Login-OAuthReentry : This endpoint is called by the External OAuth Login Provider (Facebook, Google, TabID etc. to re-enter storefront after shopper logs in using their service
 * @name Base/Login-OAuthReentry
 * @function
 * @memberof Login
 * @param {middleware} - server.middleware.https
 * @param {middleware} - consentTracking.consent
 * @param {querystringparameter} - code - given by facebook
 * @param {querystringparameter} - state - given by facebook
 * @param {category} - sensitive
 * @param {renders} - isml only if there is a error
 * @param {serverfunction} - get
 */
server.replace('OAuthReentry', server.middleware.https, consentTracking.consent, function (req, res, next) {
    const CustomerMgr = require('dw/customer/CustomerMgr');
    const HookMgr = require('dw/system/HookMgr');
    const Logger = require('dw/system/Logger');
    const OAuthLoginFlowMgr = require('dw/customer/oauth/OAuthLoginFlowMgr');
    const Resource = require('dw/web/Resource');
    const Transaction = require('dw/system/Transaction');

    var destination = req.session.privacyCache.store.oauthLoginTargetEndPoint;
    var errorMessage = Resource.msg('error.oauth.login.failure', 'login', null);
    var template = '/error';

    var finalizeOAuthLoginResult = OAuthLoginFlowMgr.finalizeOAuthLogin();
    if (!finalizeOAuthLoginResult) {
        res.render(template, { message: errorMessage });
        return next();
    }

    var response = finalizeOAuthLoginResult.userInfoResponse ? finalizeOAuthLoginResult.userInfoResponse.userInfo : null;
    if (!response) {
        res.render(template, { message: errorMessage });
        return next();
    }

    var oauthProviderID = finalizeOAuthLoginResult.accessTokenResponse.oauthProviderId;
    if (!oauthProviderID) {
        res.render(template, { message: errorMessage });
        return next();
    }

    var externalProfile = null;
    try {
        externalProfile = JSON.parse(response);
    } catch (e) {
        Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
    }

    if (!externalProfile) {
        res.render(template, { message: errorMessage });
        return next();
    }

    var userID = externalProfile.id || externalProfile.uid || externalProfile.user_id || externalProfile.sub;
    if (!userID) {
        res.render(template, { message: errorMessage });
        return next();
    }

    var authenticatedCustomerProfile = CustomerMgr.getExternallyAuthenticatedCustomerProfile(oauthProviderID, userID);
    if (!authenticatedCustomerProfile) {
        // Create new profile
        Transaction.wrap(function () {
            var newCustomer = CustomerMgr.createExternallyAuthenticatedCustomer(oauthProviderID, userID);

            authenticatedCustomerProfile = newCustomer.getProfile();
            var firstName;
            var lastName;
            var email;

            // Google comes with a 'name' property that holds first and last name.
            if (typeof externalProfile.name === 'object') {
                firstName = externalProfile.name.givenName;
                lastName = externalProfile.name.familyName;
            } else {
                // The other providers use one of these, GitHub has just a 'name'.
                firstName = externalProfile['first-name']
                    || externalProfile.first_name
                    || externalProfile.given_name
                    || externalProfile.name;

                lastName = externalProfile['last-name']
                    || externalProfile.last_name
                    || externalProfile.family_name
                    || externalProfile.name;
            }

            email = externalProfile['email-address'] || externalProfile.email;

            if (!email) {
                var emails = externalProfile.emails;
                if (emails && emails.length) {
                    email = externalProfile.emails[0].value;
                }
            }

            if (firstName) authenticatedCustomerProfile.setFirstName(firstName);
            if (lastName) authenticatedCustomerProfile.setLastName(lastName);
            if (email) authenticatedCustomerProfile.setEmail(email);
        });
    }

    var credentials = authenticatedCustomerProfile.getCredentials();
    if (credentials.isEnabled()) {
        Transaction.wrap(function () {
            CustomerMgr.loginExternallyAuthenticatedCustomer(oauthProviderID, userID, false);
        });

        if (HookMgr.hasHook('app.customer.loggedIn')) {
            HookMgr.callHook(
                'app.customer.loggedIn',
                'loggedIn'
            );
        }
    } else {
        res.render('/error', { message: errorMessage });
        return next();
    }

    req.session.privacyCache.clear();
    req.session.privacyCache.set('oauthProviderID', oauthProviderID);

    res.redirect(destination);

    return next();
});

module.exports = server.exports();
