'use strict';

/**
 * @namespace Default
 */

var server = require('server');
var URLUtils = require('dw/web/URLUtils');


server.extend(module.superModule);

/** when sitepath is defined in the site aliases from business manager, homepage will be rendered directly */
/**
 * Default-Start : This end point is the root of the site, when opening from the BM this is the end point executed
 * @name Base/Default-Start
 * @function
 * @memberof Default
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.replace('Start', function (req, res, next) {
    res.redirect(URLUtils.url('Home-Show'));
    next();
});

module.exports = server.exports();
