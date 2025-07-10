'use strict';

var server = require('server');
var Calendar = require('dw/util/Calendar');
var userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var productListHelper = require('*/cartridge/scripts/productList/productListHelpers');

server.extend(module.superModule);

server.replace(
    'SubmitRegistration',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Resource = require('dw/web/Resource');

        var formErrors = require('*/cartridge/scripts/formErrors');

        var registrationForm = server.forms.getForm('profile');

        // form validation
        if (registrationForm.login.password.value
            !== registrationForm.login.passwordconfirm.value
        ) {
            registrationForm.login.password.valid = false;
            registrationForm.login.passwordconfirm.valid = false;
            registrationForm.login.passwordconfirm.error = Resource.msg('error.message.mismatch.password', 'forms', null);
            registrationForm.valid = false;
        }

        if (!CustomerMgr.isAcceptablePassword(registrationForm.login.password.value)) {
            registrationForm.login.password.valid = false;
            registrationForm.login.passwordconfirm.valid = false;
            registrationForm.login.passwordconfirm.error = Resource.msg('error.message.password.constraints.not.matched', 'forms', null);
            registrationForm.valid = false;
        }

        // setting variables for the BeforeComplete function
        var registrationFormObj = {
            firstName: registrationForm.customer.firstname.value,
            lastName: registrationForm.customer.lastname.value,
            phone: registrationForm.customer.phone.value,
            email: registrationForm.customer.email.value,
            birthday: registrationForm.customer.birthday.value,
            password: registrationForm.login.password.value,
            passwordConfirm: registrationForm.login.passwordconfirm.value,
            validForm: registrationForm.valid,
            form: registrationForm
        };

        if (registrationForm.valid) {
            res.setViewData(registrationFormObj);

            this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
                var Transaction = require('dw/system/Transaction');
                var accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');
                var authenticatedCustomer;
                var serverError;

                // getting variables for the BeforeComplete function
                var registrationForm = res.getViewData(); // eslint-disable-line

                if (registrationForm.validForm) {
                    var login = registrationForm.email;
                    var password = registrationForm.password;

                    // attempt to create a new user and log that user in.
                    try {
                        Transaction.wrap(function () {
                            var error = {};
                            var newCustomer = CustomerMgr.createCustomer(login, password);

                            var authenticateCustomerResult = CustomerMgr.authenticateCustomer(login, password);
                            if (authenticateCustomerResult.status !== 'AUTH_OK') {
                                error = { authError: true, status: authenticateCustomerResult.status };
                                throw error;
                            }

                            authenticatedCustomer = CustomerMgr.loginCustomer(authenticateCustomerResult, false);

                            if (!authenticatedCustomer) {
                                error = { authError: true, status: authenticateCustomerResult.status };
                                throw error;
                            } else {
                                // assign values to the profile
                                var newCustomerProfile = newCustomer.getProfile();
                                newCustomerProfile.firstName = registrationForm.firstName;
                                newCustomerProfile.lastName = registrationForm.lastName;
                                newCustomerProfile.phoneHome = registrationForm.phone;
                                newCustomerProfile.email = registrationForm.email;
                                if  (registrationForm.birthday) {
                                    var calendar = new Calendar();
                                    calendar.parseByFormat(registrationForm.birthday, 'y-M-d');
                                    var birthday = calendar.time;
                                    newCustomerProfile.birthday = birthday;
                                }
                            }
                        });
                    } catch (e) {
                        if (e.authError) {
                            serverError = true;
                        } else {
                            registrationForm.validForm = false;
                            registrationForm.form.customer.email.valid = false;
                            registrationForm.form.customer.email.error = Resource.msg('error.message.username.invalid', 'forms', null);
                        }
                    }
                }

                delete registrationForm.password;
                delete registrationForm.passwordConfirm;
                formErrors.removeFormValues(registrationForm.form);

                if (serverError) {
                    res.setStatusCode(500);
                    res.json({
                        success: false,
                        errorMessage: Resource.msg('error.message.unable.to.create.account', 'login', null)
                    });

                    return;
                }

                if (registrationForm.validForm) {
                    // send a registration email
                    accountHelpers.sendCreateAccountEmail(authenticatedCustomer.profile);

                    res.setViewData({ authenticatedCustomer: authenticatedCustomer });
                    res.json({
                        success: true,
                        redirectUrl: accountHelpers.getLoginRedirectURL(req.querystring.rurl, req.session.privacyCache, true)
                    });

                    req.session.privacyCache.set('args', null);
                } else {
                    res.json({
                        fields: formErrors.getFormErrors(registrationForm)
                    });
                }
            });
        } else {
            res.json({
                fields: formErrors.getFormErrors(registrationForm)
            });
        }

        this.on('route:Complete', function (requ, resp) {
            if (resp.getViewData().authenticatedCustomer) {
                require('dw/system/HookMgr').callHook('app.account.created', 'created', resp.getViewData().authenticatedCustomer);
            }
        });

        return next();
    }
);

