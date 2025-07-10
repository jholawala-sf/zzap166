// eslint-disable-next-line no-undef
__webpack_public_path__ = window._config.publicPath; // ensure this is run early

import { CONFIG } from "./config";
import { App } from "./app";
import { createRoot } from "react-dom/client";
import React from "react";

async function keepAlive() {
    const response = await fetch(CONFIG.keepaliveUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        includeCredentials: true,
    });
    const data = await response.json();
    console.log("keepalive", data);
    return data;
}

if (CONFIG.keepalive) {
    console.log("Starting business manager keepalive");
    setInterval(keepAlive, 1000 * 60 * 1);
}

const container = document.getElementById("demo-react-container");
const root = createRoot(container);
root.render(<App />);
