const getOpenAIService = require("*/cartridge/scripts/services/openai");

const BM_OCAPI_CLIENT_ID = "6c957560-464f-4a98-ad0f-5e9662527e27";

/**
 * determine if openAI key is available
 */
function isGenerativeAvailable() {
    var svc = getOpenAIService();
    try {
        return svc.getConfiguration().getCredential().password !== "";
    } catch (e) {
        return false;
    }
}

const CLIENT_SETTINGS = {
    // Emitted webpack output
    publicPath: dw.web.URLUtils.httpsStatic("js/labs").toString(),
    // Base for all static assets
    staticAssets: dw.web.URLUtils.httpsStatic("").toString(),

    dataStoreEndpoint: dw.web.URLUtils.https("QLabs-DataStore").toString(),

    aiEndpoint: dw.web.URLUtils.https("OpenAI-OpenAIRequest").toString(),
    userVerificationUrl: dw.web.URLUtils.https("QLabs-UserVerification").toString(),


    mrtEndpoint: dw.web.URLUtils.https("QLabs-MRTRequest").toString(),
    egptEndpoint: dw.web.URLUtils.https("QLabs-EGPTRequest").toString(),
    egptSystemEndpoint: dw.web.URLUtils.https("QLabs-EGPTSystemRequest").toString(),
    componentInfoEndpoint: dw.web.URLUtils.https("QLabs-ComponentInfo").toString(),

    miscEndpoint: dw.web.URLUtils.https("QLabs-Misc").toString(),
    agentApiEndpoint: dw.web.URLUtils.https("QLabs-AgentApiRequest").toString(),

    clientId: BM_OCAPI_CLIENT_ID,
    isGenerativeAvailable: isGenerativeAvailable(),
    appSettingsOverride:
        JSON.parse(
            dw.system.System.getPreferences().getCustom()
                .qlabsAppSettingsOverride
        ) || {},
    username: session.userName,
    currentLocale: request.locale || "default",
    siteAllowedLocales: dw.system.Site.getCurrent()
        .allowedLocales.toArray()
        .map((locale) => {
            const l = dw.util.Locale.getLocale(locale);
            return {
                id: l.ID || "default",
                name: l.displayName || "Default",
            };
        }) || [{ id: "default", name: "Default" }],
    currentSite:
        dw.system.Site.getCurrent().getID() === "Sites-Site"
            ? null
            : dw.system.Site.getCurrent().getID(),
    siteIds: dw.system.Site.getAllSites()
        .toArray()
        .map((site) => {
            return site.ID;
        }),
    devMode: dw.system.System.getPreferences().getCustom().qlabsDev,
    scapiShortCode: dw.system.System.getPreferences().getCustom().scapiShortCode,
    scapiOrgId: dw.system.System.getPreferences().getCustom().scapiOrgId
};

module.exports = CLIENT_SETTINGS;
