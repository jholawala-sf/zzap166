import { get, set } from "idb-keyval";

interface WorkerConfig {
    keepaliveUrl: string;
    companionUrl: string;
    clientSettings: any;
}

declare var CONFIG: WorkerConfig;
declare const self: ServiceWorkerGlobalScope;

async function installServiceWorker(config: WorkerConfig) {
    console.log("[QLABS] Service Worker installed");
}

self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    // business manager intercept jquery to load the companion plugin
    if (url.pathname.includes("jscript/jquery.min.js")) {
        event.respondWith(
            fetch(event.request).then((response) => {
                // Clone the response to avoid consuming it
                const clonedResponse = response.clone();

                return clonedResponse.blob().then((blob) => {
                    // Convert blob to text
                    return blob.text().then((originalText) => {
                        // Add preamble to the beginning of the file
                        const preamble = `
// load qlabs support script
window.__qlabsConfig = ${JSON.stringify(CONFIG)};
window._clientSettings = ${JSON.stringify(CONFIG.clientSettings)};
var script = document.createElement('script');
script.type = 'module';
script.src = '${CONFIG.companionUrl}';
document.head.appendChild(script);
                            `;
                        const modifiedText = preamble + originalText;

                        // Create a new response with the modified content
                        const modifiedResponse = new Response(modifiedText, {
                            status: response.status,
                            statusText: response.statusText,
                            headers: response.headers,
                        });

                        return modifiedResponse;
                    });
                });
            }),
        );
    }

    // if url is to https://api-js.mixpanel.com/track/ then change the data if we're in business manager
    // and the request is mangled by the BM javascript
    if (url.hostname === "api-js.mixpanel.com") {
        event.respondWith(
            (async function () {
                // Clone the request
                const originalRequest = event.request.clone();

                try {
                    // Read the original body
                    const originalBody = await originalRequest.formData();
                    const data = originalBody.get("data") as string;

                    // if data starts with a double quote it is double encoded and will
                    // fail with a mixpanel error
                    if (data.startsWith('"')) {
                        // double un-encode to get the original JSON
                        const eventData = JSON.parse(JSON.parse(data));
                        const newFormData =
                            "data=" +
                            encodeURIComponent(JSON.stringify(eventData));
                        const newRequest = new Request(originalRequest.url, {
                            method: originalRequest.method,
                            headers: originalRequest.headers,
                            body: newFormData,
                            mode: originalRequest.mode,
                            credentials: originalRequest.credentials,
                            cache: originalRequest.cache,
                            redirect: originalRequest.redirect,
                            referrer: originalRequest.referrer,
                            integrity: originalRequest.integrity,
                        });

                        // Forward the new request
                        return fetch(newRequest);
                    } else {
                        return fetch(event.request);
                    }
                } catch (error) {
                    console.error("Error modifying request:", error);
                    return fetch(event.request);
                }
            })(),
        );
    }
});

async function activateServiceWorker(config: WorkerConfig) {
    console.log("[QLABS] Service Worker Activated");
}

self.addEventListener("install", (event: ExtendableEvent) => {
    event.waitUntil(installServiceWorker(CONFIG));
    event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event: ExtendableEvent) => {
    event.waitUntil(activateServiceWorker(CONFIG));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    event.waitUntil(clients.claim());
});

// simple key value config exchange
self.addEventListener("message", async (ev) => {
    const command = ev.data?.command;

    switch (command) {
        case "SET_CONFIG":
            const configKey = ev.data?.configKey;
            const configVal = ev.data?.configVal;
            await set(configKey, configVal);
            await activateServiceWorker(CONFIG);
            break;
        case "PING":
            console.log("[QLABS] PING");
            break;
        default:
            console.error(`[QLABS] invalid command ${command}`);
    }
});