server.replace(
    'SaveProfile',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var Transaction = require('dw/system/Transaction');
        var CustomerMgr = require('dw/customer/CustomerMgr');
        var Resource = require('dw/web/Resource');
        var URLUtils = require('dw/web/URLUtils');
        var accountHelpers = require('*/cartridge/scripts/helpers/accountHelpers');
        var emailHelpers = require('*/cartridge/scripts/helpers/emailHelpers');

        var formErrors = require('*/cartridge/scripts/formErrors');

        var profileForm = server.forms.getForm('profile');

        var result = {
            firstName: profileForm.customer.firstname.value,
            lastName: profileForm.customer.lastname.value,
            phone: profileForm.customer.phone.value,
            email: profileForm.customer.email.value,
            password: profileForm.login.password.value,
            profileForm: profileForm
        };
        if (profileForm.valid) {
            res.setViewData(result);
            this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
                var formInfo = res.getViewData();
                var customer = CustomerMgr.getCustomerByCustomerNumber(
                    req.currentCustomer.profile.customerNo
                );
                var profile = customer.getProfile();
                var customerLogin;
                var status;

                Transaction.wrap(function () {
                    status = profile.credentials.setPassword(
                        formInfo.password,
                        formInfo.password,
                        true
                    );

                    if (status.error) {
                        formInfo.profileForm.login.password.valid = false;
                        formInfo.profileForm.login.password.error =
                            Resource.msg('error.message.currentpasswordnomatch', 'forms', null);
                    } else {
                        customerLogin = profile.credentials.setLogin(
                            formInfo.email,
                            formInfo.password
                        );
                    }
                });

                delete formInfo.password;

                if (customerLogin) {
                    var emailType = emailHelpers.emailTypes.accountEdited;
                    if (profile.getFirstName() + profile.getLastName() !== formInfo.firstName + formInfo.lastName) {
                        emailType = emailHelpers.emailTypes.accountNameChanged;
                    }
                    if (profile.getEmail() !== formInfo.email) {
                        emailType = emailHelpers.emailTypes.accountEmailChanged;
                    }

                    Transaction.wrap(function () {
                        profile.setFirstName(formInfo.firstName);
                        profile.setLastName(formInfo.lastName);
                        profile.setEmail(formInfo.email);
                        profile.setPhoneHome(formInfo.phone);
                    });

                    // Send account edited email
                    accountHelpers.sendAccountEditedEmail(customer.profile, emailType);

                    delete formInfo.profileForm;
                    delete formInfo.email;

                    res.json({
                        success: true,
                        redirectUrl: URLUtils.url('Account-Show').toString()
                    });
                } else {
                    if (!status.error) {
                        formInfo.profileForm.customer.email.valid = false;
                        formInfo.profileForm.customer.email.error =
                            Resource.msg('error.message.username.invalid', 'forms', null);
                    }

                    delete formInfo.profileForm;
                    delete formInfo.email;

                    res.json({
                        success: false,
                        fields: formErrors.getFormErrors(profileForm)
                    });
                }
            });
        } else {
            res.json({
                success: false,
                fields: formErrors.getFormErrors(profileForm)
            });
        }

        this.on('route:Complete', function () {
            if (customer.authenticated) {
                require('dw/system/HookMgr').callHook('app.account.updated', 'updated', customer);
            }
        });

        return next();
    }
);

server.append('SubmitRegistration', function (req, res, next) {
    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var viewData = res.getViewData();
        var listGuest = viewData.list;
        if (viewData.authenticatedCustomer) {
            var listLoggedIn = productListHelper.getList(viewData.authenticatedCustomer, { type: 10 });
            productListHelper.mergelists(listLoggedIn, listGuest, req, { type: 10 });
        }
    });
    next();
});

server.get(
    'Communication-Preferences',
    server.middleware.https,
    userLoggedIn.validateLoggedIn,
    consentTracking.consent,
    function (req, res, next) {
        res.render('account/communicationPreferences');
        next();
    }
);

server.append('Login', function (req, res, next) {
    this.on('route:Complete', function () {
        if (customer.isAuthenticated() && require('dw/system/HookMgr').hasHook('app.customer.loggedIn')) {
            require('dw/system/HookMgr').callHook(
                'app.customer.loggedIn',
                'loggedIn'
            );
        }
    });
    next();
});

module.exports = server.exports();
