import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DefaultLayout from "../layouts/default.jsx";

import { AgentApiDebugChatSession } from "@qlabs/components/agents/AgentApiDebugChatSession.js";
import { DebuggingChatSession } from "@qlabs/components/agents/MIAWApiDebugChatSession.js";
import {
    Button,
    Card,
    Icon,
    PageHeaderControl,
    SplitView,
    SplitViewHeader,
    SplitViewListbox,
} from "@salesforce/design-system-react";
import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { SortOrder } from "../api/data.js";
import { api as ocapi } from "../api/ocapi";
import {
    CodeEditorJavascript,
    validateJavascript,
} from "../components/CodeEditor";
import {
    CheckboxField,
    InputField,
    LoadingSaveButton,
    SelectField,
    TextAreaField,
} from "../components/forms";
import queryClient from "../query-client.js";
import {
    agentQuery,
    agentsQuery,
    useAgent,
    useCreateAgent,
    useDeleteAgent,
    useFindAgents,
    useUpdateAgent,
} from "../state/agents";
import AstroIcon from "@companion/components/icons/astro";

function EinsteinIcon({ ...props }) {
    return (
        <Icon
            name="einstein"
            category="utility"
            style={{
                fill: "#0176D3",
                backgroundColor: "transparent",
            }}
            {...props}
        />
    );
}

function AgentsView() {
    const params = useParams();
    const navigate = useNavigate();
    const { data: agents, isLoading } = useFindAgents({
        sort: [
            {
                field: "creation_date",
                sortOrder: SortOrder.DESC,
            },
        ],
    });
    const createAgent = useCreateAgent();
    const listItems =
        agents?.map((agent) => ({
            id: agent.id,
            label: agent.data.name,
            bottomLeftText: agent.data.type,
            bottomRightText: agent.id.substring(0, 6),
            topRightText: agent.creationDate,
        })) ?? [];

    const selectedAgent = listItems?.find((li) => li.id === params.agentId);

    return (
        <>
            <SplitViewHeader
                key="1"
                onRenderActions={() => (
                    <PageHeaderControl>
                        <Button
                            label="New Agent"
                            onClick={() =>
                                createAgent.mutate({ name: "New Deployment" })
                            }
                        />
                    </PageHeaderControl>
                )}
                icon={<AstroIcon style={{ color: "rgb(1, 118, 211)" }} />}
                info={
                    <p className="slds-text-body_small">
                        {agents?.length} items
                    </p>
                }
                title={"Agent Deployments"}
                truncate
                variant="object-home"
            />
            <SplitViewListbox
                key="2"
                multiple
                options={listItems}
                events={{
                    onSelect: (event, { item }) => {
                        navigate(`/agents/${item.id}`);
                    },
                }}
                selection={[selectedAgent]}
            />
        </>
    );
}

export function AgentView() {
    const params = useParams();
    // using a key here to ensure a fresh component on project route change
    return <AgentEdit agentId={params.agentId} key={params.agentId} />;
}

function useSites() {
    return useQuery({
        queryKey: ["sites"],
        queryFn: async () => {
            const response = await ocapi.get("sites");
            return response.data.data.map((site) => site.id);
        },
    });
}

