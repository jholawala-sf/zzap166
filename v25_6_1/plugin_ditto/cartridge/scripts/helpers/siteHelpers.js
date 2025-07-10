'use strict';

/* API Includes */
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
 * get custom attribute from object
 * checks for existence to avoid unnecessary error logs
 * @param {Object} extensibleObject - object
 * @param {string} customAttribute - custom attribute name
 * @returns {string|null} the site preference
 */
const getCustomAttributeFromObject = (extensibleObject, customAttribute) => {
    if (!extensibleObject || !customAttribute) return null;
    try {
        const customAttributes = extensibleObject.getCustom();
        if (customAttributes && Object.hasOwnProperty.call(customAttributes, customAttribute) && customAttributes[customAttribute]) {
            return customAttributes[customAttribute];
        }
    } catch (e) {
        return null;
    }
    return null;
};

const showGatedCommerceComponent = () => {
    var enableGatedCommerce = getSitePreference('dittoEnableGatedCommerce');
    // if gated commerce is not enabled, return true to show the component
    if (!enableGatedCommerce) {
        return true;
    }
    if (customer.authenticated && customer.profile) {
        return true;
    }
    return false;
}

module.exports = {
    getSitePreference,
    getCustomAttributeFromObject,
    showGatedCommerceComponent
};
