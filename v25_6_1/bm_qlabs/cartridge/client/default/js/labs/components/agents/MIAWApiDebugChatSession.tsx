import { useMIAWChatSession } from "@qlabs/state/miaw";
import { Button, Card } from "@salesforce/design-system-react";
import React, { useEffect, useState } from "react";
import { InputField } from "../forms";

function AgentMessageEvent({ message }) {
    const [showData, setShowData] = useState(false);
    return (
        <div>
            <b>{message?.event ?? "Message"}</b>
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

export function DebuggingChatSession({ agent }) {
    const {
        isLoading,
        error,
        isAuthenticated,
        conversationId,
        messages,
        sendMessage,
        startConversation,
        jwt,
    } = useMIAWChatSession(agent);

    const [messageText, setMessageText] = useState("");

    useEffect(() => {
        if (!conversationId) {
            startConversation();
        }
    }, [agent]);

    const sendMessageHandler = async () => {
        sendMessage.mutate(messageText);
        setMessageText("");
    };

    return (
        <div className="slds-box_border">
            <Card heading="Conversation">
                <div className="slds-card__body slds-card__body_inner">
                    <pre>
                        {JSON.stringify(
                            {
                                conversationId,
                                jwt,
                                error: error ? error : {},
                            },
                            null,
                            2,
                        )}
                    </pre>

                    {!conversationId && (
                        <Button onClick={startConversation}>
                            Start Conversation
                        </Button>
                    )}

                    {conversationId && (
                        <>
                            <MessagesList messages={messages} />
                            <InputField
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessageHandler();
                                    }
                                }}
                            />
                            <Button
                                label="Send"
                                onClick={sendMessageHandler}
                                disabled={!conversationId}
                            />
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}

