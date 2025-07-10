import "vite/modulepreload-polyfill";

import React from "react";
import Handlebars from "handlebars/dist/cjs/handlebars";
import { createRoot } from "react-dom/client";
import ErrorPage from "./error-page.jsx";
import AppLayout, { FullPageLayout } from "./app.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./query-client";

import { createHashRouter, RouterProvider } from "react-router-dom";
import { ROUTES as LANDING_ROUTES } from "./pages/landing.jsx";
import { ROUTES as PAGE_DESIGNER_COMPONENTS_ROUTES } from "./pages/page-designer-components.jsx";
import { ROUTES as DEVELOPER_ROUTES } from "./pages/developer.jsx";
import { ROUTES as ASSISTANT_ROUTES } from "./pages/assistant.jsx";
import { ROUTES as MANAGED_RUNTIME_ROUTES } from "./pages/managed-runtime.jsx";
import { ROUTES as CATALOG_MANAGER_ROUTES } from "./pages/catalog-manager.jsx";
import { ROUTES as TESTING_ROUTES } from "./pages/testing.jsx";
import { ROUTES as PROMPTS_ROUTES } from "./pages/prompts.jsx";
import { ROUTES as EXPERIENCE_ROUTES } from "./pages/experience.jsx";
import { ROUTES as TOOLS_ROUTES } from "./pages/tools.jsx";
import { ROUTES as AGENTS_ROUTES } from "./pages/agents";
import { ROUTES as FEATURES_ROUTES } from "./pages/features";
import { ROUTES as WIDGETS_ROUTES } from "./pages/widgets.tsx";

// import { settings } from "@salesforce/design-system-react";
// import createCache from "@emotion/cache";
// import { CacheProvider } from "@emotion/react";

const ROUTER = createHashRouter([
    {
        path: "/",
        handle: {
            crumb: "Q-Labs Home",
        },
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            ...LANDING_ROUTES,
            ...ASSISTANT_ROUTES,
            ...PROMPTS_ROUTES,
            ...CATALOG_MANAGER_ROUTES,
            ...MANAGED_RUNTIME_ROUTES,
            ...DEVELOPER_ROUTES,
            ...PAGE_DESIGNER_COMPONENTS_ROUTES,
            ...TESTING_ROUTES,
            ...TOOLS_ROUTES,
            ...AGENTS_ROUTES,
            ...WIDGETS_ROUTES,
            ...FEATURES_ROUTES,
        ],
    },
    // Full page routes
    {
        path: "/",
        handle: {
            crumb: "Q-Labs Home",
        },
        element: <FullPageLayout />,
        errorElement: <ErrorPage />,
        children: [...EXPERIENCE_ROUTES],
    },
]);

const Router = function () {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={ROUTER} />
        </QueryClientProvider>
    );
};

// Register helps for use in all handlebars templates
Handlebars.registerHelper("json", function (context) {
    return JSON.stringify(context, null, 4);
});

// Solution to render into a shadow DOM in case BM breaks SLDS (or something else) again
// Be sure to update index.isml and move the stylesheet into the shadow template

// const templateDom = document.getElementById("labs-template");
// const host = document.querySelector("#labs-container");
// const shadow = host.attachShadow({ mode: "open" });
// var clone = document.importNode(templateDom.content, true);
// shadow.appendChild(clone);
// const styleContainer = shadow;
// const emotionCache = createCache({
//     key: "labs",
//     container: styleContainer,
// });

// use labs-react-container if switching to shadow dom rendering
const container = document.getElementById("labs-container");
const root = createRoot(container);

root.render(<Router />);
