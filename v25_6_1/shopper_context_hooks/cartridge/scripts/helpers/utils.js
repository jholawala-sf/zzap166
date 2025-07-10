'use strict';

var Logger = require('dw/system/Logger');
var log = Logger.getLogger(
    'shopper_context_hooks',
    'shopper_context_hooks.config'
);

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
        log.error('Unknown client');
        return false;
    }

    if (
        clientRegistry[clientId].includes('all')
    ) {
        return true;
    }

    for (let key in shopperContext) {
        if (
            shopperContext[key] != null &&
            !clientRegistry[clientId].includes(key)
        ) {
            log.error('Client not allowed to set ' + key);
            return false;
        }
    }
    return true;
}

module.exports = {
    validateContext: validateContext
};
