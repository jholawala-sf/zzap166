import mixpanel from "mixpanel-browser";
import { searchObjects } from "@qlabs/api/data";
import type { Agent } from "@qlabs/state/agents";
import { renderAgent } from "./components/miaw";
import { renderCustomAgent, renderFeature } from "./components/deployments.tsx";
import { miawHandlers } from "./miaw";
import { doMigrateInstance } from "./migrations";
import { applyNewBMUIPatches } from "./patches/new-bm-ui";
import { isBM } from "./utils.ts";
import React from "react";
import { createRoot } from "react-dom/client";
import { DevTools } from "./components/devtools";
import { initializeEventManager } from "./hooks/event-manager";

import "./main.css";
import type { Feature } from "@qlabs/state/features.ts";

interface Config {
    infoUrl: string;
    keepaliveUrl: string;
    companionUrl: string;
    mixpanelToken: string;
    sandbox: string;
    additionalScripts?: string;
    storefrontConfigurationUrl?: string;
    userVerificationUrl?: string;
}

interface CompanionSettings {
    enableBMKeepAlive?: boolean;
    disableAnalytics?: boolean;
}

interface RuntimeInfo {
    username: string;
    siteId: string;
}

declare global {
    interface Window {
        __qlabsConfig: Config;
    }
}
export {};

console.log("[QLABS] Companion Script Loaded");

const INTERVAL = 30000;

// Function to fetch data from the URL
async function keepalive(keepaliveUrl: string) {
    try {
        const response = await fetch(keepaliveUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
        });
        console.log("[QLABS] BM KeepAlive");
    } catch (error) {
        console.error(
            "[QLABS] Error with BM keep alive; are you logged into business manager?",
            error,
        );
    }
}

var keepAliveInterval;

function getCompanionConfig(): CompanionSettings {
    const config = JSON.parse(
        window.localStorage.getItem("qlabs-companion-config") ?? "{}",
    );
    return config;
}

// Set up the interval to fetch data
function setupKeepAliveInterval() {
    const config = getCompanionConfig();
    if (window?.__qlabsConfig?.keepaliveUrl && config.enableBMKeepAlive) {
        keepAliveInterval = setInterval(
            () => keepalive(window.__qlabsConfig.keepaliveUrl),
            INTERVAL,
        );
    } else {
        console.log("[QLABS] BM KeepAlive Disabled");
    }
}

var runtimeInfo: RuntimeInfo;
var runtimeInfoPromise: Promise<RuntimeInfo>;
async function getRuntimeInfo() {
    if (runtimeInfo) {
        return runtimeInfo;
    }
    if (!runtimeInfoPromise) {
        runtimeInfoPromise = fetch(window.__qlabsConfig.infoUrl).then(
            (response) => response.json(),
        );
    }

    runtimeInfo = await runtimeInfoPromise;
    return runtimeInfo;
}

async function setupAnalyticsTracking() {
    const config = getCompanionConfig();

    if (config.disableAnalytics) {
        return;
    }

    var info: RuntimeInfo = {
        username: "storefront",
        siteId: "",
    };

    try {
        info = await getRuntimeInfo();
    } catch (error) {
        // not logged into BM
    }

    mixpanel.init(window.__qlabsConfig.mixpanelToken);

    // for a url path like /on/demandware.store/Sites-Site/default/ViewBM-Home
    // the controller with be ViewBM-Home; extract the controller name
    // if the pattern matches /on/demandware.store/Sites-
    const controller = window.location.pathname.match(
        /\/on\/demandware.store\/Sites-[^\/]*\/.+\/([^\/]*)/,
    );
    if (controller) {
        // add controller to body element
        document.body.setAttribute("data-controller", controller[1]);
        mixpanel.register({ controller: controller[1], context: "bm" });
    } else {
        // get from SFRA (should we just make this a config?)
        mixpanel.register({
            context: "storefront",
            controller:
                document
                    .querySelector("[data-action]")
                    ?.getAttribute("data-action") ?? "unknown",
        });
    }

    if (info.username) {
        mixpanel.identify(info.username);
    }
    mixpanel.register({
        sandbox: window.__qlabsConfig.sandbox,
    });
    mixpanel.track_pageview(
        { source: "companion" },
        { event_name: "B2CE Page View" },
    );
}

