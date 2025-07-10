'use strict';


const Site = require('dw/system/Site');
const currentSite = Site.getCurrent();
const utils = require('*/cartridge/scripts/qlabs/utils');

/**
 * Generates the product URL
 * @param {string} pid - the product id
 * @return {string} the product URL
 */
function getProductUrl(pid) {
    const Logger = require('dw/system/Logger');
    const URLAction = require('dw/web/URLAction');
    const URLUtils = require('dw/web/URLUtils');
    const URLParameter = require('dw/web/URLParameter');
    const locale = utils.getCurrentLocale();
    const siteId = currentSite.getID();

    // optional, used to set the hostname if http-host and https-host do not exist in the alias configuration
    const hostName = utils.getSitePreference('hostname');

    const action = 'Product-Show';
    const pidParam = new URLParameter('pid', pid);

    try {
        const isComposableNative = utils.getSitePreference('composableNative');
        const composableURL = utils.getSitePreference('composableURL');
        if (siteId && locale) {
            if (isComposableNative && composableURL) {
                return utils.getComposableProductUrl(locale, pid);
            }
            if (hostName) {
                return URLUtils.https(new URLAction(action, siteId, locale, hostName), pidParam).toString();
            }
            return URLUtils.https(new URLAction(action, siteId, locale), pidParam).toString();
        }
    } catch (ex) {
        Logger.error(ex.toString() + ' in ' + ex.fileName + ':' + ex.lineNumber);
    }
    return URLUtils.https(action, 'pid', pid).toString();
}

/**
 * Get the product description
 * @param {dw.catalog.Product} apiProduct - API object for a product
 * @returns {string} the product description
 */
function getProductDescription(apiProduct) {
    if (!apiProduct) return '';
    var longDescription = apiProduct.longDescription ? apiProduct.longDescription.getSource() : '';
    var shortDescription = apiProduct.shortDescription ? apiProduct.shortDescription.getSource() : '';
    return longDescription || shortDescription;
}

/**
 * get product image
 * @param {dw.catalog.Product} apiProduct - API object for a product
 * @returns {string} the image URL
 */
function getProductImage(apiProduct) {
    if (!apiProduct) return '';

    var imageUrl = '';
    try {
        var mediaFile = apiProduct.getImage('medium');
        imageUrl = mediaFile.getURL().toString();
    } catch (e) {
        // we don't need to do anything here
    }

    return imageUrl;
}

/**
 * get master product id
 * @param {dw.catalog.Product} apiProduct - API object for a product
 * @returns {Object} object with the image data.
 */
function getMasterProductId(apiProduct) {
    if (!apiProduct) return '';
    if (apiProduct.variationModel && apiProduct.variationModel.master) {
        if (apiProduct.variationModel.master.isAssignedToSiteCatalog()) {
            return apiProduct.variationModel.master.ID;
        }
    }
    return apiProduct.ID;
}

module.exports = {
    getProductUrl,
    getProductDescription,
    getProductImage,
    getMasterProductId
};
