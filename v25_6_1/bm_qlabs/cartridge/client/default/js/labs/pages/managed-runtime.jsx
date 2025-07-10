import React, { useEffect, useState } from "react";
import DefaultLayout from "../layouts/default.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { api as mrt } from "../api/mrt";
import { CONFIG } from "../config";
import { Global, css } from "@emotion/react";
import {
    Card,
    Icon,
    VerticalNavigation,
    Button,
    DataTableColumn,
    DataTable,
    DataTableRowActions,
    Dropdown,
} from "@salesforce/design-system-react";
import { Modal } from "../components/modal";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SingleSelectComboBox } from "../components/combobox.jsx";
import { SpinnerWithContainer } from "../components/spinner.jsx";
import queryClient from "../query-client";
import { useForm } from "react-hook-form";
import { TextAreaField } from "../components/forms";

async function getProjects() {
    const response = await mrt.get("?_method=GET&_endpoint=projects");
    return response.data.results;
}

async function getEnvironments(project) {
    const response = await mrt.get(
        `?_method=GET&_endpoint=projects/${project}/target`,
    );
    return response.data.results;
}

const pendingRow = css`
    .envvar-pending {
        background-color: #f9e3b6;
    }

    .envvar-remove {
        background-color: #fe7765;
    }
`;
/**
 * @typedef {Object} LogRecord
 * @property {string} level
 * @property {string} message
 * @property {string} [shortRequestId]
 */
const DATE_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;
/**
 * @return {LogRecord}
 */
const parseLog = (log) => {
    const parts = log.trim().split("\t");
    let requestId, shortRequestId, level;

    if (parts.length >= 3 && DATE_RE.test(parts[0])) {
        // An application log
        parts.shift();
        requestId = parts.shift();
        level = parts.shift();
    } else {
        const words = parts[0].split(" ");
        level = words.shift();
        parts[0] = words.join(" ");
    }
    const message = parts.join("\t");

    const match = /(?<id>[a-f\d]{8})/.exec(requestId || message);
    if (match) {
        shortRequestId = match.groups?.id;
    }
    return { level, message, shortRequestId };
};

function useMRTLogs(project, environment, enabled) {
    const [logs, setLogs] = React.useState([]);
    const [websocket, setWebsocket] = React.useState(null);
    const { data: token, error } = useQuery(
        ["mrt", "projects", project, "environments", environment, "jwt"],
        async () => {
            const response = await mrt.get(
                `?_method=POST&_endpoint=projects/${project}/target/${environment}/jwt/`,
            );
            return response.data.token;
        },
        {
            staleTime: 1000 * 60 * 20,
            retry: false,
            enabled: !!(project && environment && enabled),
        },
    );

    React.useEffect(() => {
        if (!token || error || !enabled || !project || !environment) {
            return;
        }
        if (websocket) {
            // close any outstanding
            websocket.close();
        }
        const url = new URL("wss://logs.mobify.com");
        url.search = new URLSearchParams({
            project,
            environment,
            // TODO: get user from credentials
            user: CONFIG.username,
            access_token: token,
        });
        const _websocket = new WebSocket(url);

        _websocket.onopen = () => {
            console.log("connected to websocket");
        };
        _websocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("received websocket message", data);
            const newLogs = data
                .map((l) => parseLog(l.message))
                .filter(Boolean);
            setLogs((oldLogs) => [...oldLogs, ...newLogs]);
        };

        setWebsocket(_websocket);

        return () => {
            _websocket.close();
            setWebsocket(null);
        };
    }, [token, error, project, environment, enabled]);
    return logs;
}

function useMRTEnvVars(project, environment) {
    return useQuery(
        ["mrt", "projects", project, "environments", environment, "env-var"],
        async () => {
            const response = await mrt.get(
                `?_method=GET&_endpoint=projects/${project}/target/${environment}/env-var/`,
            );
            return response.data;
        },
        {
            select: (data) =>
                Object.entries(data).map(([key, value]) => ({ key, ...value })),
            staleTime: 1000 * 60 * 20,
            retry: false,
            enabled: !!(project && environment),
        },
    );
}

