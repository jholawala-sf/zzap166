import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import SLDSConfig from "./slds";
import { queryClient, useAgentDeployments } from "./helpers";
import { QueryClientProvider } from "@tanstack/react-query";

interface AgentAttrs {
    agentId: string;
    context: Record<string, any>;
}

function AgentEditorWrapper(props) {
    return (
        <SLDSConfig>
            <QueryClientProvider client={queryClient}>
                <AgentEditor {...props} />
            </QueryClientProvider>
        </SLDSConfig>
    );
}

function AgentEditor({ config, value }) {
    const [readOnly, setReadOnly] = useState(false);
    const { data: agents, isLoading } = useAgentDeployments();
    const [attrs, setAttrs] = useState<AgentAttrs>(value || {});

    useEffect(() => {
        emit({
            type: "sfcc:value",
            payload: attrs,
        });
    }, [attrs]);

    useEffect(() => {
        emit({
            type: "sfcc:interacted",
        });
    }, []);

    return (
        <div className="space-y-4 py-2 px-1">
            <div className={"slds-form-element"}>
                <label className="slds-form-element__label" htmlFor={`agents`}>
                    Agent Deployment Name
                    <span className="text-red-500 ml-1">*</span>
                </label>
                <div className="slds-form-element__control">
                    <select
                        id={`agents`}
                        className="slds-select"
                        required={true}
                        value={attrs.agentId}
                        onChange={(e) => {
                            setAttrs({
                                ...attrs,
                                agentId: e.target.value,
                            });
                        }}
                    >
                        {isLoading ? (
                            <option value="">Loading...</option>
                        ) : (
                            <>
                                <option value="">Select an agent</option>
                                {agents?.map((agent) => (
                                    <option key={agent.__id} value={agent.__id}>
                                        {agent.name}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>
        </div>
    );
}

subscribe(
    "sfcc:ready",
    ({ config, value }: { config: any; value: AgentAttrs | null }) => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        const root = createRoot(container);
        root.render(<AgentEditorWrapper config={config} value={value} />);
    },
);
