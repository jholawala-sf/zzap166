import React from "react";
import DefaultLayout from "../layouts/default.jsx";
import { Card, Checkbox, Icon } from "@salesforce/design-system-react";

function ServiceWorker() {
    const [serviceWorkerEnabled, setServiceWorkerEnabled] =
        React.useState(false);
    const [qlabsConfig, setQlabsConfig] = React.useState(
        JSON.parse(
            window.localStorage.getItem("qlabs-companion-config") ?? "{}",
        ),
    );
    const [installCount, setInstallCount] = React.useState(0);

    const installServiceWorker = async () => {
        navigator.serviceWorker
            .register("/qlabs-service-worker.js")
            .then((registration) => {
                console.log("[QLABS] Service Worker registered successfully");
                registration.update();
                setInstallCount((prev) => prev + 1);
            })
            .catch((error) => {
                console.error(
                    "[QLABS] Service Worker registration failed:",
                    error,
                );
            });
    };

    React.useEffect(() => {
        async function queryServiceWorkers() {
            const regs = await navigator.serviceWorker?.getRegistrations();
            if (
                regs &&
                regs.find((r) =>
                    r.active?.scriptURL.includes("qlabs-service-worker.js"),
                )
            ) {
                setServiceWorkerEnabled(true);
            }
        }

        queryServiceWorkers();
    }, [installCount]);

    React.useEffect(() => {
        const config = JSON.parse(
            window.localStorage.getItem("qlabs-companion-config") ?? "{}",
        );
        setQlabsConfig(config);
    }, [serviceWorkerEnabled]);

    React.useEffect(() => {
        window.localStorage.setItem(
            "qlabs-companion-config",
            JSON.stringify(qlabsConfig),
        );
    }, [qlabsConfig]);

    return (
        <Card
            icon={<Icon category="standard" name="recipe" size="small" />}
            className="slds-card_boundary"
            heading="Service Worker"
        >
            <div className="slds-card__body slds-card__body_inner">
                <p>Install and configure the QLabs demo service worker</p>

                {serviceWorkerEnabled ? (
                    <p className="slds-text-color_success">
                        Service Worker is enabled
                    </p>
                ) : (
                    <>
                        <p className="slds-text-color_error">
                            Service Worker is not enabled
                        </p>
                        <button
                            className="slds-button slds-button_brand"
                            onClick={installServiceWorker}
                        >
                            Install Service Worker
                        </button>
                    </>
                )}

                {serviceWorkerEnabled && (
                    <>
                        <h2 className="slds-p-vertical--small slds-text-heading--small">
                            Settings
                        </h2>
                        <div className="slds-col_padded">
                            <Checkbox
                                labels={{
                                    label: "BM Keepalive",
                                }}
                                id="checkbox-toggle-example"
                                variant="toggle"
                                disabled={!serviceWorkerEnabled}
                                checked={qlabsConfig.enableBMKeepAlive}
                                onChange={(event) => {
                                    setQlabsConfig({
                                        ...qlabsConfig,
                                        enableBMKeepAlive: event.target.checked,
                                    });
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
}

/**
 * Tools Page
 * @return {JSX.Element}
 * @constructor
 */
function Tools() {
    return (
        <>
            <DefaultLayout>
                <div className="slds-col slds-size_6-of-12 slds-m-vertical_small">
                    <ServiceWorker />
                </div>
            </DefaultLayout>
        </>
    );
}

export const ROUTES = [
    {
        path: "tools",
        element: <Tools />,
        handle: {
            crumb: "Demo Tools",
        },
    },
];
