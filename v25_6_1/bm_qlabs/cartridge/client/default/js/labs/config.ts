import { OpenAIModel } from "./api/types";

export interface Locale {
    id: string;
    name: string;
}

interface ComposableConfiguration {
    managedRuntimeProject: string;
    managedRuntimeEnvironment: string;
    defaultSiteID: string;
}

interface ClientSettings {
    publicPath: string;
    staticAssets: string;
    dataStoreEndpoint: string;
    aiEndpoint: string;
    userVerificationUrl: string;
    mrtEndpoint: string;
    egptEndpoint: string;
    egptSystemEndpoint: string;
    componentInfoEndpoint: string;
    miscEndpoint: string;
    agentApiEndpoint: string;
    hostname: string;
    username: string;
    clientId: string;
    currentSite: string;
    siteIds: string[];
    currentLocale: string;
    isGenerativeAvailable: boolean;
    allowedSiteLocales: Locale[];
    appSettingsOverride?: any;
    composableConfiguration?: ComposableConfiguration;
    storefrontConfigurationUrl?: string;
    scapiShortCode?: string;
    scapiOrgId?: string;
}

declare global {
    interface Window {
        _clientSettings: ClientSettings;
    }
}

/**
 * Client settings are injected into the page by the server and represent server known values
 * (urls, etc)
 */
export const CONFIG: ClientSettings = {
    publicPath: window._clientSettings.publicPath,
    staticAssets: window._clientSettings.staticAssets,
    dataStoreEndpoint: window._clientSettings.dataStoreEndpoint,
    mrtEndpoint: window._clientSettings.mrtEndpoint,
    aiEndpoint: window._clientSettings.aiEndpoint,
    userVerificationUrl: window._clientSettings.userVerificationUrl,
    egptEndpoint: window._clientSettings.egptEndpoint,
    egptSystemEndpoint: window._clientSettings.egptSystemEndpoint,
    componentInfoEndpoint: window._clientSettings.componentInfoEndpoint,
    miscEndpoint: window._clientSettings.miscEndpoint,
    agentApiEndpoint: window._clientSettings.agentApiEndpoint,
    clientId: window._clientSettings.clientId,
    username: window._clientSettings.username,
    hostname: new URL(document.baseURI).hostname,
    currentLocale: window._clientSettings.currentLocale,
    allowedSiteLocales: window._clientSettings.allowedSiteLocales,
    isGenerativeAvailable: window._clientSettings.isGenerativeAvailable,
    currentSite: window._clientSettings.currentSite,
    siteIds: window._clientSettings.siteIds,
    appSettingsOverride: window._clientSettings.appSettingsOverride,
    composableConfiguration: window._clientSettings.composableConfiguration,
    scapiShortCode: window._clientSettings.scapiShortCode,
    scapiOrgId: window._clientSettings.scapiOrgId,
};

// App settings are defined here and representing frontend configuration and toggles
// it can be overridden with the _APP_SETTINGS_OVERRIDE variable
export const APP_SETTINGS = {
    OCAPI_VERSION: "v23_2",
    ENABLE_PAGE_DESIGNER_COMPONENTS: false,
    ENABLE_EXPERIENCE_CREATOR: true,
    ENABLE_CODE_EDITOR: false,
    ENABLE_CATALOG_MANAGER: true,
    ENABLE_CODE_DEVELOPMENT: true,
    ENABLE_REACT_QUERY_DEVTOOLS: false,
    USE_EGPT: true,
    ALLOW_EDIT_BUILT_IN_PROMPTS: false,

    // MODEL COSTS c per 1k tokens
    MODEL_COSTS: {
        [OpenAIModel.GPT_3_5_TURBO]: {
            prompt: 0.0015,
            completion: 0.002,
        },
        [OpenAIModel.GPT_3_5_TURBO_16K]: {
            prompt: 0.003,
            completion: 0.004,
        },
        [OpenAIModel.GPT_4]: {
            prompt: 0.03,
            completion: 0.06,
        },
        [OpenAIModel.GPT_4_32K]: {
            prompt: 0.06,
            completion: 0.12,
        },
    },
    ...CONFIG.appSettingsOverride,
};
