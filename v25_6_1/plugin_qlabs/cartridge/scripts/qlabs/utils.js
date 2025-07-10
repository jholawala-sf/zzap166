'use strict';

const ObjectAttributeDefinition = require('dw/object/ObjectAttributeDefinition');
const Site = require('dw/system/Site');
const currentSite = Site.getCurrent();

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
 * gets default locale
 * @return {string} the current locale
 */
function getCurrentLocale() {
    const Resource = require('dw/web/Resource');
    var locale = request && request.locale ? request.locale : null;
    if (!locale) {
        locale = currentSite.getDefaultLocale();
    }
    if (locale === 'default') {
        locale = Resource.msg('config.defaultLocale', 'config', 'en_US');
    }
    return locale;
}

/**
 * get site preference value by name
 * @param {string} name - site preference name
 * @returns {string|null} the site preference
 */
function getSitePreference(name){
    if (!name || !currentSite || !currentSite.preferences) return null;
    var sitePrefValue = Object.hasOwnProperty.call(currentSite.preferences.custom, name)
        ? currentSite.getCustomPreferenceValue(name)
        : null;
    if (sitePrefValue && Object.hasOwnProperty.call(sitePrefValue, 'value')) {
        sitePrefValue = sitePrefValue.value;
    }
    return sitePrefValue;
}

/**
 * Determines the base URL for the composable site
 * @return {string|null} the base URL for the composable site
 */
function getComposableBaseUrl() {
    if (!currentSite) return null;

    const host = request.httpHost;
    const isComposableNative = getSitePreference('composableNative');
    const composableURL = getSitePreference('composableURL');
    const siteId = currentSite.getID();

    if (isComposableNative && composableURL && host && composableURL.indexOf(host) === -1) {
        return composableURL.substring(0, composableURL.indexOf(siteId)).replace(/^\/|\/$/g, '');
    }

    return null;
}

/**
 * Converts locale from the format used in SFRA format to the format used in PWA
 * @param {string} locale - the locale (en_US)
 * @returns {string} - the updated locale
 */
function convertLocale(locale) {
    if (!locale) locale = getCurrentLocale();
    return locale.replace(/_/, '-');
}

/**
 * Get the composable URL routes
 * @returns {Object} the composable URL routes
 */
function getRoutes() {
    var PWA_KIT_ROUTES = getSitePreference('pwa_kit_routes');
    var routes = null;
    if (PWA_KIT_ROUTES) {
        try {
            routes = JSON.parse(PWA_KIT_ROUTES.valueOf());
        } catch (e) {
            routes = null;
        }
    }
    if (!routes) {
        routes = {
            Home: '/[siteid]/[locale]/',
            Product: '/[siteid]/[locale]/product/[productid]',
            Category: '/[siteid]/[locale]/category/[categoryid]',
            Search: '/[siteid]/[locale]/search?q=[searchterms]',
            Account: '/[siteid]/[locale]/account',
            Cart: '/[siteid]/[locale]/cart',
            Login: '/[siteid]/[locale]/login',
            Checkout: '/[siteid]/[locale]/checkout',
            Order: '/[siteid]/[locale]/account/orders',
            OrderDetail: '/[siteid]/[locale]/account/orders/[orderid]',
            Wishlist: '/[siteid]/[locale]/account/wishlist'
        }
    }
    return routes;
}

function getComposableUrl(component, locale) {
    var routes = getRoutes();
    var route = routes[component];
    if (!route) return undefined;

    var siteId = currentSite.getID();
    var path = route.replace(/\[locale\]/g, convertLocale(locale)).replace(/\[siteid\]/g, siteId).toString();
    var baseUrl = getComposableBaseUrl();
    if (baseUrl) {
        path = baseUrl + path;
    }

    return path;
}

/**
 * Get the composable product URL
 * @param locale
 * @param {string} pid - the product id
 */
function getComposableProductUrl(locale, pid) {
    return getComposableUrl('Product', locale).replace(/\[productid\]/g, pid);
}

module.exports = {
    getAttributeValueType,
    getCurrentLocale,
    getSitePreference,
    getComposableBaseUrl,
    convertLocale,
    getRoutes,
    getComposableUrl,
    getComposableProductUrl
};
