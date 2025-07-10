import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Outlet } from "react-router-dom";
import {
    ButtonGroup,
    Dropdown,
    IconSettings,
    PageHeader,
    PageHeaderControl,
} from "@salesforce/design-system-react";

import actionSprite from "@salesforce-ux/design-system/assets/icons/action-sprite/svg/symbols.svg";
import utilitySprite from "@salesforce-ux/design-system/assets/icons/utility-sprite/svg/symbols.svg";
import standardSprite from "@salesforce-ux/design-system/assets/icons/standard-sprite/svg/symbols.svg";
import doctypeSprite from "@salesforce-ux/design-system/assets/icons/doctype-sprite/svg/symbols.svg";
import customSprite from "@salesforce-ux/design-system/assets/icons/custom-sprite/svg/symbols.svg";

import "@salesforce-ux/design-system/assets/styles/salesforce-lightning-design-system.css";

import { APP_SETTINGS } from "./config";
import { useMatches } from "react-router-dom";

import QLogo from "./assets/q_small.png";
import { useLocales } from "./state/locale";
import { useCurrentLocale, useGlobalState } from "./state/global";

function QLabsPageHeader() {
    const { data: locales } = useLocales();
    const localeOptions = locales?.map((locale) => ({
        label: `${locale.display_name} (${locale.id})`,
        value: locale.id,
    }));
    const currentLocale = useCurrentLocale();
    const setCurrentLocale = useGlobalState((state) => state.setCurrentLocale);
    const actions = () => (
        <PageHeaderControl>
            <ButtonGroup className="slds-align-middle" variant="list">
                <Dropdown
                    align="right"
                    iconCategory="utility"
                    iconName="down"
                    label={`Locale: ${currentLocale}`}
                    iconPosition="right"
                    checkmark={true}
                    options={localeOptions}
                    value={currentLocale}
                    onSelect={({ value }) => {
                        console.log(value);
                        setCurrentLocale(value);
                    }}
                />
            </ButtonGroup>
        </PageHeaderControl>
    );

    let matches = useMatches();
    const currentMatch = matches[matches.length - 1];
    const currentTitle =
        typeof currentMatch?.handle?.crumb === "function"
            ? currentMatch.handle.crumb(currentMatch.data)
            : currentMatch?.handle?.crumb;

    const breadcrumbs = matches
        .slice(0, matches.length - 1)
        .map((match, index) => {
            const title =
                typeof match?.handle?.crumb === "function"
                    ? match.handle.crumb(match.data)
                    : match?.handle?.crumb;
            return (
                <Link key={index} to={match.pathname}>
                    {title || ""}
                </Link>
            );
        });

    return (
        <PageHeader
            className="slds-m-bottom_medium"
            icon={<img src={QLogo} />}
            title={currentTitle || "Home"}
            trail={breadcrumbs}
            truncate
            variant="object-home"
            onRenderActions={actions}
        />
    );
}

export default function AppLayout() {
    // assume it's enabled until we check
    const [serviceWorkerEnabled, setServiceWorkerEnabled] =
        React.useState(true);
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
            } else {
                setServiceWorkerEnabled(false);
            }
        }

        queryServiceWorkers();
    }, [installCount]);

    React.useEffect(() => {
        if (!serviceWorkerEnabled) {
            installServiceWorker();
        }
    }, [serviceWorkerEnabled]);

    return (
        <IconSettings
            actionSprite={actionSprite}
            utilitySprite={utilitySprite}
            standardSprite={standardSprite}
            doctypeSprite={doctypeSprite}
            customSprite={customSprite}
        >
            <QLabsPageHeader />
            <Outlet />
            {APP_SETTINGS.ENABLE_REACT_QUERY_DEVTOOLS && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </IconSettings>
    );
}

export function FullPageLayout() {
    return (
        <IconSettings
            actionSprite={actionSprite}
            utilitySprite={utilitySprite}
            standardSprite={standardSprite}
            doctypeSprite={doctypeSprite}
            customSprite={customSprite}
        >
            <Outlet />
            {APP_SETTINGS.ENABLE_REACT_QUERY_DEVTOOLS && (
                <ReactQueryDevtools initialIsOpen={false} />
            )}
        </IconSettings>
    );
}
