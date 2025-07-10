'use strict';

const PageMgr = require('dw/experience/PageMgr');
const Site = require('dw/system/Site');

const cache = require('*/cartridge/scripts/middleware/cache');
const consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
const pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
const pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');
const server = require('server');

server.extend(module.superModule);

server.get('Test', function (req, res, next) {
    var Template = require('dw/util/Template');
    var HashMap = require('dw/util/HashMap');
    var template = new Template('home/test');
    var model = new HashMap();
    var result = template.render(model);

    var storeInventoryFilter = new dw.catalog.StoreInventoryFilter('city',
        new dw.util.ArrayList(new dw.catalog.StoreInventoryFilterValue('Portland', '0335-store')));

    var psm = new dw.catalog.ProductSearchModel();
    psm.setCategoryID('root');
    if (request.httpParameterMap.city.submitted) {
        psm.setStoreInventoryFilter(storeInventoryFilter);
    }
    psm.setSearchPhrase(request.httpParameterMap.q.stringValue);
    psm.search();
    res.json({
        'test': result.text,
        'results': psm.getCount()
    });
    next();
});

server.get('Test2', function (req, res, next) {
    res.render('home/test2');
    next();
});

server.replace(
    'Show',
    consentTracking.consent,
    cache.applyDefaultCache,
    function (req, res, next) {
        const params = {};
        let pageId;
        let page;

        // Retrieve the site-preferences for the current site
        const sitePreferences = Site.getCurrent()
            .getPreferences()
            .getCustom();

        if (sitePreferences.hasOwnProperty('DittoPDHomePageID')) {
            pageId = sitePreferences.DittoPDHomePageID;

            if (pageId) {
                page = PageMgr.getPage(pageId);
            }
        }

        pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
        res.viewData.action = 'Home-Show';
        if (page && page.isVisible()) {
            if (!page.hasVisibilityRules()) {
                res.cachePeriod = 168; // eslint-disable-line no-param-reassign
                res.cachePeriodUnit = 'hours'; // eslint-disable-line no-param-reassign
            }

            res.page(page.ID, params);
        } else {
            res.render('home/homePage');
        }

        next();
    },
    pageMetaData.computedPageMetaData
);

module.exports = server.exports();
