'use strict';

// Implementations can override this module to provide their own registry of
// clients and their allowed attributes.

var Site = require('dw/system/Site');
var currentSite = Site.getCurrent();

var clientRegistrySitePreference = {};
var clientRegistryParseException;
try {
    clientRegistrySitePreference = JSON.parse(
        currentSite.getCustomPreferenceValue('shopperContextHooksClientRegistry')
    );
} catch (e) {
    clientRegistryParseException = new Error("Error parsing client registry site preference: " + e);
}

// currently available attributes:
// 'all', 'sourceCode', 'effectiveDateTime',
// 'customQualifiers', 'assignmentQualifiers', 'clientIp', 'geoLocation'
var DEFAULT_CLIENT_REGISTRY = {
    // '574cf8f6-8536-4a39-acbb-8e7f1759f901': ['sourceCode', 'customQualifiers'],
    // 'a6f9c517-4b85-4e7a-bacf-3f8f7589716c': ['all']
};

/**
 * get the client registry for shopper context
 * @returns {Object} - client registry
 */
function getClientRegistry() {
    if (clientRegistryParseException) {
        throw clientRegistryParseException;
    }
    return clientRegistrySitePreference || DEFAULT_CLIENT_REGISTRY;
}

module.exports = {
    getClientRegistry: getClientRegistry
};