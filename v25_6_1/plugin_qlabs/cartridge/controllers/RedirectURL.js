"use strict";

const server = require("server");
server.extend(module.superModule);

/**
 * Intercept service worker urls at the root / URL
 */
server.prepend("Start", function (req, res, next) {
    var URLRedirectMgr = require("dw/web/URLRedirectMgr");
    var URLUtils = require("dw/web/URLUtils");

    var origin = URLRedirectMgr.redirectOrigin

    const serviceWorkerConfig = require('*/cartridge/scripts/qlabs/config').getQlabsConfig();
    const serviceWorkerUrl = URLUtils.staticURL("/js/qlabs/service-worker.js");

    if (
        origin.indexOf("/qlabs-service-worker.js") === 0 &&
        dw.system.System.instanceType ===
        dw.system.System.DEVELOPMENT_SYSTEM
    ) {
        response.setContentType("application/javascript");
        response.writer.print(`
const CONFIG = ${JSON.stringify(serviceWorkerConfig, null, 2)};
importScripts('${serviceWorkerUrl}');
                `);
        // break controller chain here to avoid SFRA redirects
        // onComplete won't work as if a location is found with dynamic mappings
        // (i.e. the default catch all mapping from RefArch data) it shoots the redirect instead
        return;
    }
    next();
});

module.exports = server.exports();
