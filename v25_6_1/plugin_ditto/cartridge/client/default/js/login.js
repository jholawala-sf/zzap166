'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    processInclude(require('./login/login'));

    try {
        // passwordless login
        processInclude(require('pwdless/passwordlessLogin/login'));
    } catch (err) {
        // plugin not in use
    }
});
