const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const CatalogMgr = require('dw/catalog/CatalogMgr');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Climb up the category tree to see if any parents have the enable compare turned on
 *
 * @param {Object} productSearch - product search result model
 * @return {boolean} - boolean to determine if the template should display the compare checkbox
 */
function getCategoryCompareStatus(productSearch) {
    var compareBooleanValue = false;
    if (productSearch && productSearch.category) {
        var currentCategory;
        var selectedCategory;
        compareBooleanValue = true;
        selectedCategory = CatalogMgr.getCategory(productSearch.category.id);
        compareBooleanValue = selectedCategory.custom.enableCompare;

        if (selectedCategory.parent) {
            currentCategory = selectedCategory.parent;
            while (currentCategory.ID !== 'root') {
                compareBooleanValue = compareBooleanValue || currentCategory.custom.enableCompare;
                currentCategory = currentCategory.parent;
            }
        }
    }
    return compareBooleanValue;
}

/**
 * Render logic for the storefront.popularCategories.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');
    const searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    const ProductSearch = require('*/cartridge/models/search/productSearch');
    const pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    const model = new HashMap();
    const { component, content } = context;

    var httpParams = {};
    var customParams = {};
    if (request.httpParameterMap && request.httpParameterMap.params) {
        try {
            httpParams = JSON.parse(request.httpParameterMap.params);
            customParams = httpParams.custom ? JSON.parse(httpParams.custom) : {};
        } catch (ex) {
            httpParams = {};
            customParams = {};
        }
    }

    model.regions = PageRenderHelper.getRegionModelRegistry(component);
    const params = {
        cgid: content.category.getID(),
        storeId: customParams && customParams.storeId ? customParams.storeId : null
    };

    let apiProductSearch = new ProductSearchModel();
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, params);
    apiProductSearch.search();

    const productSearch = new ProductSearch(
        apiProductSearch,
        params,
        apiProductSearch.category.defaultSortingRule.ID,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );

    pageMetaHelper.setPageMetaTags(request.pageMetaData, productSearch);

    model.productSearch = productSearch;
    model.apiProductSearch = apiProductSearch;
    model.compareEnabled = getCategoryCompareStatus(productSearch);
    model.isEditMode = PageRenderHelper.isInEditMode();
    model.isPD = true;

    if (require('*/cartridge/scripts/helpers/siteHelpers').getSitePreference('isShopByStoreEnabled') && params.storeId) {
        // get product search refinements and save to variable for view data prior to resetting price books
        var origProductSearch = null;
        if (productSearch && productSearch.refinements) {
            origProductSearch = productSearch;
        }
        require('*/cartridge/scripts/helpers/shopByStoreHelpers').updateShopByStoreSearch();
        if (origProductSearch) {
            model.productSearch = origProductSearch;
        }
    }

    return new Template('experience/components/layouts/productList').render(model).text;
};
