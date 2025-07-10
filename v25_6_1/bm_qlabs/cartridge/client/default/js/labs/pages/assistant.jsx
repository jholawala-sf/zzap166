import React from "react";
import Handlebars from "handlebars/dist/cjs/handlebars";
import ReactMarkdown from "react-markdown";

import DefaultLayout from "../layouts/default.jsx";
import QLogo from "../assets/q_small.png";
import {
    Accordion,
    AccordionPanel,
    Button,
    Card,
    Icon,
    PageHeaderControl,
    SplitView,
    SplitViewHeader,
    SplitViewListbox,
} from "@salesforce/design-system-react";
import { Modal } from "../components/modal";
import {
    chatSessionQuery,
    chatSessionsQuery,
    createChatSessionMutation,
    deleteChatSessionMutation,
    isAIChatSessionMessage,
    sendMessageMutation,
    useChatSession,
    useChatSessions,
} from "../state/chat";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { TextArea } from "../components/forms";
import { css } from "@emotion/react";
import { CONFIG } from "../config";
import queryClient from "../query-client";
import { usePromptByName } from "../state/prompts";
import { useCurrentLocaleLanguage } from "../state/global";

const chatMessageContentStyle = css`
    white-space: normal;

    ol {
        list-style: decimal;
    }

    ul {
        margin: 10px 0;
        list-style: disc;
    }

    li {
        margin-left: 1rem;
    }

    p {
        margin: 5px 0;
    }

    pre {
        background: white;
        color: black;
        padding: 4px 8px;
        margin: 10px 10px;
        border-radius: 0.5rem 0.5rem;
        max-height: 200px;
        overflow-y: auto;
    }
`;

