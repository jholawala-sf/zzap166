function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const request = indexedDB.open(dbName);
  request.onupgradeneeded = () => request.result.createObjectStore(storeName);
  const dbp = promisifyRequest(request);
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
async function installServiceWorker(config) {
  console.log("[QLABS] Service Worker installed");
}
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.includes("jscript/jquery.min.js")) {
    event.respondWith(fetch(event.request).then((response) => {
      const clonedResponse = response.clone();
      return clonedResponse.blob().then((blob) => {
        return blob.text().then((originalText) => {
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
          const modifiedResponse = new Response(modifiedText, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
          });
          return modifiedResponse;
        });
      });
    }));
  }
  if (url.hostname === "api-js.mixpanel.com") {
    event.respondWith(async function() {
      const originalRequest = event.request.clone();
      try {
        const originalBody = await originalRequest.formData();
        const data = originalBody.get("data");
        if (data.startsWith('"')) {
          const eventData = JSON.parse(JSON.parse(data));
          const newFormData = "data=" + encodeURIComponent(JSON.stringify(eventData));
          const newRequest = new Request(originalRequest.url, {
            method: originalRequest.method,
            headers: originalRequest.headers,
            body: newFormData,
            mode: originalRequest.mode,
            credentials: originalRequest.credentials,
            cache: originalRequest.cache,
            redirect: originalRequest.redirect,
            referrer: originalRequest.referrer,
            integrity: originalRequest.integrity
          });
          return fetch(newRequest);
        } else {
          return fetch(event.request);
        }
      } catch (error) {
        console.error("Error modifying request:", error);
        return fetch(event.request);
      }
    }());
  }
});
async function activateServiceWorker(config) {
  console.log("[QLABS] Service Worker Activated");
}
self.addEventListener("install", (event) => {
  event.waitUntil(installServiceWorker(CONFIG));
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", (event) => {
  event.waitUntil(activateServiceWorker(CONFIG));
  event.waitUntil(clients.claim());
});
self.addEventListener("message", async (ev) => {
  var _a, _b, _c;
  const command = (_a = ev.data) == null ? void 0 : _a.command;
  switch (command) {
    case "SET_CONFIG":
      const configKey = (_b = ev.data) == null ? void 0 : _b.configKey;
      const configVal = (_c = ev.data) == null ? void 0 : _c.configVal;
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
//# sourceMappingURL=service-worker.js.map
