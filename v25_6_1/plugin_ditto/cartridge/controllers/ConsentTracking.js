'use strict';

/**
 * @namespace ConsentTracking
 */

var server = require('server');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
server.extend(module.superModule);
/**
 * ConsentTracking-Check : This endpoint is called every time a storefront page is rendered
 * @name Base/ConsentTracking-Check
 * @function
 * @memberof ConsentTracking
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.replace('Check', consentTracking.consent, function (req, res, next) {
    var ContentMgr = require('dw/content/ContentMgr');
    var content = ContentMgr.getContent('tracking_hint');
    res.render('/common/consent', {
        consentApi: Object.prototype.hasOwnProperty.call(req.session.raw, 'setTrackingAllowed'),
        caOnline: content ? content.online : false
    });
    next();
});

server.append('SetSession', function (req, res, next) {
    res.setViewData({
        isTrackingAllowed: req.session.raw.isTrackingAllowed()
    });
    next();
});

module.exports = server.exports();
