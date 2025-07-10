import { createDataStoreHooks } from "../api/data";

enum AgentType {
    MIAW = "MIAW",
    MIAW_CUSTOM = "MIAW_CUSTOM",
    COPILOT = "COPILOT",
    AGENT_API = "AGENT_API",
}

export interface Agent {
    name: string;
    description?: string;
    type: AgentType;
    builtIn?: boolean;
    deployStorefront: boolean;
    deployBM: boolean;

    // MIAW / MIAW_CUSTOM
    siteId: string | string[];
    orgId: string;
    userVerification: boolean;
    esDeveloperName: string;
    deploymentUrl: string;
    messagingUrl: string;
    prechatFields?: string;

    // AGENT_API
    agentId: string;
    serviceName: string;
    endpoint: string;
    consumerKey: string;
    consumerSecret: string;
    mockResponse?: string;
    enableMocking?: boolean;

    enableSLASShopper?: boolean;

    // Custom
    deploymentCode?: string;
}

const defaultAgent: Agent = {
    name: "New Agent",
    description: "",
    builtIn: false,
    type: AgentType.MIAW,
    deployStorefront: false,
    deployBM: false,
    userVerification: false,
    siteId: "",
    orgId: "",
    esDeveloperName: "",
    deploymentUrl: "",
    messagingUrl: "",
    deploymentCode: "",
    prechatFields: "",
    enableMocking: false,
    mockResponse: "",

    agentId: "",
    serviceName: "agent.api",
    endpoint: "",
    consumerKey: "",
    consumerSecret: "",
    enableSLASShopper: false,
};

export const {
    useList: useAgents,
    useItem: useAgent,
    useFind: useFindAgents,
    useCreate: useCreateAgent,
    useUpdate: useUpdateAgent,
    usePatch: usePatchAgent,
    useDelete: useDeleteAgent,
    queries: { list: agentsQuery, item: agentQuery },
} = createDataStoreHooks<Agent>({
    typeId: "agents",
    queryableAttributes: ["name", "type", "deployStorefront", "deployBM"],
    defaultData: defaultAgent,
});
