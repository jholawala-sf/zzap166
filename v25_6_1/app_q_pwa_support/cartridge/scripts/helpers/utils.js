const base = module.superModule;

var {
    getClientRegistry
} = require('*/cartridge/scripts/config/clientRegistry');

/**
 * @typedef {Object} ShopperContext
 * @property {string} sourceCode
 * @property {string[]} customerGroupIds
 * @property {string} effectiveDateTime
 * @property {Object} customQualifiers
 * @property {Object} assignmentQualifiers
 */

/**
 * Check that the shopper context only contains properties that are allowed for
 * this client
 * @param {string} clientId - client id to be validated against
 * @param {ShopperContext} shopperContext - shopper context to be validated
 * @return {boolean} - validation status
 */
function validateContext(clientId, shopperContext) {
    const clientRegistry = getClientRegistry();

    if (!(clientId in clientRegistry)) {
        // short circuit for backwards compat
        return true;
    }
    return base.validateContext(clientId, shopperContext);
}

module.exports = Object.assign({}, base, {
    validateContext: validateContext
});