function LoadingChatMessage() {
    return (
        <li className="slds-chat-listitem slds-chat-listitem_outbound">
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

/**
 * @param {object} props
 * @param {ChatSessionMessage} props.message
 */
function PlanResultInfo({ message }) {
    // TODO this summary is a bit of mess
    const planResults = Array.isArray(message.planResult)
        ? message.planResult
        : [message.planResult];
    const [expandedPanels, setExpandedPanels] = React.useState({});

    return (
        <section className="slds-p-around_small">
            {planResults.map((planResult, resultIndex) => (
                <>
                    {planResult.plannerName && (
                        <h2
                            className="slds-text-heading_xsmall slds-text-font_monospace slds-text-align_center"
                            style={{ color: "#777" }}
                        >
                            {planResult.plannerName}
                        </h2>
                    )}
                    <Accordion id="base-example-accordion" key={resultIndex}>
                        {planResult.steps
                            .map((step, i) => (
                                <AccordionPanel
                                    expanded={
                                        !!expandedPanels[resultIndex + "-" + i]
                                    }
                                    id={i}
                                    key={i}
                                    onTogglePanel={() =>
                                        setExpandedPanels({
                                            ...expandedPanels,
                                            [resultIndex + "-" + i]:
                                                !expandedPanels[
                                                    resultIndex + "-" + i
                                                ],
                                        })
                                    }
                                    summary={
                                        planResult.steps.length > 1
                                            ? `Step ${i + 1} (Action: ${
                                                  step.action
                                              })`
                                            : `Action: ${step.action}`
                                    }
                                >
                                    <strong>[THOUGHT]</strong> {step.thought}
                                    <br />
                                    <br />
                                    <strong>[ACTION]</strong>{" "}
                                    <code>{step.action}</code>
                                    <pre>
                                        {JSON.stringify(
                                            step.actionInput,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                    <strong>[OBSERVATION]</strong>
                                    <pre>
                                        {JSON.stringify(
                                            step.actionOutput,
                                            null,
                                            2,
                                        )}
                                    </pre>
                                </AccordionPanel>
                            ))
                            .concat([
                                planResult.finalAnswer && (
                                    <AccordionPanel
                                        expanded={!!expandedPanels["final"]}
                                        id={"final"}
                                        onTogglePanel={() =>
                                            setExpandedPanels({
                                                ...expandedPanels,
                                                final: !expandedPanels["final"],
                                            })
                                        }
                                        summary={`Final Answer`}
                                    >
                                        <ReactMarkdown>
                                            {planResult.finalAnswer}
                                        </ReactMarkdown>
                                    </AccordionPanel>
                                ),
                            ])
                            .filter(Boolean)}
                    </Accordion>
                </>
            ))}
        </section>
    );
}

/**
 * @param {object} props
 * @param {ChatSessionMessage} props.message
 */
function ChatMessage({ message }) {
    const messageDate = new Date(message.date);
    const [isPlanDialogOpen, setIsPlanDialogOpen] = React.useState(false);
    if (!message.message) {
        return null;
    }
    if (message.inbound) {
        return (
            <li className="slds-chat-listitem slds-chat-listitem_inbound">
                <div className="slds-chat-message">
                    <div className="slds-chat-message__body">
                        <div className="slds-chat-message__text slds-chat-message__text_inbound">
                            {message.message?.content}
                        </div>
                        <div className="slds-chat-message__meta">
                            {message.username} •{" "}
                            {messageDate.toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </li>
        );
    } else if (message.username === "Q-Labs") {
        return (
            <li className="slds-chat-listitem slds-chat-listitem_outbound">
                <div className="slds-chat-message">
                    <span
                        aria-hidden="true"
                        className="slds-avatar slds-avatar_circle slds-chat-avatar"
                    >
                        <abbr className="slds-avatar__initials slds-avatar__initials_inverse">
                            <img src={QLogo} />
                        </abbr>
                    </span>
                    <div className="slds-chat-message__body">
                        <div className="slds-chat-message__text slds-chat-message__text_outbound">
                            <div css={chatMessageContentStyle}>
                                <ReactMarkdown>
                                    {message.message?.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                        <div className="slds-chat-message__meta">
                            Q-Labs • {messageDate.toLocaleTimeString()}
                        </div>
                    </div>
                </div>
            </li>
        );
    } else {
        // outbound (i.e. from AI or system; see note on inbound/outbound above)
        const planResult = Array.isArray(message.planResult)
            ? message.planResult[message.planResult.length - 1]
            : message.planResult;
        return (
            <>
                {planResult && planResult.success && (
                    <Modal
                        isOpen={isPlanDialogOpen}
                        ariaHideApp={false}
                        onRequestClose={() => setIsPlanDialogOpen(false)}
                        heading={"Plan Execution Result"}
                        tagline={<span>{planResult.question}</span>}
                    >
                        <PlanResultInfo message={message} />
                    </Modal>
                )}
                <li className="slds-chat-listitem slds-chat-listitem_outbound">
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
                            <div className="slds-chat-message__text slds-chat-message__text_outbound">
                                <div css={chatMessageContentStyle}>
                                    <ReactMarkdown>
                                        {message.message?.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                            <div className="slds-chat-message__meta">
                                AI • {messageDate.toLocaleTimeString()}{" "}
                                {message.cost
                                    ? `(IN: ${message.cost.prompt_tokens} OUT: ${message.cost.completion_tokens} T: ${message.cost.total_tokens})`
                                    : ""}
                                {planResult &&
                                planResult.steps.length > 0 &&
                                planResult.success ? (
                                    <span>
                                        {" "}
                                        (
                                        <a
                                            onClick={() =>
                                                setIsPlanDialogOpen(true)
                                            }
                                        >
                                            Plan
                                        </a>{" "}
                                        STEPS: {planResult.steps.length})
                                    </span>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </li>
            </>
        );
    }
}

function ChatSession({ sessionId }) {
    const navigate = useNavigate();
    const { data: sessionObj } = useChatSession(sessionId);
    const { language: currentLanguage } = useCurrentLocaleLanguage();
    /** @type {ChatSession} */
    const session = sessionObj?.data;

    const { data: systemPrompt } = usePromptByName(
        "AI Assistant System Prompt",
    );
    const systemPromptTpl = Handlebars.compile(systemPrompt?.data.body || "");
    const systemPromptCompiled = systemPromptTpl({
        CurrentLanguage: currentLanguage,
        context: {
            siteId: CONFIG.currentSite ?? "RefArch",
        },
    });
    const sendMessage = useMutation(
        sendMessageMutation(sessionId, systemPromptCompiled),
    );
    const deleteChatSession = useMutation(deleteChatSessionMutation());
    const [pendingMessage, setPendingMessage] = React.useState("");

    const deleteChatSessionHandler = () => {
        // use js confirm dialog
        if (
            window.confirm("Are you sure you want to delete this chat session?")
        ) {
            deleteChatSession.mutate(sessionObj, {
                onSuccess: () => {
                    navigate("/assistant");
                },
            });
        }
    };

    const messageInputRef = React.useRef(null);
    const messagesListRef = React.useRef(null);

    // scroll to bottom of messagesListRef on messages change
    React.useEffect(() => {
        setTimeout(() => {
            messagesListRef.current?.scroll(
                0,
                messagesListRef.current.scrollHeight,
            );
        }, 0);
    }, [session?.messages]);

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        if (pendingMessage) {
            sendMessage.mutate(pendingMessage);
            setPendingMessage("");
            messageInputRef.current?.focus();
        }
    };

    return (
        <>
            <Card
                heading={
                    <>
                        <strong>Chat</strong>
                        <span>
                            {" "}
                            {sessionObj
                                ? new Date(
                                      sessionObj.creationDate,
                                  ).toDateString()
                                : "..."}
                        </span>{" "}
                        ({sessionId})
                    </>
                }
                headerActions={[
                    <Button
                        key={0}
                        variant="destructive2"
                        onClick={deleteChatSessionHandler}
                        label="Delete"
                    />,
                ]}
            >
                <div
                    className="slds-card__body slds-scrollable_y"
                    style={{ maxHeight: "600px", minHeight: "200px" }}
                    ref={messagesListRef}
                >
                    <section role="log" className="slds-chat">
                        <ul className="slds-chat-list">
                            <li className="slds-chat-listitem slds-chat-listitem_bookend">
                                <div className="slds-chat-bookend">
                                    <span className="slds-icon_container slds-icon-utility-end_chat slds-chat-icon">
                                        <Icon
                                            category="utility"
                                            name="chat"
                                            size="small"
                                        />
                                    </span>
                                    <p>Chat started</p>
                                </div>
                            </li>
                            {session?.messages?.map((m, i) => (
                                <ChatMessage message={m} key={i} />
                            ))}
                            {sendMessage.isLoading && <LoadingChatMessage />}
                        </ul>
                    </section>
                </div>
            </Card>
            <div className="slds-card">
                <div className="slds-card__body slds-card__body_inner">
                    <div className="slds-form-element">
                        <div className="slds-form-element__control">
                            <TextArea
                                placeholder="Query..."
                                value={pendingMessage}
                                ref={messageInputRef}
                                style={{ padding: "0.5rem 0.75rem !important" }}
                                readOnly={sendMessage.isLoading}
                                onChange={(e) =>
                                    setPendingMessage(e.target.value)
                                }
                                className="slds-textarea"
                                onKeyDown={(e) => {
                                    // support shift+enter to send message
                                    if (e.keyCode === 13 && e.shiftKey) {
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
                            Send
                        </button>
                    </div>
                </div>
            </div>
            {sessionObj && <ChatSessionInfo sessionId={sessionObj.id} />}
        </>
    );
}

function ChatSessionInfo({ sessionId }) {
    // get the full session messages
    const { data: sessionObj, isLoading } = useQuery(
        chatSessionQuery(sessionId),
    );
    const session = sessionObj?.data;

    var model = "llmgateway__OpenAIGPT4Omni";
    const lastAIMessage = session?.messages
        ?.filter(isAIChatSessionMessage)
        .slice(-1)[0];
    if (lastAIMessage && lastAIMessage.model) {
        model = lastAIMessage.model;
    }

    return (
        <>
            {!isLoading && (
                <Card
                    heading="Session Info"
                    icon={<Icon category="utility" name="info" size="small" />}
                >
                    <div className="slds-grid slds-wrap">
                        <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2">
                            <dl className="slds-list_horizontal slds-wrap">
                                <dt className="slds-item_label slds-text-color_weak slds-truncate">
                                    Session ID
                                </dt>
                                <dd className="slds-item_detail slds-truncate">
                                    {sessionObj.id}
                                </dd>
                                <dt className="slds-item_label slds-text-color_weak slds-truncate">
                                    Created
                                </dt>
                                <dd className="slds-item_detail slds-truncate">
                                    {new Date(
                                        sessionObj.creationDate,
                                    ).toLocaleString()}
                                </dd>
                            </dl>
                        </div>
                        <div className="slds-col slds-size_1-of-1 slds-medium-size_1-of-2">
                            <dl className="slds-list_horizontal slds-wrap">
                                <dt className="slds-item_label slds-text-color_weak slds-truncate">
                                    Last Model
                                </dt>
                                <dd className="slds-item_detail slds-truncate">
                                    {model}
                                </dd>
                                <dt className="slds-item_label slds-text-color_weak slds-truncate">
                                    Last Updated
                                </dt>
                                <dd className="slds-item_detail slds-truncate">
                                    {new Date(
                                        sessionObj.lastModified,
                                    ).toLocaleString()}
                                </dd>
                            </dl>
                        </div>
                    </div>
                </Card>
            )}
        </>
    );
}

function ChatSessionsView() {
    const params = useParams();
    const { data: chatSessions } = useChatSessions();
    const createChatSession = useMutation(createChatSessionMutation());
    const navigate = useNavigate();

    const listItems =
        chatSessions
            ?.sort((a, b) =>
                a.creationDate < b.creationDate
                    ? -1
                    : a.creationDate < b.creationDate
                      ? 1
                      : 0,
            )
            .map((s) => ({
                id: s.id,
                label: `Chat`,
                bottomRightText: s.id.substring(0, 6),
                topRightText: new Date(s.creationDate).toLocaleString(),
            })) || [];

    const selected = listItems.find((li) => li.id === params.sessionId);

    return (
        <>
            <SplitViewHeader
                key="1"
                onRenderActions={() => (
                    <PageHeaderControl>
                        <Button
                            label="New Chat"
                            onClick={() => createChatSession.mutate()}
                        />
                    </PageHeaderControl>
                )}
                icon={<Icon category="standard" name="live_chat" />}
                info={
                    <p className="slds-text-body_small">
                        {chatSessions?.length} items
                    </p>
                }
                title={"Chats"}
                truncate
                variant="object-home"
            />
            <SplitViewListbox
                key="2"
                multiple
                options={listItems}
                events={{
                    onSelect: (event, { item }) => {
                        navigate(`/assistant/${item.id}`);
                    },
                }}
                selection={[selected]}
            />
        </>
    );
}

function ChatSessionView() {
    const params = useParams();
    // using a key here to ensure a fresh component on project route change
    return <ChatSession sessionId={params.sessionId} key={params.sessionId} />;
}

function Assistant() {
    return (
        <DefaultLayout>
            <SplitView
                masterWidth={"375px"}
                master={<ChatSessionsView />}
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
        path: "assistant",
        element: <Assistant />,
        loader: async () => {
            const query = chatSessionsQuery();
            return await queryClient.ensureQueryData(query);
        },
        handle: {
            crumb: () => "Merchant Assistant",
        },
        children: [
            {
                index: true,
                element: (
                    <div className="slds-card slds-p-around--large">
                        Choose or create a session
                    </div>
                ),
            },
            {
                path: ":sessionId",
                element: <ChatSessionView />,
                loader: async ({ params }) => {
                    const query = chatSessionQuery(params.sessionId);
                    return await queryClient.ensureQueryData(query);
                },
                handle: {
                    crumb: (data) => {
                        return `Chat Session ${data.id.substring(0, 6)}...`;
                    },
                },
            },
        ],
    },
];