function EnvVarEditDialog({ envVar, onSave, onClose }) {
    const { register, handleSubmit } = useForm({
        values: {
            ...envVar,
            value: "",
        },
    });
    const onSaveHandler = (data) => {
        onSave({
            key: envVar.key,
            value: data.value,
        });
    };

    return (
        <Modal
            isOpen={!!envVar}
            ariaHideApp={false}
            footer={[
                <Button key="1" label="Cancel" onClick={onClose} />,
                <Button
                    key="2"
                    type="submit"
                    label="Save"
                    variant="brand"
                    onClick={handleSubmit(onSaveHandler)}
                />,
            ]}
            onRequestClose={onClose}
            heading={`Edit Env Var ${envVar?.key}`}
        >
            <section className="slds-p-around_large">
                <form onSubmit={handleSubmit(onSaveHandler)}>
                    <TextAreaField
                        label="Value"
                        {...register("value", {
                            required: true,
                        })}
                    />
                </form>
            </section>
        </Modal>
    );
}

export function MRTEnvVars() {
    const [project, setProject] = React.useState("");
    const [environment, setEnvironment] = React.useState("");
    const { data: projects } = useQuery(["mrt", "projects"], getProjects, {
        placeholderData: [],
    });
    const { data: environments } = useQuery(
        ["mrt", "projects", project, "environments"],
        () => getEnvironments(project),
        {
            placeholderData: [],
            enabled: !!project,
        },
    );
    // These are formatted for the combobox component
    const projectOptions =
        projects?.map((p) => ({
            id: p.slug,
            label: p.name,
            subTitle: p.slug,
        })) || [];
    const selectedProject = projectOptions?.find((p) => p.id === project);
    const environmentOptions = environments?.map((e) => ({
        id: e.slug,
        label: e.name,
        subTitle: e.slug,
    }));
    const selectedEnvironment = environmentOptions?.find(
        (e) => e.id === environment,
    );

    const { data: envVars, isFetching } = useMRTEnvVars(project, environment);

    const [pendingEnvVars, setPendingEnvVars] = useState({});
    const [editingEnvVar, setEditingEnvVar] = useState(null);

    useEffect(() => {
        setPendingEnvVars({});
    }, [project, environment]);

    const envVarsRows =
        envVars?.map((envVar) => {
            var pendingEnvVar = pendingEnvVars[envVar.key];
            return {
                id: envVar.key,
                ...envVar,
                classNameRow: pendingEnvVar
                    ? pendingEnvVar.value === null
                        ? "envvar-remove"
                        : "envvar-pending"
                    : "",
            };
        }) || [];

    const updateEnvVars = useMutation(
        (data) =>
            mrt.post(
                `?_method=PATCH&_endpoint=projects/${project}/target/${environment}/env-var/`,
                data,
            ),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([
                    "mrt",
                    "projects",
                    project,
                    "environments",
                    environment,
                    "env-var",
                ]);
            },
        },
    );

    console.log(pendingEnvVars);
    const deployEnvVars = () => {
        if (
            window.confirm(
                "Are you sure you want to set these pending environment variables? This will trigger a redeploy of your environment.",
            )
        ) {
            updateEnvVars.mutate(pendingEnvVars, {
                onSuccess: () => {
                    setPendingEnvVars({});
                },
            });
        }
    };

    return (
        <>
            <EnvVarEditDialog
                envVar={editingEnvVar}
                onSave={(envVar) => {
                    setPendingEnvVars((pending) => ({
                        ...pending,
                        [envVar.key]: {
                            value: envVar.value,
                        },
                    }));
                    setEditingEnvVar(null);
                }}
                onClose={() => setEditingEnvVar(null)}
            />
            <Global styles={pendingRow} />
            <Card
                className="slds-card_boundary"
                heading="Environment Variables"
                filter={
                    <div className="slds-grid slds-gutters slds-wrap slds-m-vertical--medium">
                        <div className="slds-col slds-size_2-of-4">
                            <SingleSelectComboBox
                                label="Projects"
                                options={projectOptions}
                                onSelect={(value) =>
                                    setProject(value?.id || "")
                                }
                                selection={selectedProject}
                            />
                        </div>
                        <div className="slds-col slds-size_2-of-4">
                            <SingleSelectComboBox
                                label="Environment"
                                options={environmentOptions}
                                onSelect={(value) =>
                                    setEnvironment(value?.id || "")
                                }
                                selection={selectedEnvironment}
                            />
                        </div>
                    </div>
                }
                headerActions={[
                    <Button
                        key={1}
                        disabled={!environment}
                        label="Add Env Var"
                        variant="brand"
                        onClick={() => {}}
                    />,
                    <Button
                        key={2}
                        disabled={
                            !environment ||
                            Object.keys(pendingEnvVars).length === 0
                        }
                        label="Deploy"
                        variant="destructive"
                        onClick={deployEnvVars}
                    />,
                ]}
            >
                {isFetching ? (
                    <SpinnerWithContainer />
                ) : (
                    <DataTable
                        assistiveText={{
                            actionsHeader: "actions",
                            columnSort: "sort this column",
                            columnSortedAscending: "asc",
                            columnSortedDescending: "desc",
                            selectAllRows: "Select all rows",
                            selectRow: "Select this row",
                        }}
                        fixedLayout
                        keyboardNavigation
                        items={envVarsRows}
                        id="DataTableExample-2"
                        onRowChange={() => {}}
                        onSort={() => {}}
                        selection={[]}
                    >
                        <DataTableColumn
                            key={0}
                            label="Key"
                            primaryColumn
                            property="key"
                            width="8rem"
                        />
                        <DataTableColumn
                            key={1}
                            label="Value"
                            property="value"
                            width="10rem"
                        />
                        <DataTableColumn
                            key={1}
                            label="Created At"
                            property="created_at"
                        />
                        <DataTableColumn
                            key={1}
                            label="Updated At"
                            property="updated_at"
                        />
                        <DataTableColumn
                            key={1}
                            label="Updated By"
                            truncate
                            property="updated_by"
                        />
                        <DataTableRowActions
                            key={100}
                            options={[
                                {
                                    id: 0,
                                    label: "Edit",
                                    value: "edit",
                                },
                                {
                                    id: 0,
                                    label: "Remove",
                                    value: "remove",
                                },
                            ]}
                            onAction={(data, { value: action }) => {
                                console.log("Action Selected", data, action);
                                if (action === "edit") {
                                    setEditingEnvVar(data);
                                } else if (action === "remove") {
                                    setPendingEnvVars((pending) => ({
                                        ...pending,
                                        [data.key]: {
                                            value: null,
                                        },
                                    }));
                                }
                            }}
                            dropdown={<Dropdown length="5" />}
                        />
                    </DataTable>
                )}
            </Card>
        </>
    );
}

