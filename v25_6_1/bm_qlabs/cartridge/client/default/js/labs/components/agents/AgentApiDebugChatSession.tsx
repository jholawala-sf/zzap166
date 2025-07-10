import {
    AgentContext,
    type IAgentContext,
    useAgentAPI,
} from "@qlabs/state/agentapi";
import type { DataStoreObject } from "@qlabs/api/data";
import type { Agent } from "@qlabs/state/agents";
import React, { useEffect } from "react";
import { useState } from "react";
import { InputField } from "../forms";
import { Button, Card } from "@salesforce/design-system-react";
import { CustomAgentWrapper } from "@companion/components/deployments";

// Refactored component using the custom hook
interface AgentApiDebugChatSessionProps {
    agentObj: DataStoreObject<Agent>;
}

type DebugAgentAPIMessageType = any;
interface DebugAgentAPIMessage extends DebugAgentAPIMessageType {}

function AgentMessageEvent({ message }) {
    const [showData, setShowData] = useState(false);
    return (
        <div>
            <b>{message?.type ?? "Message"}</b>
            <br />
            <Button
                label="Details"
                onClick={() => setShowData(!showData)}
                variant="neutral"
            />
            {showData && <pre>{JSON.stringify(message, null, 2)}</pre>}
        </div>
    );
}

function MessagesList({ messages }) {
    const messagesListRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setTimeout(() => {
            messagesListRef.current?.scroll(
                0,
                messagesListRef.current.scrollHeight,
            );
        }, 0);
    }, [messages]);

    return (
        <div className="">
            <div
                className="slds-scrollable_y "
                style={{
                    maxHeight: "500px",
                    minHeight: "200px",
                }}
                ref={messagesListRef}
            >
                {messages && (
                    <ul>
                        {messages.map((msg, i) => (
                            <li key={i}>
                                <AgentMessageEvent message={msg} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export function AgentApiDebugChatSession({
    agentObj,
}: AgentApiDebugChatSessionProps) {
    return (
        <CustomAgentWrapper agent={agentObj.data}>
            <AgentApiDebugChatSessionImpl agentObj={agentObj} />
        </CustomAgentWrapper>
    );
}

function AgentApiDebugChatSessionImpl({
    agentObj,
}: AgentApiDebugChatSessionProps) {
    const agent = agentObj.data;
    const { runtimeContext, setRuntimeContext } =
        React.useContext<IAgentContext>(AgentContext);
    const [messageText, setMessageText] = useState("");
    const [enabled, setEnabled] = useState(false);
    const [runtimeContextString, setRuntimeContextString] = useState("");

    const {
        messages,
        sessionId,
        isLoading,
        sendMessage,
        isActive,
        data,
        resetSession,
    } = useAgentAPI<DebugAgentAPIMessage>({ agent, enabled });

    useEffect(() => {
        // always reset the session when debugging
        if (enabled) {
            resetSession();
        }
    }, [enabled]);

    const handleSendMessage = () => {
        if (messageText.trim()) {
            sendMessage(messageText);
            setMessageText("");
        }
    };

    useEffect(() => {
        try {
            const parsedContext = JSON.parse(runtimeContextString);
            setRuntimeContext(parsedContext);
        } catch (error) {}
    }, [runtimeContextString]);

    return (
        <div className="slds-box_border">
            <Card heading="Conversation">
                <div className="slds-card__body slds-card__body_inner">
                    <div className="slds-grid slds-gutters">
                        <div className="slds-col slds-size_1-of-2">
                            <Button
                                label={
                                    enabled ? "Reset Session" : "Start Session"
                                }
                                onClick={() => {
                                    if (enabled) {
                                        resetSession();
                                    } else {
                                        setEnabled(true);
                                    }
                                }}
                                variant="neutral"
                            />
                        </div>
                        <div className="slds-col slds-size_1-of-2">
                            <textarea
                                className="slds-textarea"
                                placeholder="Runtime Context"
                                value={runtimeContextString}
                                onChange={(e) =>
                                    setRuntimeContextString(e.target.value)
                                }
                            ></textarea>
                        </div>
                    </div>
                    <div className="slds-grid slds-gutters">
                        <div className="slds-col slds-size_1-of-2">
                            <h3 className="slds-text-heading_small">
                                Messages
                            </h3>
                            <MessagesList messages={messages} />
                        </div>
                        <div className="slds-col slds-size_1-of-2">
                            <h3 className="slds-text-heading_small">Session</h3>
                            <pre
                                style={{
                                    maxHeight: "400px",
                                    overflow: "auto",
                                }}
                            >
                                {JSON.stringify(
                                    {
                                        runtimeContext,
                                        sessionId,
                                        data,
                                    },
                                    null,
                                    2,
                                )}
                            </pre>
                        </div>
                    </div>
                    {isLoading && <div>Loading...</div>}
                    <InputField
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSendMessage();
                            }
                        }}
                    />
                    <Button
                        label="Send"
                        onClick={handleSendMessage}
                        disabled={!isActive || isLoading}
                    />
                </div>
            </Card>
        </div>
    );
}
