const ISML = require('dw/template/ISML')
const CONFIG = require("*/cartridge/config/qlabsConfig");

const orgPrefs = dw.system.System.getPreferences();

const DEMO_CONFIG = {
    keepalive: orgPrefs.custom.qlabsDemoKeepalive,
    keepaliveUrl: dw.web.URLUtils.https("Demo-Keepalive").toString(),
    publicPath: dw.web.URLUtils.httpsStatic("js/labs").toString(),
    mainPage: orgPrefs.custom.qlabsDemoMainPage,
    sidebarPage: orgPrefs.custom.qlabsDemoSidebarPage,
    idleTimeout: orgPrefs.custom.qlabsDemoTimeout,
}
function Start() {
    ISML.renderTemplate('demo/demo', {
        config: DEMO_CONFIG,
        clientSettings: CONFIG
    });
}
Start.public = true
module.exports.Start = Start

function Keepalive() {
    response.setContentType("application/json");
    response.getWriter().println(JSON.stringify({ status: "ok" }));
}
Keepalive.public = true;
module.exports.Keepalive = Keepalive;
