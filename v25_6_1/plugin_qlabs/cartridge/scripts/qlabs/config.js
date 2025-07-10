const URLUtils = require("dw/web/URLUtils");
const BM_OCAPI_CLIENT_ID = "6c957560-464f-4a98-ad0f-5e9662527e27";

function getQlabsConfig(isStorefront) {
    const orgPrefs = dw.system.System.getPreferences();
    const mixpanelToken = orgPrefs.getCustom()["qlabsMixpanelToken"];
    const sandbox = dw.system.System.instanceHostname.split(".")[0];
    const additionalScripts = orgPrefs.getCustom()["qlabsAdditionalScripts"];
    return {
        infoUrl: URLUtils.url(
            dw.web.URLAction("QLabs-Info", "Sites-Site"),
        ).toString(),
        userVerificationUrl: isStorefront
            ? URLUtils.url("QLabsStorefront-UserVerification").toString()
            : URLUtils.url(
                  dw.web.URLAction("QLabs-UserVerification", "Sites-Site"),
              ).toString(),
        agentApiEndpoint: isStorefront
            ? URLUtils.url("QLabsStorefront-AgentApiRequest").toString()
            : URLUtils.url(
                  dw.web.URLAction("QLabs-AgentApiRequest", "Sites-Site"),
              ).toString(),
        storefrontConfigurationUrl: URLUtils.url(
            "QLabsStorefront-Configuration",
        ).toString(),
        keepaliveUrl: URLUtils.url(
            dw.web.URLAction("QLabs-Keepalive", "Sites-Site"),
        ).toString(),
        companionUrl: URLUtils.staticURL("js/qlabs/companion.js").toString(),
        miawPrechatFieldsUrl: URLUtils.url("QLabsStorefront-GetMiawFields").toString(),
        mixpanelToken: mixpanelToken,
        sandbox: sandbox,
        additionalScripts: additionalScripts,
        siteId: dw.system.Site.current.ID,
        // TODO normalize config
        clientSettings: {
            clientId: BM_OCAPI_CLIENT_ID,
            agentApiEndpoint: isStorefront
                ? URLUtils.url("QLabsStorefront-AgentApiRequest").toString()
                : URLUtils.url(
                      dw.web.URLAction("QLabs-AgentApiRequest", "Sites-Site"),
                  ).toString(),
            userVerificationUrl: isStorefront
                ? URLUtils.url("QLabsStorefront-UserVerification").toString()
                : URLUtils.url(
                      dw.web.URLAction("QLabs-UserVerification", "Sites-Site"),
                  ).toString(),
            currentSite: dw.system.Site.current.ID,
            scapiShortCode:
                dw.system.System.getPreferences().getCustom().scapiShortCode,
            scapiOrgId:
                dw.system.System.getPreferences().getCustom().scapiOrgId,
        },
    };
}

module.exports = {
    getQlabsConfig: getQlabsConfig,
};
