var PageMgr = require('dw/experience/PageMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var MAIN_ASPECT = 'landing';
var CacheMgr = require('dw/system/CacheMgr');

/**
 * Utility function to read the individual url components
 * @param {string} url url to be parsed
 * @returns {Object} parsed url components
 */
function parseUrl(url) {
    var urlHttpPath = '';
    var urlQueryString = '';

    if (url.indexOf('?') !== -1) {
        urlHttpPath = url.substring(0, url.indexOf('?'));
        urlQueryString = url.substring(url.indexOf('?') + 1);
    } else {
        urlHttpPath = url;
    }
    var urlAction = urlHttpPath.split('/').pop();
    // assuming we can ignore everything after the #
    urlQueryString = urlQueryString.split('#')[0];

    var HashMap = require('dw/util/HashMap');
    var urlParams = new HashMap();
    var params = urlQueryString.split('&');
    params.forEach(function (param) {
        if (param.split('=').length === 2) {
            // only add if we have a correct key/value pair
            // some broken strings appeared here which do have two "="

            var paramKey = param.split('=')[0];
            var paramVal = param.split('=')[1];

            urlParams.put(paramKey, paramVal);
        }
    });

    return {
        urlHttpPath: urlHttpPath,
        urlQueryString: urlQueryString,
        urlAction: urlAction,
        urlParams: urlParams
    };
}
/**
 * Executes for the given controller search request the equivalent ocapi search
 * @param {Object} parsedUrl parsed url components
 * @returns {dw.svc.Service} ocapi service response
 */
function ocapiSearchRequest(parsedUrl) {
    var Site = require('dw/system/Site');
    var currentSiteId = Site.getCurrent().getID();
    var ocapiService = require('*/cartridge/scripts/services/ocapi.js');

    var HashMap = require('dw/util/HashMap');
    var refinements = new HashMap();
    var priceMin = '0';
    var priceMax = '99999';

    // eslint-disable-next-line no-restricted-syntax
    for (var param in parsedUrl.urlParams) {
        if (Object.prototype.hasOwnProperty.call(parsedUrl.urlParams, param)) {
            if (param === 'cgid') {
                refinements.put(param, parsedUrl.urlParams.get(param));
            }
            if (param === 'pmin') {
                priceMin = parsedUrl.urlParams.get(param);
            }
            if (param === 'pmax') {
                priceMax = parsedUrl.urlParams.get(param);
            }
            if (param.indexOf('prefn') !== -1) {
                var prefKey = parsedUrl.urlParams.get(param);
                var prefValue;

                var valueKey = param.replace('prefn', 'prefv');

                if (parsedUrl.urlParams.get(valueKey)) {
                    prefValue = parsedUrl.urlParams.get(valueKey);
                }
                if (prefKey && prefValue) {
                    refinements.put(prefKey, prefValue);
                }
            }
        }
    }

    refinements.put('price', '(' + priceMin + '..' + priceMax + ')');

    var ocapiRequest = '/s/' + currentSiteId + '/dw/shop/v21_3/product_search';

    var index = 1;
    // eslint-disable-next-line no-restricted-syntax
    for (var ref in refinements) {
        if (Object.prototype.hasOwnProperty.call(refinements, ref)) {
            var refineParamString = 'refine_' + index + '=' + ref + '=' + refinements.get(ref);

            if (index === 1) {
                ocapiRequest += '?' + refineParamString;
            } else {
                ocapiRequest += '&' + refineParamString;
            }
            index += 1;
        }
    }

    var bearer = request.httpHeaders['x-is-authorization'];
    if (bearer) {
        // strip bearer keyword
        bearer = bearer.replace('Bearer ', '');
    }

    var ocapiSearch = ocapiService.getService().call({
        requestPath: ocapiRequest,
        requestMethod: 'GET',
        token: bearer
    });

    return {
        proxiedApi: 'product_search',
        ocapiRequest: ocapiRequest,
        ocapiResponse: JSON.parse(JSON.stringify(ocapiSearch.object))
    };
}

/**
 *  Maps the initial pipeline URL to business logic. For instance search or page designer overload per category
 *  @param {Object} parsedUrl the obhectified controller url
 *  @returns {Object} api type and further parameter
 */
function determineAction(parsedUrl) {
    var api;
    var params = {};
    if (parsedUrl.urlAction === 'Search-Show') {
        api = 'product_search';
        if (parsedUrl.urlParams.get('cgid')) {
            params.categoryId = parsedUrl.urlParams.get('cgid');
            var category = CatalogMgr.getCategory(params.categoryId);
            // @todo make aspect type configurable?
            var page = PageMgr.getPage(category, true, MAIN_ASPECT);
            // blocking page not required after 22.2 - forced inheritance will become an option then
            var blockingPage = PageMgr.getPage(category, true, 'plp');
            if (page && !blockingPage) {
                api = 'page_designer';
            }
        }
    }
    return { api: api, params: params };
}

/**
 * Executes for the given page designer OCAPI Response
 *
 * @param {string} parsedUrl the parsed URL
 * @param {string} categoryId the ID of hte category
 * @returns {Object} ocapi service response
 */
function pageDesignerRequest(parsedUrl, categoryId) {
    var bearer = request.httpHeaders['x-is-authorization'];
    var ocapiService = require('*/cartridge/scripts/services/ocapi.js');
    if (bearer) {
        // strip bearer keyword
        bearer = bearer.replace('Bearer ', '');
    } else {
        var guestCall = ocapiService.getService().call({ requestPath: 's/' + dw.system.Site.current.ID + '/dw/shop/v21_8/customers/auth', requestMethod: 'POST', body: '{"type":"guest"}' });
        bearer = guestCall.object.getResponseHeaders().authorization.replace('Bearer ', '');
    }

    var cache = CacheMgr.getCache('BearerToSession');
    var dwsid = cache.get(bearer, function () {
        // call /sessions ocapi / ocapi session bridge
        var sessionsResponse = ocapiService.getService().call({ requestPath: 's/' + dw.system.Site.current.ID + '/dw/shop/v21_8/sessions', requestMethod: 'POST', token: bearer });
        // get the set-cookie of the dwsid cookie
        var dwsidCookie = sessionsResponse.object.responseHeaders['set-cookie'].toArray().filter((cookie) => cookie.indexOf('dwsid') > -1).pop();
        // just get the cookie value
        return dwsidCookie.split(';')[0].replace('dwsid=', '');
    });

    var category = CatalogMgr.getCategory(categoryId);
    var pageResponse = null;
    var page = PageMgr.getPageByCategory(category, true, MAIN_ASPECT);
    if (page) {
        var controllerService = require('*/cartridge/scripts/services/controller.js');
        // call Page Designer serialization endpoint. see ../../controllers/PageDesigner.js for implementation
        var params = {};
        params.pageIds = page.ID;

        params.aspect = MAIN_ASPECT;
        params.category = category;

        var controllerResponse = controllerService.getService().call({ controller: 'PageDesigner-Serialize', params: params, dwsid: dwsid });
        pageResponse = controllerResponse.object.toArray();
    }
    return {
        proxiedApi: 'page_designer',
        context: {
            aspect: MAIN_ASPECT, pageId: page ? page.ID : null, categoryId: categoryId, apiType: 'SCAPI'
        },
        pages: pageResponse
    };
}

exports.get = function (httpParams) {
    var path = httpParams.path.pop();
    var parsedUrl = exports.processIncomingPath(path);
    var action = determineAction(parsedUrl);

    var ocapiResponse = null;

    switch (action.api) {
        case 'product_search':
            ocapiResponse = ocapiSearchRequest(parsedUrl);
            break;
        case 'page_designer':
            ocapiResponse = pageDesignerRequest(parsedUrl, action.params.categoryId);
            break;
        default:
            break;
    }

    return JSON.parse(JSON.stringify(ocapiResponse));
};

exports.processIncomingPath = function (path) {
    var queryString = '';
    var subPath = '';

    if (path.indexOf('?') !== -1) {
        subPath = path.substring(0, path.indexOf('?'));
        queryString = '&' + path.substring(path.indexOf('?') + 1);
    } else {
        subPath = path;
    }

    var Site = require('dw/system/Site');
    var currentSiteId = Site.getCurrent().getID();

    var base = 'https://' + request.httpHost + '/s/' + currentSiteId;
    queryString = '?requestResolver=true' + queryString;
    var url = base + subPath + queryString;

    // self call storefront endpoint to translate SEO friendly URL into system action url
    var freeurlService = require('*/cartridge/scripts/services/freeurl.js');
    var freeurlResponse = freeurlService.getService().call({ url: url });

    // get url from service response
    return parseUrl(freeurlResponse.object.url);
};