export function MRTLogs() {
    const [enabled, setEnabled] = React.useState(false);
    const [project, setProject] = React.useState("");
    const [environment, setEnvironment] = React.useState("");
    const { data: projects } = useQuery(["mrt", "projects"], getProjects, {
        placeholderData: [],
    });
    const { data: environments } = useQuery(
        ["mrt", "projects", project, "environments"],
        () => getEnvironments(project),
        {
            placeholderData: [],
            enabled: !!project,
        },
    );
    const logs = useMRTLogs(project, environment, enabled);

    // These are formatted for the combobox component
    const projectOptions =
        projects?.map((p) => ({
            id: p.slug,
            label: p.name,
            subTitle: p.slug,
        })) || [];
    const selectedProject = projectOptions?.find((p) => p.id === project);
    const environmentOptions = environments?.map((e) => ({
        id: e.slug,
        label: e.name,
        subTitle: e.slug,
    }));
    const selectedEnvironment = environmentOptions?.find(
        (e) => e.id === environment,
    );

    return (
        <Card
            className="slds-card_boundary"
            heading="Logs"
            filter={
                <div className="slds-grid slds-gutters slds-wrap slds-m-vertical--medium">
                    <div className="slds-col slds-size_2-of-4">
                        <SingleSelectComboBox
                            label="Projects"
                            placeholder="Select a Project"
                            options={projectOptions}
                            onSelect={(value) => setProject(value?.id || "")}
                            selection={selectedProject}
                        />
                    </div>
                    <div className="slds-col slds-size_2-of-4">
                        <SingleSelectComboBox
                            label="Environments"
                            placeholder="Select a environment"
                            options={environmentOptions}
                            onSelect={(value) =>
                                setEnvironment(value?.id || "")
                            }
                            selection={selectedEnvironment}
                        />
                    </div>
                </div>
            }
            headerActions={[
                <Button
                    key={0}
                    disabled={!environment}
                    variant="brand"
                    onClick={() => setEnabled(!enabled)}
                >
                    {enabled ? "Stop" : "Start"}
                </Button>,
            ]}
        >
            <div className="slds-grid slds-gutters slds-wrap slds-m-vertical--medium">
                <div className="slds-col slds-size_12-of-12">
                    <div
                        className="slds-card slds-p-vertical--large"
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "10px",
                            minHeight: "300px",
                            maxHeight: "800px",
                            overflowY: "scroll",
                        }}
                    >
                        {logs?.map((log, index) => (
                            <div
                                className="slds-grid slds-gutters slds-wrap slds-m-vertical--small"
                                key={index}
                                style={{ fontFamily: "monospace" }}
                            >
                                <div
                                    className="slds-col slds-size_1-of-12"
                                    style={{
                                        color:
                                            log.level === "ERROR"
                                                ? "red"
                                                : log.level === "WARN"
                                                  ? "yellow"
                                                  : "white",
                                    }}
                                >
                                    {log.level}
                                </div>
                                <div
                                    className="slds-col slds-size_1-of-12"
                                    style={{ color: "gray" }}
                                >
                                    [{log.shortRequestId || "-"}]
                                </div>
                                <div className="slds-col slds-size_10-of-12">
                                    {log.message}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default function ManagedRuntime() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <DefaultLayout>
            <div className="slds-grid slds-gutters slds-wrap">
                <div className="slds-col slds-size_1-of-4">
                    <VerticalNavigation
                        id="sample-navigation"
                        categories={[
                            {
                                id: "mrt",
                                label: "Managed Runtime",
                                items: [
                                    {
                                        id: "logs",
                                        label: "Logs",
                                        icon: (
                                            <Icon
                                                category="utility"
                                                name="send_log"
                                                size="x-small"
                                            />
                                        ),
                                    },
                                    {
                                        id: "env",
                                        label: "Environment Vars",
                                        icon: (
                                            <Icon
                                                category="utility"
                                                name="data_mapping"
                                                size="x-small"
                                            />
                                        ),
                                    },
                                ],
                            },
                        ]}
                        selectedId={location.pathname.split("/")[2]}
                        onSelect={(event, data) => {
                            navigate(`/mrt/${data.item.id}`);
                        }}
                    />
                </div>
                <div className="slds-col slds-size_3-of-4">
                    <Outlet />
                </div>
            </div>
        </DefaultLayout>
    );
}

export const ROUTES = [
    {
        path: "mrt",
        element: <ManagedRuntime />,
        handle: {
            crumb: () => "Managed Runtime",
        },
        children: [
            {
                index: true,
                path: "logs",
                element: <MRTLogs />,
                handle: {
                    crumb: () => "Logs",
                },
            },
            {
                path: "env",
                element: <MRTEnvVars />,
                handle: {
                    crumb: () => "Environment Variables",
                },
            },
        ],
    },
];
