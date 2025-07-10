'use strict';

const base = module.superModule;

/**
 * Set content search configuration values
 *
 * @param {Object} params - Provided HTTP query parameters
 * @return {Object} - content search instance
 */
function setupContentSearch(params) {
    const ContentSearchModel = require('dw/content/ContentSearchModel');
    const ContentSearch = require('*/cartridge/models/search/contentSearch');
    const apiContentSearchModel = new ContentSearchModel();

    apiContentSearchModel.setRecursiveFolderSearch(true);
    apiContentSearchModel.setSearchPhrase(params.q);
    apiContentSearchModel.setFilteredByFolder(false);
    apiContentSearchModel.search();
    const contentSearchResult = apiContentSearchModel.getContent();
    const count = Number(apiContentSearchModel.getCount());
    const contentSearch = new ContentSearch(contentSearchResult, count, params.q, params.startingPage, null);

    return contentSearch;
}

/**
 * performs a search
 *
 * @param {Object} req - Provided HTTP query parameters
 * @param {Object} res - Provided HTTP query parameters
 * @return {Object} - an object with relevant search information
 */
function search(req, res) {
    const CatalogMgr = require('dw/catalog/CatalogMgr');
    const ProductSearchModel = require('dw/catalog/ProductSearchModel');
    const URLUtils = require('dw/web/URLUtils');

    const pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
    const ProductSearch = require('*/cartridge/models/search/productSearch');
    const reportingUrlsHelper = require('*/cartridge/scripts/reportingUrls');
    const schemaHelper = require('*/cartridge/scripts/helpers/structuredDataHelper');

    let apiProductSearch = new ProductSearchModel();
    const maxSlots = 4;
    let categoryTemplate = '';
    let productSearch;
    let reportingURLs;

    const searchRedirect = req.querystring.q ? apiProductSearch.getSearchRedirect(req.querystring.q) : null;

    if (searchRedirect) {
        return { searchRedirect: searchRedirect.getLocation() };
    }

    apiProductSearch = base.setupSearch(apiProductSearch, req.querystring);
    apiProductSearch.search();

    if (!apiProductSearch.personalizedSort) {
        base.applyCache(res);
    }
    categoryTemplate = base.getCategoryTemplate(apiProductSearch);
    productSearch = new ProductSearch(
        apiProductSearch,
        req.querystring,
        req.querystring.srule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );

    pageMetaHelper.setPageMetaTags(req.pageMetaData, productSearch);

    const canonicalUrl = URLUtils.url('Search-Show', 'cgid', req.querystring.cgid);
    const refineurl = URLUtils.url('Search-Refinebar');
    const whitelistedParams = ['q', 'cgid', 'pmin', 'pmax', 'srule', 'pmid', 'storeId'];
    let isRefinedSearch = false;

    Object.keys(req.querystring).forEach(function (element) {
        if (whitelistedParams.indexOf(element) > -1) {
            refineurl.append(element, req.querystring[element]);
        }

        if (['pmin', 'pmax'].indexOf(element) > -1) {
            isRefinedSearch = true;
        }

        if (element === 'preferences') {
            let i = 1;
            isRefinedSearch = true;
            Object.keys(req.querystring[element]).forEach(function (preference) {
                refineurl.append('prefn' + i, preference);
                refineurl.append('prefv' + i, req.querystring[element][preference]);
                i++;
            });
        }
    });

    if (productSearch.searchKeywords !== null && !isRefinedSearch) {
        reportingURLs = reportingUrlsHelper.getProductSearchReportingURLs(productSearch);
    }

    const result = {
        productSearch: productSearch,
        maxSlots: maxSlots,
        reportingURLs: reportingURLs,
        refineurl: refineurl,
        canonicalUrl: canonicalUrl,
        apiProductSearch: apiProductSearch
    };

    if (productSearch.isCategorySearch && !productSearch.isRefinedCategorySearch && categoryTemplate) {
        pageMetaHelper.setPageMetaData(req.pageMetaData, productSearch.category);
        result.category = apiProductSearch.category;
        result.categoryTemplate = categoryTemplate;
    }

    if (!categoryTemplate || categoryTemplate === 'rendering/category/categoryproducthits') {
        result.schemaData = schemaHelper.getListingPageSchema(productSearch.productIds);
    }

    return result;
}

/**
 * Retrieves banner image URL
 *
 * @param {dw.catalog.Category} category - Subject category
 * @return {string} - Banner's image URL
 */
function getBannerImageUrl(category) {
    var url = null;

    if (category.custom && 'slotBannerImage' in category.custom &&
        category.custom.slotBannerImage) {
        url = category.custom.slotBannerImage.getURL();
    } else if (category.image) {
        url = category.image.getURL();
    }

    return url;
}

module.exports = base;
module.exports.setupContentSearch = setupContentSearch;
module.exports.search = search;
module.exports.getBannerImageUrl = getBannerImageUrl;
