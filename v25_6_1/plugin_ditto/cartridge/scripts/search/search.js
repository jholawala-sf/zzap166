'use strict';

const base = module.superModule;

const cleanPrice = function (price) {
    return price.replace(/,+/g, '');
};

/**
 * Sets the relevant product search model properties, depending on the parameters provided
 *
 * @param {dw.catalog.ProductSearchModel} productSearch - Product search object
 * @param {Object} httpParams - Query params
 * @param {dw.catalog.Category} selectedCategory - Selected category
 * @param {dw.catalog.SortingRule} sortingRule - Product grid sort rule
 */
function setProductProperties(productSearch, httpParams, selectedCategory, sortingRule) {
    const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');

    var searchPhrase;

    if (httpParams.q) {
        searchPhrase = httpParams.q;
        productSearch.setSearchPhrase(searchPhrase);
    }
    if (selectedCategory) {
        productSearch.setCategoryID(selectedCategory.ID);
    }
    if (httpParams.pid) {
        productSearch.setProductIDs([httpParams.pid]);
    }
    if (siteHelpers.getSitePreference('isShopByStoreEnabled') && httpParams.storeId) {
        require('*/cartridge/scripts/helpers/shopByStoreHelpers').refineByStore(productSearch, httpParams.storeId);
    }
    if (httpParams.pmin) {
        productSearch.setPriceMin(parseInt(cleanPrice(httpParams.pmin), 10));
    }
    if (httpParams.pmax) {
        productSearch.setPriceMax(parseInt(cleanPrice(httpParams.pmax), 10));
    }
    if (httpParams.pmid) {
        productSearch.setPromotionID(httpParams.pmid);
    }
    if (sortingRule) {
        productSearch.setSortingRule(sortingRule);
    }

    productSearch.setRecursiveCategorySearch(true);
}

module.exports = {
    addRefinementValues: base.addRefinementValues,
    setProductProperties: setProductProperties
};
