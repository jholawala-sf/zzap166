'use strict';

const base = module.superModule;

const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');

/**
 * Middleware validating if B2B user logged in, driven by site preference.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 * @returns {void}
 */
function validateGatedCommerce(req, res, next) {
    var enableGatedCommerce = siteHelpers.getSitePreference('dittoEnableGatedCommerce');
    if (enableGatedCommerce) {
        base.validateLoggedIn(req, res, next);
    }
    next();
}

base.validateGatedCommerce = validateGatedCommerce;

module.exports = base;
