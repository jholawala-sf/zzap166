const server = require('server');
const Resource = require('dw/web/Resource');
const URLUtils = require('dw/web/URLUtils');
const PageMgr = require('dw/experience/PageMgr');
const CatalogMgr = require('dw/catalog/CatalogMgr');
const HashMap = require('dw/util/HashMap');
const cache = require('*/cartridge/scripts/middleware/cache');
const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
const pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

const page = module.superModule;
server.extend(page);

server.get('TheStore', function (req, res, next) {
    var storeInventoryFilter = new dw.catalog.StoreInventoryFilter('city',
        new dw.util.ArrayList(new dw.catalog.StoreInventoryFilterValue('Portland', '0335-store')));

    var psm = new dw.catalog.ProductSearchModel();
    psm.setCategoryID('root');
    if (request.httpParameterMap.city.submitted) {
        psm.setStoreInventoryFilter(storeInventoryFilter);
    } else if (request.httpParameterMap.inventoryList.submitted) {
        psm.setInventoryListIDs(new dw.util.ArrayList(request.httpParameterMap.inventoryList.stringValues));
    }
    psm.setSearchPhrase(request.httpParameterMap.q.stringValue);
    psm.search();
    res.json({
        'searchResults': psm.getCount()
    });
    next();
});

/**
 * Helper for building breadcrumbs for category searches
 * @param {array} breadcrumbs The breadcrumbs array
 * @param {*} category The category being traversed
 */
function buildCategoryBreadcrumbs(breadcrumbs, category) {
    if (category.root) return;

    if (category.parent) {
        buildCategoryBreadcrumbs(breadcrumbs, category.parent);
    }

    breadcrumbs.push({
        htmlValue: category.displayName,
        url: URLUtils.url('Search-Show', 'cgid', category.ID).toString()
    });
}

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

server.replace('Show',
    userLoggedIn.validateGatedCommerce,
    cache.applyShortPromotionSensitiveCache,
    consentTracking.consent,
    function (req, res, next) {
        const searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
        const overlayHelper = require('*/cartridge/scripts/overlayHelper');
        const category = req.querystring.cgid ? CatalogMgr.getCategory(req.querystring.cgid) : null;
        const storeId = req.querystring.storeId || null;
        let isPDPage = false;

        // custom - added breadcrumbs
        const breadcrumbs = [
            {
                htmlValue: Resource.msg('global.home', 'common', null),
                url: URLUtils.home().toString()
            }
        ];
        let template = 'search/searchResults';

        const result = searchHelper.search(req, res);
        // custom: add content search results
        const contentSearch = searchHelper.setupContentSearch(req.querystring);

        if (result.searchRedirect) {
            res.redirect(result.searchRedirect);
            return next();
        }

        if (result.category && result.categoryTemplate) {
            template = result.categoryTemplate;
        }

        // custom - build category breadcrumbs
        if (result.productSearch.isCategorySearch) {
            buildCategoryBreadcrumbs(breadcrumbs, result.productSearch.productSearch.category);
        }

        var redirectGridUrl = searchHelper.backButtonDetection(req.session.clickStream);
        if (redirectGridUrl) {
            res.redirect(redirectGridUrl);
        }

        // plugin_merge
        overlayHelper.appendPluginPreferences(res);


        var pdPage;
        if (category) {
            pdPage = PageMgr.getPageByCategory(category, true, 'plp');
            isPDPage = pdPage && pdPage.isVisible() && result.productSearch.category;
        }

        const data = {
            productSearch: result.productSearch,
            contentSearch: contentSearch,
            maxSlots: result.maxSlots,
            reportingURLs: result.reportingURLs,
            refineurl: result.refineurl,
            category: category,
            canonicalUrl: result.canonicalUrl,
            schemaData: result.schemaData,
            apiProductSearch: result.apiProductSearch,
            breadcrumbs: breadcrumbs,
            compareEnabled: getCategoryCompareStatus(result.productSearch),
            storeId: storeId
        };

        if (isPDPage && result.productSearch.isCategorySearch) {
            const aspectAttributes = new HashMap();
            aspectAttributes.put('category', category);

            res.print(PageMgr.renderPage(pdPage.ID, aspectAttributes, JSON.stringify(data)));
        } else {
            res.render(template, data);
        }

        return next();
    }, pageMetaData.computedPageMetaData);

server.append('Show', function (req, res, next) {
    if (require('*/cartridge/scripts/helpers/siteHelpers').getSitePreference('isShopByStoreEnabled')) {
        require('*/cartridge/scripts/helpers/shopByStoreHelpers').updateShopByStoreSearch(req, res);
    }
    next();
});

module.exports = server.exports();
