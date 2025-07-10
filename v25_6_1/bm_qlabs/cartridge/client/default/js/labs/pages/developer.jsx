import React from "react";
import DefaultLayout from "../layouts/default.jsx";
import {
    Card,
    Icon,
    Radio,
    RadioButtonGroup,
} from "@salesforce/design-system-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    generatePostmanEnvironment,
    SHELL_SCRIPTS,
    useDeveloperConfig,
} from "../services/developer";
import { CONFIG } from "../config";
import { getCodeVersions } from "../api/ocapi";
import { api as ocapi } from "../api/ocapi";
import CodeMirror from "@uiw/react-codemirror";

function useSites() {
    return useQuery({
        queryKey: ["sites"],
        queryFn: async () => {
            const response = await ocapi.get("sites");
            return response.data.data.map((site) => site.id);
        },
    });
}

function PostmanExport() {
    const [site, setSite] = React.useState("NTOManaged");
    const { data: sites, loading } = useSites();
    const { data: featureConfig, isSuccess } = useDeveloperConfig(site);

    const handleDownload = async () => {
        try {
            const data = await generatePostmanEnvironment(site, featureConfig);
            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `${data.name}-environment.json`;
            link.click();
        } catch (error) {
            // handle error
            console.error(error);
        }
    };

    return (
        <div className="slds-m-vertical--medium">
            <label className="slds-form-element__label" htmlFor="select-01">
                Select a site
            </label>
            <div className="slds-form-element__control">
                <div className="slds-select_container">
                    <select
                        className="slds-select"
                        id="select-01"
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                    >
                        {sites?.map((_site) => (
                            <option value={_site} key={_site}>
                                {_site}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <button
                className="slds-button slds-button_brand"
                onClick={handleDownload}
                disabled={!isSuccess || loading}
            >
                {!isSuccess || loading
                    ? "Generating..."
                    : "Download Environment"}
            </button>
        </div>
    );
}

async function generateDWJson() {
    // TODO this should be in a separate file
    const codeVersion = (await getCodeVersions()).find((cv) => cv.active);
    // FYI currently a hidden user cannot use this endpoint
    // Support/PM Roles can use a local user as a workaround
    const login = CONFIG.username;

    var accessKeyResp;
    try {
        accessKeyResp = await ocapi.put(
            `users/${login}/access_key/WEBDAV_AND_STUDIO`,
        );
    } catch (error) {
        if (error.response.status === 404) {
            // this is usually due to a support role, which we cannot manage here
            throw new Error(error.response.data.fault.message);
        }
        throw error;
    }

    // TODO centralize this logic as this is non-DRY
    var tenant = document.location.hostname.split(".")[0];
    return {
        name: tenant,
        hostname: document.location.hostname,
        username: login,
        password: accessKeyResp.data.access_key,
        "code-version": codeVersion.id,
    };
}

function DWJsonExport() {
    const mutation = useMutation(generateDWJson);

    const handleDownload = async () => {
        try {
            // confirm
            if (
                !window.confirm(
                    "This will generate a new access key overwriting any you previously have. Are you sure?",
                )
            ) {
                return;
            }
            const data = await mutation.mutateAsync();
            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
            });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = `dw.json`;
            link.click();
        } catch (error) {
            // handle error
            console.error(error);
        }
    };

    return (
        <>
            {mutation.isError && (
                <div className="slds-notify slds-notify_toast slds-theme_error">
                    <span className="slds-assistive-text">error</span>
                    <Icon
                        category="utility"
                        name="error"
                        size="small"
                        className="slds-m-right_small"
                    />
                    <h2>{mutation.error.message}</h2>
                </div>
            )}
            <div className="slds-m-vertical--medium">
                <button
                    className="slds-button slds-button_brand"
                    onClick={handleDownload}
                    disabled={mutation.isLoading}
                >
                    {mutation.isLoading
                        ? "Generating..."
                        : "Download dw.json File"}
                </button>
            </div>
        </>
    );
}

export default function DeveloperSetup() {
    const [scriptType, setScriptType] = React.useState(null);
    const { data: sites, loading } = useSites();
    const [site, setSite] = React.useState("NTOManaged");
    const { data: featureConfig, isSuccess } = useDeveloperConfig(site);
    return (
        <DefaultLayout>
            <div className="slds-grid slds-gutters slds-wrap">
                <div className="slds-col slds-size_6-of-12 slds-m-vertical_small">
                    <Card className="slds-card_boundary" heading="dw.json">
                        <div className="slds-card__body slds-card__body_inner">
                            <p>
                                Use this to generate a <code>dw.json</code> file
                                for use in code editors.
                            </p>
                            <DWJsonExport />
                        </div>
                    </Card>
                </div>
                <div className="slds-col slds-size_6-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        heading="Postman Setup"
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            <p>
                                Use this to generate a Postman Environment file
                                configured for this instance. Please deploy the
                                composable toolkit first.
                            </p>
                            <p>
                                This environment is compatible with the
                                following postman collections:
                            </p>
                            <ul>
                                <li>
                                    <a
                                        href={
                                            "https://github.com/SalesforceCommerceCloud/ocapi-for-sfcc"
                                        }
                                    >
                                        ocapi-for-sfcc
                                    </a>
                                </li>
                            </ul>
                            <PostmanExport />
                        </div>
                    </Card>
                </div>
                <div className="slds-col slds-size_12-of-12 slds-m-vertical_small">
                    <Card
                        className="slds-card_boundary"
                        heading="Shell Scripts"
                    >
                        <div className="slds-card__body slds-card__body_inner">
                            <div className="slds-m-vertical--medium">
                                <label
                                    className="slds-form-element__label"
                                    htmlFor="select-01"
                                >
                                    Select a site
                                </label>
                                <div className="slds-form-element__control">
                                    <div className="slds-select_container">
                                        <select
                                            className="slds-select"
                                            id="select-01"
                                            value={site}
                                            onChange={(e) =>
                                                setSite(e.target.value)
                                            }
                                        >
                                            {sites?.map((_site) => (
                                                <option
                                                    value={_site}
                                                    key={_site}
                                                >
                                                    {_site}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <RadioButtonGroup
                                labels={{ label: "Script Type" }}
                                onChange={(event) =>
                                    setScriptType(event.target.value)
                                }
                                disabled={loading || !isSuccess}
                                required={false}
                                name={"scriptType"}
                            >
                                <Radio
                                    key={"public"}
                                    id={"public"}
                                    labels={{ label: "Public Client" }}
                                    value={"public"}
                                    checked={scriptType === "public"}
                                    variant="button-group"
                                />
                                <Radio
                                    key={"private"}
                                    id={"private"}
                                    labels={{ label: "Private Client" }}
                                    value={"private"}
                                    checked={scriptType === "private"}
                                    variant="button-group"
                                />
                                <Radio
                                    key={"admin"}
                                    id={"admin"}
                                    labels={{ label: "Admin Client" }}
                                    value={"admin"}
                                    checked={scriptType === "admin"}
                                    variant="button-group"
                                />
                            </RadioButtonGroup>
                            <div>
                                <CodeMirror
                                    placeholder="Shell script will appear here"
                                    rows={40}
                                    cols={80}
                                    readOnly={true}
                                    value={
                                        SHELL_SCRIPTS[scriptType]
                                            ? SHELL_SCRIPTS[scriptType](
                                                  site,
                                                  featureConfig,
                                              )
                                            : ""
                                    }
                                ></CodeMirror>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DefaultLayout>
    );
}

export const ROUTES = [
    {
        path: "developer",
        element: <DeveloperSetup />,
        handle: {
            crumb: "Developer Setup",
        },
    },
];
