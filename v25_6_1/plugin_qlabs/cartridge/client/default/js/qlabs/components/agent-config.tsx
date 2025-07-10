import {
    AgentContext,
    AgentProvider,
    type IAgentContext,
} from "@qlabs/state/agentapi";
import { useContext, useEffect } from "react";

interface AgentConfigProps {
    variables?: Record<string, string>;
    sessionKey?: string;
    children: React.ReactNode;
    messagePrefix?: string;
    messageSuffix?: string;
}
/**
 * Updates AgentContext using various props
 * Allows for dynamic configuration of agent api chat bots from inside qlabs
 * at runtime
 */
export function AgentConfig({
    variables,
    sessionKey,
    messagePrefix,
    messageSuffix,
    children,
}: AgentConfigProps) {
    const agentContext = useContext<IAgentContext>(AgentContext);

    return (
        <AgentProvider
            value={{
                ...agentContext,
                sessionKey: sessionKey || agentContext.sessionKey,
                runtimeContext: {
                    ...agentContext.runtimeContext,
                    ...variables,
                },
                messagePrefix: messagePrefix || agentContext.messagePrefix,
                messageSuffix: messageSuffix || agentContext.messageSuffix,
            }}
        >
            {children}
        </AgentProvider>
    );
}
