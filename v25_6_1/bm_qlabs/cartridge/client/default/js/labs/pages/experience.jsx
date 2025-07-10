import React, { useState } from "react";
import {
    Card,
    Icon,
    Accordion,
    AccordionPanel,
} from "@salesforce/design-system-react";
import { useMutation } from "@tanstack/react-query";
import { createExperiencePage, useExperiencePrompt } from "../state/experience";
import { TextArea } from "../components/forms";
import FullPage from "../layouts/full.jsx";
import { CONFIG } from "../config";

function LoadingChatMessage() {
    return (
        <li className="slds-chat-listitem slds-chat-listitem_inbound">
            <div className="slds-chat-message">
                <span
                    aria-hidden="true"
                    className="slds-avatar slds-avatar_circle slds-chat-avatar"
                >
                    <abbr className="slds-avatar__initials slds-avatar__initials_inverse">
                        <Icon
                            name="einstein"
                            category="utility"
                            size="small"
                            style={{
                                fill: "#0176D3",
                                backgroundColor: "transparent",
                            }}
                        />
                    </abbr>
                </span>
                <div className="slds-chat-message__body">
                    <span className="slds-icon-typing slds-is-animated">
                        <span className="slds-icon-typing__dot"></span>
                        <span className="slds-icon-typing__dot"></span>
                        <span className="slds-icon-typing__dot"></span>
                    </span>
                </div>
            </div>
        </li>
    );
}

