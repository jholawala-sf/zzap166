var base = module.superModule;

function showProductPage(querystring, reqPageMetaData) {
    var viewModel = base.showProductPage(querystring, reqPageMetaData);
    var product = viewModel.product.raw;
    var id = product.variant ? product.masterProduct.ID : product.ID;
    var canonicalUrl = dw.web.URLUtils.url('Product-Show', 'pid', id);
    return Object.assign(viewModel, {
        canonicalUrl: canonicalUrl
    });
}

/**
 * returns specified custom attribute if it exists
 * @param {dw.catalog.Product} product - Product
 * @param {Object} customAttribute - custom attribute to retrieve
 * @param {boolean} returnSitePrefValue - if true, get custom site preference if product custom attribute is null
 * @param {string} returnValue - should we return .value or .displayValue
 * @returns {Object} profile custom attribute
 */
function getProductCustomAttribute(product, customAttribute, returnSitePrefValue, returnValue) {
    if (!product || !customAttribute) return null;

    const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');

    var customAttributeValue = Object.hasOwnProperty.call(product.custom, customAttribute) && product.custom[customAttribute] ? product.custom[customAttribute] : null;
    if (!customAttributeValue) {
        // set a value for values that don't exist
        var attributeDefinition = product.describe().getCustomAttributeDefinition(customAttribute);
        if (attributeDefinition && attributeDefinition.getValueTypeCode()) {
            switch (attributeDefinition.getValueTypeCode()) {
                case attributeDefinition.VALUE_TYPE_NUMBER:
                case attributeDefinition.VALUE_TYPE_INT:
                    customAttributeValue = 0;
                    break;
                case attributeDefinition.VALUE_TYPE_BOOLEAN:
                    customAttributeValue = false;
                    break;
                default:
                    customAttributeValue = null;
                    break;
            }
        }
    }

    // get site preference value by the same name if product custom attribute is null
    if (!customAttributeValue && returnSitePrefValue) {
        customAttributeValue = siteHelpers.getSitePreference(customAttribute);
    }

    if (returnValue !== null) {
        if (customAttributeValue && Object.hasOwnProperty.call(customAttributeValue, returnValue) && customAttributeValue[returnValue]) {
            return customAttributeValue[returnValue];
        }
    }

    if (customAttributeValue && Object.hasOwnProperty.call(customAttributeValue, 'value')) {
        customAttributeValue = customAttributeValue.value;
    }

    return customAttributeValue;
}

/**
 * Get product search hit for a given product
 * @param {dw.catalog.Product} apiProduct - Product instance returned from the API
 * @returns {dw.catalog.ProductSearchHit} - product search hit for a given product
 */
function getProductSearchHit(apiProduct) {
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchModel = new ProductSearchModel();
    searchModel.setSearchPhrase(apiProduct.ID);
    searchModel.search();

    if (searchModel.count === 0) {
        searchModel.setSearchPhrase(apiProduct.ID.replace(/-/g, ' '));
        searchModel.search();
    }

    var hit = searchModel.getProductSearchHit(apiProduct);
    if (!hit) {
        var tempHit = searchModel.getProductSearchHits().next();
        if (tempHit.firstRepresentedProductID) {
            hit = tempHit;
        }
    }
    return hit;
}

module.exports = Object.assign({}, base, {
    showProductPage: showProductPage,
    getProductCustomAttribute: getProductCustomAttribute,
    getProductSearchHit: getProductSearchHit
});