/**
 * Apply fixes to BM
 */
async function setupPatches() {
    await applyNewBMUIPatches();
}

async function addAdditionalScripts() {
    // check if we are loaded in business manager (Sites-Site is in the url)
    if (!isBM()) {
        return;
    }

    const additionalScripts = window.__qlabsConfig.additionalScripts;
    const info = await getRuntimeInfo();
    console.log("[QLABS] Site ID:", info.siteId);

    if (additionalScripts) {
        const div = document.createElement("div");
        div.innerHTML = additionalScripts;

        // ensure script tags are executed
        div.querySelectorAll("script").forEach((script) => {
            const newScript = document.createElement("script");
            if (
                script.src.includes("initEmbeddedMessaging") ||
                script.innerHTML.includes("initEmbeddedMessaging")
            ) {
                miawHandlers(info.siteId);
            }
            newScript.text = script.innerHTML;
            if (script.src) {
                newScript.src = script.src;
            }
            if (script.onload) {
                newScript.onload = script.onload;
            }
            document.body.appendChild(newScript);
        });
    }
}

async function setupMIAWDeploymentsBM() {
    if (!isBM()) {
        return;
    }

    const resp = await searchObjects<Agent>("agents", {
        attrs: {
            type: "MIAW",
            deployBM: true,
        },
    });

    const info = await getRuntimeInfo();
    if (resp.data && resp.data.length > 0) {
        // TODO multiple deployments of MIAW type?
        const agentObj = resp.data[0];
        const agent = agentObj?.data;

        if (agent) {
            // render the deploy with react dom
            renderAgent(agent, info.siteId);
        }
    }
}

async function setupMIAWDeploymentsStorefront() {
    if (isBM()) {
        return;
    }

    const resp = await fetch(window.__qlabsConfig.storefrontConfigurationUrl);
    const data = await resp.json();

    const miawTypeAgents = data.agents.filter(
        (agent: Agent) => agent.type === "MIAW",
    );
    const siteId = data.siteId;
    if (miawTypeAgents.length > 0) {
        // only 1 MIAW agent can be rendered
        const agent = miawTypeAgents[0];
        renderAgent(agent, siteId);
    }

    const miawCustomTypeAgents = data.agents.filter(
        (agent: Agent) =>
            agent.type === "MIAW_CUSTOM" || agent.type === "AGENT_API",
    );
    if (miawCustomTypeAgents.length > 0) {
        for (const agent of miawCustomTypeAgents) {
            renderCustomAgent(agent);
        }
    }
}

async function setupFeatures() {
    if (isBM()) {
        const resp = await searchObjects<Feature>("features", {
            attrs: {
                deployBM: true,
            },
        });

        if (resp.data && resp.data.length > 0) {
            for (const featureObj of resp.data) {
                const feature = featureObj?.data;

                if (feature) {
                    // render the deploy with react dom
                    renderFeature(feature);
                }
            }
        }
    } else {
        const resp = await fetch(
            window.__qlabsConfig.storefrontConfigurationUrl,
        );
        const data = await resp.json();

        const features = data.features;
        if (features.length > 0) {
            for (const feature of features) {
                renderFeature(feature);
            }
        }
    }
}

function setupDevTools() {
    const container = document.createElement("div");
    container.id = "qlabs-companion-devtools";
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(React.createElement(DevTools, null));
}

// @ts-ignore
window._clientSettings = window._clientSettings || {};

initializeEventManager();
setupAnalyticsTracking();
setupKeepAliveInterval();
setupPatches();
doMigrateInstance();
addAdditionalScripts();
setupMIAWDeploymentsBM();
setupMIAWDeploymentsStorefront();
setupDevTools();
setupFeatures();