function ChatMessage({ message }) {
    if (message.inbound) {
        return (
            <li className="slds-chat-listitem slds-chat-listitem_inbound">
                <div className="slds-chat-message">
                    <span
                        aria-hidden="true"
                        className="slds-avatar slds-avatar_circle slds-chat-avatar"
                    >
                        <abbr className="slds-avatar__initials slds-avatar__initials_inverse">
                            <Icon
                                name="einstein"
                                category="utility"
                                size="small"
                                style={{
                                    fill: "#0176D3",
                                    backgroundColor: "transparent",
                                }}
                            />
                        </abbr>
                    </span>
                    <div className="slds-chat-message__body">
                        <div className="slds-chat-message__text slds-chat-message__text_inbound">
                            {message.message?.content}
                        </div>
                        <div className="slds-chat-message__meta">System</div>
                    </div>
                </div>
            </li>
        );
    } else {
        return (
            <li className="slds-chat-listitem slds-chat-listitem_inbound">
                <div className="slds-chat-message">
                    <span
                        aria-hidden="true"
                        className="slds-avatar slds-avatar_circle slds-chat-avatar"
                    >
                        <abbr className="slds-avatar__initials slds-avatar__initials_inverse">
                            <Icon name="user" category="utility" size="small" />
                        </abbr>
                    </span>
                    <div className="slds-chat-message__body">
                        <div className="slds-chat-message__text slds-chat-message__text_inbound">
                            {message.message?.content}
                        </div>
                        <div className="slds-chat-message__meta">
                            {message.username}
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

const CHAT_INTRO =
    "Hello, I am an assistant that creates pages for you. Let me know what you want to see on your new page in the chat below.";

export default function ExperienceCreator() {
    const messageInputRef = React.useRef(null);
    const messagesListRef = React.useRef(null);

    const [pendingMessage, setPendingMessage] = useState("");
    const [result, setResult] = useState(null);
    const [pageId, setPageId] = useState(null);
    const [expandedDetails, setExpandedDetails] = useState(false);
    const iframeRef = React.useRef(null);

    const [messages, setMessages] = useState([
        {
            message: {
                content: CHAT_INTRO,
            },
            username: "Assistant",
            inbound: true,
        },
    ]);

    const {
        data: experiencePromptResult,
        isLoading: isLoadingExperiencePrompt,
    } = useExperiencePrompt(result);

    const reloadIframe = () => {
        if (iframeRef.current) {
            // eslint-disable-next-line no-self-assign
            iframeRef.current.src = iframeRef.current.src;
            iframeRef.current.contentWindow.location.reload();
        }
    };

    const sendMessage = useMutation(
        async (message) => {
            console.log(experiencePromptResult.promptText + message);
            return await createExperiencePage(
                pageId,
                experiencePromptResult.promptText + message,
                experiencePromptResult.componentTypes,
            );
        },
        {
            onSuccess: (data) => {
                setPendingMessage("");
                setPageId(data.pageId);
                setResult(data.result);
                setMessages([
                    ...messages,
                    {
                        message: {
                            content:
                                "Generation complete. Check out the results in the page to the right.",
                        },
                        username: "System",
                        inbound: true,
                    },
                ]);
                setTimeout(() => {
                    reloadIframe();
                }, 0);
            },
        },
    );

    React.useEffect(() => {
        setTimeout(() => {
            messagesListRef.current?.scroll(
                0,
                messagesListRef.current.scrollHeight,
            );
        }, 0);
    }, [messages]);

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        if (pendingMessage) {
            sendMessage.mutate(pendingMessage);
            setPendingMessage("");
            messageInputRef.current?.focus();
            setMessages([
                ...messages,
                {
                    message: {
                        content: pendingMessage,
                    },
                    username: CONFIG.username,
                    inbound: false,
                },
            ]);
        }
    };

    return (
        <FullPage>
            <div className={"slds-grid slds-gutters"}>
                <div className={"slds-col slds-size_1-of-4"}>
                    <Card heading="Experience Page Creation">
                        <div className="slds-card__body slds-card__body_inner">
                            <div
                                className="slds-scrollable_y "
                                style={{
                                    maxHeight: "600px",
                                    minHeight: "200px",
                                }}
                                ref={messagesListRef}
                            >
                                <section role="log" className="slds-chat">
                                    <ul className="slds-chat-list">
                                        {messages.map((message, index) => (
                                            <ChatMessage
                                                key={index}
                                                message={message}
                                            />
                                        ))}
                                        {sendMessage.isLoading && (
                                            <LoadingChatMessage />
                                        )}
                                    </ul>
                                </section>
                            </div>

                            <div className="slds-form-element">
                                <div className="slds-form-element__control">
                                    <TextArea
                                        placeholder="Query..."
                                        value={pendingMessage}
                                        ref={messageInputRef}
                                        style={{
                                            padding:
                                                "0.5rem 0.75rem !important",
                                        }}
                                        readOnly={
                                            sendMessage.isLoading ||
                                            isLoadingExperiencePrompt
                                        }
                                        onChange={(e) =>
                                            setPendingMessage(e.target.value)
                                        }
                                        className="slds-textarea"
                                        onKeyDown={(e) => {
                                            // support shift+enter to send message
                                            if (
                                                e.keyCode === 13 &&
                                                e.shiftKey
                                            ) {
                                                e.preventDefault();
                                                sendMessageHandler(e);
                                            }
                                        }}
                                    ></TextArea>
                                </div>
                            </div>
                            <div className="slds-text--align-end">
                                <button
                                    className="slds-button slds-button_brand"
                                    onClick={sendMessageHandler}
                                >
                                    Send.
                                </button>
                            </div>
                            <div className="slds-m-top_medium">
                                <Accordion id="base-example-accordion">
                                    <AccordionPanel
                                        expanded={!!expandedDetails}
                                        id={"details"}
                                        onTogglePanel={() => {
                                            setExpandedDetails(
                                                !expandedDetails,
                                            );
                                        }}
                                        summary={`Generation Details`}
                                    >
                                        {sendMessage.isLoading && (
                                            <div>Loading...</div>
                                        )}
                                        <h2>Intermediate Form:</h2>
                                        <pre>{result}</pre>
                                    </AccordionPanel>
                                </Accordion>
                            </div>
                        </div>
                    </Card>
                </div>
                <div
                    className={"slds-col slds-size_3-of-4 "}
                    style={{ minHeight: "100vh" }}
                >
                    {pageId ? (
                        <iframe
                            ref={iframeRef}
                            src={`/on/demandware.store/Sites-Site/default/ViewLdsBusinessManagerScreen-PageDesigner/#/edit/page/${pageId}`}
                            width="100%"
                            height="100%"
                            border="0"
                            style={{ border: 0 }}
                        ></iframe>
                    ) : (
                        <div>No page created yet.</div>
                    )}
                </div>
            </div>
        </FullPage>
    );
}

export const ROUTES = [
    {
        path: "experience",
        element: <ExperienceCreator />,
        handle: {
            crumb: "Experience Creator",
        },
    },
];
