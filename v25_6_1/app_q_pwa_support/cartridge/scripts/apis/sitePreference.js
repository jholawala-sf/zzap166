'use strict';

/* globals InternalError */

const ObjectAttributeDefinition = require('dw/object/ObjectAttributeDefinition');
const Site = require('dw/system/Site');
const System = require('dw/system/System');
const CONSTANTS = require('*/cartridge/scripts/config/qPwaConstants');

/**
 * returns friendly attribute value type
 * @param {number} valueTypeCode - attribute value type code
 * @returns {string|null} value type
 */
function getAttributeValueType(valueTypeCode) {
    if (!valueTypeCode) return null;
    switch (valueTypeCode) {
        case ObjectAttributeDefinition.VALUE_TYPE_INT:
            return 'integer'; // 1
        case ObjectAttributeDefinition.VALUE_TYPE_NUMBER:
            return 'number'; // 2
        case ObjectAttributeDefinition.VALUE_TYPE_STRING:
            return 'string'; // 3
        case ObjectAttributeDefinition.VALUE_TYPE_TEXT:
            return 'text'; // 4
        case ObjectAttributeDefinition.VALUE_TYPE_HTML:
            return 'html'; // 5
        case ObjectAttributeDefinition.VALUE_TYPE_IMAGE:
            return 'image'; // 7
        case ObjectAttributeDefinition.VALUE_TYPE_BOOLEAN:
            return 'boolean'; // 8
        case ObjectAttributeDefinition.VALUE_TYPE_DATE:
            return 'date'; // 6
        case ObjectAttributeDefinition.VALUE_TYPE_DATETIME:
            return 'datetime'; // 11
        case ObjectAttributeDefinition.VALUE_TYPE_EMAIL:
            return 'email'; // 12
        case ObjectAttributeDefinition.VALUE_TYPE_PASSWORD:
            return 'password'; // 13
        case ObjectAttributeDefinition.VALUE_TYPE_SET_OF_INT:
            return 'set_of_integer'; // 21
        case ObjectAttributeDefinition.VALUE_TYPE_SET_OF_NUMBER:
            return 'set_of_number'; // 22
        case ObjectAttributeDefinition.VALUE_TYPE_SET_OF_STRING:
            return 'set_of_string'; // 23
        case ObjectAttributeDefinition.VALUE_TYPE_ENUM_OF_INT:
            return 'enum_of_integer'; // 31
        case ObjectAttributeDefinition.VALUE_TYPE_ENUM_OF_STRING:
            return 'enum_of_string'; // 33
        default:
            return null;
    }
}

/**
 This SCAPI CUSTOM API endpoint is used to look up site preferences for the specified site by site preference Id
 *
 * This endpoint will productized soon. As such, for security concerns, it will only return site preferences
 * for development instances. Password fields will not be returned
 *
 * @param {string} id - the site preference id
 * @returns {Object} api response
 */
function getSitePreference(id) {
    const result = {
        id,
        type: null,
        value: null,
        error: false
    };

    try {
        const currentSite = Site.getCurrent();
        const siteId = currentSite ? currentSite.getID() : null;
        if (!currentSite || !siteId) {
            throw new InternalError('Current site could not be determined!');
        }

        // ensure retrieval of the site preference id is allowed
        const enableAllowList = Object.hasOwnProperty.call(currentSite.preferences.custom, 'sitePrefApiEnableAllowList') ? currentSite.getCustomPreferenceValue('sitePrefApiEnableAllowList') : true;
        if (enableAllowList || System.instanceType === System.PRODUCTION_SYSTEM) {
            if (CONSTANTS.SITE_PREF_API_ALLOWLIST.indexOf(id) === -1) {
                throw new InternalError(`Retrieval for site preference '${id}' is not allowed!`);
            }
        }

        const sitePrefs = currentSite.getPreferences();
        const objectTypeDefinition = sitePrefs.describe();
        const customAttributes = sitePrefs.getCustom();
        const sitePrefValue = customAttributes[id];
        const objectAttributeDefinition = objectTypeDefinition.getCustomAttributeDefinition(id);
        const valueTypeCode = objectAttributeDefinition.getValueTypeCode();

        result.type = getAttributeValueType(valueTypeCode);
        if (objectAttributeDefinition.valueTypeCode === ObjectAttributeDefinition.VALUE_TYPE_PASSWORD) {
            throw new TypeError(`Preference "${id}" is a password field and is not supported.`);
        }

        // special handling based on type
        switch (valueTypeCode) {
            case ObjectAttributeDefinition.VALUE_TYPE_HTML:
                result.value = {
                    markup: sitePrefValue ? sitePrefValue.getMarkup() : null,
                    source: sitePrefValue ? sitePrefValue.getSource() : null
                };
                break;
            case ObjectAttributeDefinition.VALUE_TYPE_IMAGE:
                result.value = {
                    absURL: sitePrefValue ? sitePrefValue.getAbsURL().toString() : null,
                    httpsURL: sitePrefValue ? sitePrefValue.getHttpsURL().toString() : null,
                    URL: sitePrefValue ? sitePrefValue.getURL().toString() : null
                };
                break;
            case ObjectAttributeDefinition.VALUE_TYPE_ENUM_OF_INT:
            case ObjectAttributeDefinition.VALUE_TYPE_ENUM_OF_STRING:
                result.value = [];
                if (sitePrefValue && sitePrefValue.length) {
                    sitePrefValue.forEach((prefValue) => {
                        result.value.push({
                            value: prefValue.value,
                            displayValue: prefValue.displayValue
                        });
                    });
                }
                break;
            default:
                result.value = sitePrefValue;
                break;
        }
    } catch (e) {
        result.error = {
            code: e.name || 'UNKNOWN',
            message: e.message || `Error retrieving preference: ${id}`
        };
    }
    return result;
}

/**
 This SCAPI CUSTOM API endpoint is used to look up site preferences for the specified site by site preference group Id
 *
 * This endpoint will productized soon. As such, for security concerns, it will only return site preferences
 * for development instances. Password fields will not be returned
 *
 * @param {string} id - the site preference id
 * @returns {Object} api response
 */
function getGroup(id) {
    const result = {
        groupId: id,
        error: false,
        sitePreferences: {}
    };

    try {
        const currentSite = Site.getCurrent();
        const siteId = currentSite ? currentSite.getID() : null;
        if (!currentSite || !siteId) {
            throw new InternalError('Current site could not be determined!');
        }

        const objectAttributeGroup = currentSite
            .getPreferences()
            .describe()
            .getAttributeGroup(id);
        if (!objectAttributeGroup) {
            throw new TypeError(`Site Preference Group ${id} does not exist.`);
        }

        objectAttributeGroup.getAttributeDefinitions()
            .toArray()
            .forEach((objectAttributeDefinition) => {
                result.sitePreferences[objectAttributeDefinition.ID] = getSitePreference(objectAttributeDefinition.ID);
            });
    } catch (e) {
        result.error = {
            code: e.name || 'UNKNOWN',
            message: e.message || `Error retrieving preference group: ${id}`
        };
    }
    if (!Object.keys(result.sitePreferences).length) {
        result.sitePreferences = null;
    }
    return result;
}

exports.get = getSitePreference;
exports.getGroup = getGroup;
exports.getAttributeValueType = getAttributeValueType;
