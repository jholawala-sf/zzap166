
var System = require('dw/system/System');
var URLUtils = require('dw/web/URLUtils');
var PriceBookMgr = require('dw/catalog/PriceBookMgr');
var PromotionMgr = require('dw/campaign/PromotionMgr');
var MessageDigest = require('dw/crypto/WeakMessageDigest');

exports.get = function (httpParams) {
    var result = {};
    var cacheTimeStamp = 'v1';
    var array = [];
    var cacheString = '';
    var i;

    // #################
    //
    // We build our own context sensitive cache here, as page caching is disabled in a lot of cases on dev and staging instances
    //
    // #################

    // Just there to catch if PriceBookMgr.setApplicablePriceBooks() is used to set things explicitely in the session
    // the regular price engine cannot be catched through this, but it also shouldn't matter that much, as things are just cached locally
    // for a user + a general site pricebook change would probably go in line with a cache invalidation.
    var applicablePricebooks = PriceBookMgr.getApplicablePriceBooks().toArray();
    for (i = 0; i < applicablePricebooks.length; i++) {
        array.push(applicablePricebooks[i].getID());
    }
    // We at least add the session currency for multi currency cases
    array.push(session.currency); // eslint-disable-line no-undef

    // Catching dynamic triggers, used for promotional pricing and promotional content
    //
    // a) Customer Groups (normally not part of the things being considered by price-promotion)
    var customerGroups = customer.getCustomerGroups().toArray(); // eslint-disable-line no-undef
    for (i = 0; i < customerGroups.length; i++) { // eslint-disable-line block-scoped-var
        array.push(customerGroups[i].getID());
    }

    // b) Source Codes
    var scode = !empty(session.getSourceCodeInfo()) ? session.getSourceCodeInfo().code : 'nosourcecode'; // eslint-disable-line no-undef
    array.push(scode);

    // c) Coupons, Promotions, ...
    var promos = PromotionMgr.getActiveCustomerPromotions().promotions.toArray();
    for (i = 0; i < promos.length; i++) {
        array.push(promos[i].getID());
    }
    var simulateProd = httpParams.simulateprod ? httpParams.simulateprod.pop() : '';
    if (System.getInstanceType() !== System.PRODUCTION_SYSTEM && simulateProd !== 'true') {
        // on staging and sandboxes we force a short running cache
        // by nulling the last 6 digits we refresh every 16 minutes
        cacheTimeStamp = Date.now().toString().slice(0, -6) + '000000';
    } else {
        // Special handling to catch a static cache invalidation as mechanism.
        //
        // This makes us independent from the page cache configuration on a the instance.
        // We do our own things and the static invalidation is our key action
        //
        // We create a static asset url and parse the version timestamp from the URL
        // example: ../-/en_GB/v1544220359647/partialcache.js
        var url = URLUtils.staticURL('/js/doesntexist.js').toString();
        cacheTimeStamp = url.substring(url.indexOf(request.locale) + 6, url.lastIndexOf('/'));
    }
    array.push(cacheTimeStamp);

    // Final array string including our context information to build the hash from
    cacheString = array.join();

    // Prepare the json response to be sent back
    result.hash = new MessageDigest(MessageDigest.DIGEST_MD5).digest(cacheString);
    if (System.getInstanceType() !== System.PRODUCTION_SYSTEM) {
        result.cacheInfo = cacheString;
    }
    return result;
};