function AgentEdit({ agentId }) {
    const navigate = useNavigate();
    const { data: agentObj, isLoading: isAgentLoading } = useAgent(agentId);
    const { data: sites } = useSites();
    const agent = agentObj?.data;
    const [showDebug, setShowDebug] = useState(false);

    const deleteAgent = useDeleteAgent();
    const deleteAgentHandler = () => {
        if (window.confirm("Are you sure you want to delete this agent?")) {
            deleteAgent.mutate(agentObj, {
                onSuccess: () => {
                    navigate("/agents");
                },
            });
        }
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch,
        reset,
    } = useForm({ defaultValues: agent });
    const deploymentType = watch("type");
    const deployStorefront = watch("deployStorefront");
    useEffect(() => {
        reset(agent);
    }, [isAgentLoading]);
    const updateAgent = useUpdateAgent(agentObj);
    const createAgent = useCreateAgent();
    const cloneAgentHandler = () => {
        createAgent.mutate({
            ...agent,
            name: `${agent.name} (Copy)`,
            builtIn: false,
        });
    };

    return (
        <Card
            heading={agent?.name}
            icon={
                <AstroIcon
                    style={{
                        color: "rgb(1, 118, 211)",
                        width: "1.5rem",
                        height: "1.5rem",
                    }}
                />
            }
            headerActions={
                <PageHeaderControl>
                    <Button
                        label="Clone"
                        variant="neutral"
                        onClick={cloneAgentHandler}
                    />
                    <Button
                        label="Delete"
                        variant="destructive"
                        disabled={agent?.builtIn}
                        onClick={deleteAgentHandler}
                    />
                </PageHeaderControl>
            }
        >
            <div className="slds-p-around_medium">
                <form
                    onSubmit={handleSubmit((data) => {
                        updateAgent.mutate(data);
                    })}
                >
                    <InputField
                        label="Agent Deployment Name"
                        readOnly={agent?.builtIn}
                        {...register("name", {
                            required: true,
                        })}
                        error={errors.name}
                    />
                    <TextAreaField
                        label="Description"
                        readOnly={agent?.builtIn}
                        {...register("description", {})}
                        help="This can be used for notes or additional information."
                        error={errors.name}
                    />
                    <SelectField
                        label="Deployment Type"
                        readOnly={agent?.builtIn}
                        {...register("type", {
                            required: true,
                        })}
                        error={errors.type}
                    >
                        <option value="">Select</option>
                        <option value="MIAW">MIAW</option>
                        <option value="MIAW_CUSTOM">MIAW Custom</option>
                        <option value="AGENT_API">Agent API</option>
                    </SelectField>
                    <CheckboxField
                        name="deployStorefront"
                        control={control}
                        label="Deploy on Storefront"
                    />
                    {deployStorefront && (
                        <div
                            className={"slds-form-element slds-m-around--small"}
                        >
                            <label
                                className="slds-form-element__label"
                                htmlFor="select-01"
                            >
                                Select a site
                            </label>
                            <div className="slds-form-element__control">
                                <div className="slds-select_container">
                                    <select
                                        multiple
                                        className="slds-select"
                                        id="select-01"
                                        {...register("siteId")}
                                    >
                                        {sites?.map((_site) => (
                                            <option value={_site} key={_site}>
                                                {_site}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                    <CheckboxField
                        name="deployBM"
                        control={control}
                        label="Deploy in Business Manager"
                    />
                    {["MIAW", "MIAW_CUSTOM"].includes(deploymentType) && (
                        <>
                            <CheckboxField
                                name="userVerification"
                                control={control}
                                label="Requires User Verification"
                            />
                            <InputField
                                label="Org ID"
                                {...register("orgId", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={errors.orgId}
                            />
                            <InputField
                                label="Embedded Service Developer Name"
                                {...register("esDeveloperName", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={errors.esDeveloperName}
                            />
                            <InputField
                                label="Messaging URL (SCRT)"
                                {...register("messagingUrl", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={errors.messagingUrl}
                            />
                        </>
                    )}
                    {["MIAW"].includes(deploymentType) && (
                        <>
                            <InputField
                                label="Deployment URL"
                                {...register("deploymentUrl", {
                                    required: true,
                                    maxLength: 100,
                                })}
                                error={errors.deploymentUrl}
                            />
                        </>
                    )}
                    {["AGENT_API"].includes(deploymentType) && (
                        <>
                            <InputField
                                label="Agent ID"
                                {...register("agentId", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={errors.agentId}
                            />
                            <InputField
                                label="Service Name"
                                {...register("serviceName", {
                                    required: true,
                                    maxLength: 80,
                                })}
                                error={errors.serviceName}
                            />
                            <InputField
                                label="Endpoint"
                                {...register("endpoint", {
                                    required: false,
                                })}
                                error={errors.serviceName}
                            />
                            <InputField
                                label="Consumer Key"
                                {...register("consumerKey", {
                                    required: false,
                                })}
                                error={errors.consumerKey}
                            />
                            <InputField
                                label="Consumer Secret"
                                {...register("consumerSecret", {
                                    required: false,
                                })}
                                type="password"
                                error={errors.consumerSecret}
                            />

                            <fieldset className="slds-form-element slds-form-element_compound">
                                <legend className="slds-form-element__legend slds-form-element__label">
                                    Features
                                </legend>
                                <CheckboxField
                                    name="enableSLASShopper"
                                    control={control}
                                    label="Enable SLAS Shopper"
                                    help="Adds a SLAS shopper token to the context variables (storefront only)"
                                />
                            </fieldset>
                        </>
                    )}
                    {["MIAW"].includes(deploymentType) && (
                        <CodeEditorJavascript
                            label="Prechat Fields"
                            name="prechatFields"
                            control={control}
                            help='JSON Hidden Prechat Fields. "siteId", "scapiShortCode", and "scapiOrgId" are added automatically. Example: { "queueName": "Commerce Queue", "siteId": "nto" }'
                            rows={10}
                        />
                    )}
                    {!["MIAW"].includes(deploymentType) && (
                        <CodeEditorJavascript
                            label="Deployment Code"
                            name="deploymentCode"
                            control={control}
                            rows={10}
                        />
                    )}
                    {["AGENT_API"].includes(deploymentType) && (
                        <>
                            <CheckboxField
                                name="enableMocking"
                                control={control}
                                label="Enable Mocking"
                                help="If enabled, the mock response will be returned instead of calling the actual API."
                            />
                            <CodeEditorJavascript
                                label="Mock Response"
                                name="mockResponse"
                                control={control}
                                rows={10}
                                rules={{
                                    validate: {
                                        javascript: validateJavascript,
                                    },
                                }}
                                help="JSON mock response to be returned instead of calling the actual API. Should be an array with each index representing the response to the client sequenceId"
                            />
                        </>
                    )}
                    <LoadingSaveButton
                        loading={updateAgent.isPending}
                        label="Save"
                        variant="brand"
                        type="submit"
                    />
                </form>

                {["MIAW_CUSTOM", "AGENT_API"].includes(deploymentType) && (
                    <div className="slds-m-top_medium">
                        <Button
                            label="Toggle Debug"
                            onClick={() => setShowDebug(!showDebug)}
                            variant="neutral"
                        />
                        {showDebug && agent.type === "MIAW_CUSTOM" && (
                            <DebuggingChatSession agent={agent} />
                        )}
                        {showDebug && agent.type === "AGENT_API" && (
                            <AgentApiDebugChatSession agentObj={agentObj} />
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}

export default function AgentsManager() {
    return (
        <DefaultLayout>
            <SplitView
                masterWidth={"375px"}
                master={<AgentsView />}
                detail={
                    <div className="slds-m-left_medium slds-grid slds-grid_vertical">
                        <Outlet />
                    </div>
                }
            />
        </DefaultLayout>
    );
}

export const ROUTES = [
    {
        path: "agents",
        element: <AgentsManager />,
        loader: async () => {
            const query = agentsQuery;
            return await queryClient.ensureQueryData(query);
        },
        handle: {
            crumb: () => "Agents",
        },
        children: [
            {
                index: true,
                element: (
                    <div className="slds-card slds-p-around--large">
                        Choose or create an agent deployment
                    </div>
                ),
            },
            {
                path: ":agentId",
                element: <AgentView />,
                loader: async ({ params }) => {
                    const query = agentQuery(params.agentId);
                    return await queryClient.ensureQueryData(query);
                },
                handle: {
                    crumb: (data) => {
                        return `Agent ${data.id.substring(0, 6)}...`;
                    },
                },
            },
        ],
    },
];
