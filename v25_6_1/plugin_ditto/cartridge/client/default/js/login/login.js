const base = require('base/login/login');
// eslint-disable-next-line no-unused-vars
const flatpickr = require('flatpickr');
require('password-requirements/jquery.password-requirements-checker');

/**
 * Initialize plugins
 */
const init = () => {
    $(document).ready(function () {
        $('.flatpickr').flatpickr({
            dateFormat: 'Y-m-d',
            wrap: true,
            maxDate: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
        });

        $('#registration-form-password, #newPassword').passwordRequirements();
    });
}

module.exports = {
    ...base,
    ...{ init: init }
};
