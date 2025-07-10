import React from "react";
import DefaultLayout from "../layouts/default.jsx";

export default function PageDesignerComponents() {
    return <DefaultLayout>Page Designer Components</DefaultLayout>;
}

export const ROUTES = [
    {
        path: "page-designer-components",
        element: <PageDesignerComponents />,
        handle: {
            crumb: "Page Designer Components",
        },
    },
];
