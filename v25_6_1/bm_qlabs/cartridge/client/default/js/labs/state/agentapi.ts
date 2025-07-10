// This module provides the react-query (and session) state
// for the Agent API, providing context and hooks for communicating
// with agents.

import type { Referenceable } from "@qlabs/api/data";
import type { Agent } from "./agents";
import React, { useCallback, useContext, useEffect } from "react";
import type {
    EndOfTurnMessage,
    InformMessage,
    ProgressIndicatorMessage,
    ResponseMessage,
    SessionEndedMessage,
    StartSessionSyncResponseMessage,
    TextMessage,
} from "@qlabs/api/agentapi";
import {
    RequestMessageType,
    ResponseMessageType,
    agentApiCreateSession,
    agentApiEndSession,
    agentApiSendMessage,
    agentApiSendMessageStream,
} from "@qlabs/api/agentapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CONFIG } from "@qlabs/config";
import { extractJson, randomUUID, wait } from "@qlabs/api/utils";
import type { CallbackFunc } from "@companion/hooks/event-manager";
import { qlabsSubscribe, qlabsEmit } from "@companion/hooks/event-manager";
import type { A } from "node_modules/msw/lib/core/HttpResponse-Cy7ytzUn";

// const AsyncGeneratorFunction = async function* () {}.constructor;

function isAsyncGeneratorFunction(fn: unknown) {
    if (typeof fn !== "function") {
        return false; // Not even a function
    }
    //return fn.constructor === AsyncGeneratorFunction;
    // The above is cleaner but given the way the mock function is created
    // the constructor does not match the above reference
    return (
        Object.prototype.toString.call(fn) === "[object AsyncGeneratorFunction]"
    );
}

const SITE_ID = CONFIG.currentSite;

// Users of this agent can set arbitrary runtime context
export interface IAgentContext {
    agent: Referenceable<Agent>;
    sessionKey?: string;
    runtimeContext: Record<string, string>;
    setRuntimeContext: React.Dispatch<
        React.SetStateAction<Record<string, string>>
    >;
    messagePrefix?: string;
    messageSuffix?: string;
}

export const AgentContext = React.createContext<IAgentContext>({
    agent: null,
    runtimeContext: {},
    setRuntimeContext: () => {},
});

export const AgentProvider = AgentContext.Provider;

// These agent message types provide a derrived interface to the
// Agent API REST types to allow for a simplified and mixed user and agent messages
export interface AbstractAgentMessage {
    MESSAGE_TYPE: "USER" | "AGENT";
}

export interface AgentAPIMessage<T = Record<string, unknown>>
    extends AbstractAgentMessage {
    MESSAGE_TYPE: "AGENT";
    type: ResponseMessageType;
    id: string;
    message?: string;
    json?: T;
}

export interface AgentUserMessage extends AbstractAgentMessage {
    MESSAGE_TYPE: "USER";
    text: string;
}
export type AgentMessage = AgentAPIMessage | AgentUserMessage;

// This is the state stored in the query client and local storage
interface AgentSessionState<T> {
    sessionId: string;
    messages: AgentMessage[];
    sequenceId: number;
    data: T | null;
    lastStructuredMessage: T | null;
    // Shared loading state for multiple hook clients
    loading?: boolean;
    active?: boolean;
}

const LOCAL_STORAGE_PREFIX = "agent-session-" + SITE_ID;
const SESSION_COOKIE_NAME = "agent-session-active-" + SITE_ID;

// Helper functions for cookie management
function setSessionCookie(
    agentName: string,
    sessionKey: string | undefined,
): void {
    const agentNameWithoutSpaces = agentName.replace(/\s+/g, "_");
    const sessionKeyWithoutSpaces = sessionKey
        ? sessionKey.replace(/\s+/g, "_")
        : "";
    // Set session cookie that expires when browser is closed (no expiry date)
    document.cookie = `${SESSION_COOKIE_NAME}${agentNameWithoutSpaces}${sessionKeyWithoutSpaces}=true; path=/; SameSite=Strict`;
}

function hasSessionCookie(
    agentName: string,
    sessionKey: string | undefined,
): boolean {
    const agentNameWithoutSpaces = agentName.replace(/\s+/g, "_");
    const sessionKeyWithoutSpaces = sessionKey
        ? sessionKey.replace(/\s+/g, "_")
        : "";
    return document.cookie
        .split(";")
        .some((cookie) =>
            cookie
                .trim()
                .startsWith(
                    `${SESSION_COOKIE_NAME}${agentNameWithoutSpaces}${sessionKeyWithoutSpaces}=`,
                ),
        );
}

const getLocalStorageKey = (
    agentName: string,
    sessionKey: string | undefined,
) =>
    `${LOCAL_STORAGE_PREFIX}-${agentName}${sessionKey ? "-" + sessionKey : ""}`;

function saveSessionState<T>(
    agentName: string,
    sessionKey: string | undefined,
    state: Partial<AgentSessionState<T>>,
) {
    try {
        // Ensure the session cookie exists
        setSessionCookie(agentName, sessionKey);

        const existingState = loadSessionState<T>(agentName, sessionKey);
        if (existingState) {
            state = { ...existingState, ...state };
        }

        localStorage.setItem(
            getLocalStorageKey(agentName, sessionKey),
            JSON.stringify(state),
        );
    } catch (e) {
        console.error("Failed to save session state to localStorage:", e);
    }
}

function loadSessionState<T>(
    agentName: string,
    sessionKey: string | undefined,
): AgentSessionState<T> | null {
    try {
        // Only load from localStorage if the session cookie exists
        if (!hasSessionCookie(agentName, sessionKey)) {
            return null;
        }

        const savedState = localStorage.getItem(
            getLocalStorageKey(agentName, sessionKey),
        );

        if (savedState) {
            return JSON.parse(savedState);
        }
    } catch (e) {
        console.error("Failed to load session state from localStorage:", e);
    }
    return null;
}

function clearSessionState(agentName: string, sessionKey: string | undefined) {
    try {
        localStorage.removeItem(getLocalStorageKey(agentName, sessionKey));
    } catch (e) {
        console.error("Failed to clear session state from localStorage:", e);
    }
}

type MockMessageFactory = (message: TextMessage) => InformMessage;
type AsyncMockMessageFactoryGenerator = (
    message: TextMessage,
) => AsyncGenerator<InformMessage>;
type MockEntry = InformMessage | MockMessageFactory;
/**
 * Agent deployments support mocking responses instead
 * of calling the API.
 *
 * TODO right now we assume mocks are of type Inform
 */
function getMockResponse(
    agent: Agent,
    context: Record<string, unknown>,
): Array<MockEntry> {
    const func = new Function(
        "agent",
        "context",
        "wait",
        "return " + agent.mockResponse,
    );
    return func(agent, context, wait) as Array<MockEntry>;
}

interface UseAgentAPIOptions {
    agent?: Referenceable<Agent>;
    enabled?: boolean;
    sessionKey?: string;
    messagePrefix?: string;
    messageSuffix?: string;
}

/**
 * Hook to manage agent deployment session state and
 * and messaging.
 *
 * JSON data from messages is accumulated in the data attribute
 * and json attribute of each individual message. The generic type T
 * can be used to specify the expected structure of the JSON data
 * for client code.
 *
 * The agent name is used as the primary key for state storage
 * with sessionkey as an (optional) secondary key.
 */
export function useAgentAPI<T = unknown>({
    agent: _agent,
    enabled = true,
    sessionKey: _sessionKey,
    messagePrefix: _messagePrefix,
    messageSuffix: _messageSuffix,
}: UseAgentAPIOptions = {}) {
    const {
        runtimeContext,
        agent: _contextAgent,
        sessionKey: _contextSessionKey,
        messagePrefix: _contextMessagePrefix,
        messageSuffix: _contextMessageSuffix,
    } = useContext<IAgentContext>(AgentContext);
    // if agent isn't provided get it from <AgentContext/>
    const agent = _agent || _contextAgent;
    const sessionKey = _sessionKey || _contextSessionKey || "default";
    const queryClient = useQueryClient();
    const messagePrefix = _messagePrefix || _contextMessagePrefix || "";
    const messageSuffix = _messageSuffix || _contextMessageSuffix || "";

    // translate k/v context to API runtime variables
    const getRuntimeVariables = () => {
        if (!runtimeContext) return [];
        return Object.entries(runtimeContext).map(([key, value]) => ({
            name: key,
            type: "Text",
            value,
        }));
    };

    const { data, isLoading, isFetching, isError, error } = useQuery<
        AgentSessionState<T>
    >({
        queryKey: ["agentSession", agent?.name, sessionKey],
        queryFn: async () => {
            const savedState = loadSessionState<T>(agent.name, sessionKey);
            if (savedState) {
                return savedState;
            }

            // Create new session if no saved state
            const variables = getRuntimeVariables();
            if (agent.enableMocking) {
                const uuid = randomUUID();
                const mockResponses = getMockResponse(agent, runtimeContext);

                // the first entry must be an Inform
                const firstResponse = mockResponses[0] as InformMessage;
                await wait(1000);
                console.group(`Agent ${agent.name} agentApiCreateSession`);
                console.log("Using mock response for agent");
                console.dir(agent);
                console.dir(firstResponse);
                if (variables) {
                    console.log("With Variables");
                    console.dir(variables);
                }
                console.groupEnd();
                var resp: StartSessionSyncResponseMessage = {
                    sessionId: uuid,
                    messages: [firstResponse],
                };
            } else {
                resp = await agentApiCreateSession(agent, {
                    variables,
                });
            }

            const _messages: AgentMessage[] = resp.messages.map((message) => {
                return {
                    MESSAGE_TYPE: "AGENT",
                    ...message,
                };
            });

            // Initialize new session state
            const initialState = {
                sessionId: resp.sessionId,
                messages: _messages,
                active: true,
                sequenceId: 1,
                data: null,
                lastStructuredMessage: null,
            };

            // Save the initial state
            saveSessionState(agent.name, sessionKey, initialState);
            return initialState;
        },
        enabled: !!agent && enabled,
    });

    const sendMessageMutation = useMutation({
        mutationFn: async (text: string) => {
            const currentState = data;
            if (!agent || !currentState?.sessionId) {
                throw new Error("Session not initialized");
            }

            const sequenceId = currentState.sequenceId;
            const message: TextMessage = {
                type: RequestMessageType.Text,
                text: messagePrefix + text + messageSuffix,
                sequenceId,
            };

            const userMessage: AgentUserMessage = {
                MESSAGE_TYPE: "USER",
                ...message,
                text,
            };

            // Optimistically update the messages
            queryClient.setQueryData(
                ["agentSession", agent.name, sessionKey],
                (old: AgentSessionState<T>) => ({
                    ...old,
                    messages: [...old.messages, userMessage],
                    sequenceId: sequenceId + 1,
                    loading: true,
                }),
            );

            const variables = getRuntimeVariables();

            let streamFullyProcessed = false; // Flag to track if an EndOfTurn/SessionEnded was hit

            const processResponseMessage = (apiMsg: ResponseMessage) => {
                const agentApiMsg: AgentAPIMessage = {
                    MESSAGE_TYPE: "AGENT",
                    id: apiMsg.id,
                    type: apiMsg.type,
                    // Spread common fields, then specific ones for type safety if using discriminated union properly
                    ...(apiMsg.type === ResponseMessageType.Inform && {
                        message: (apiMsg as InformMessage).message,
                        feedbackId: (apiMsg as InformMessage).feedbackId,
                        planId: (apiMsg as InformMessage).planId,
                        isContentSafe: (apiMsg as InformMessage).isContentSafe,
                        result: (apiMsg as InformMessage).result,
                        citedReferences: (apiMsg as InformMessage)
                            .citedReferences,
                    }),
                    ...(apiMsg.type === ResponseMessageType.SessionEnded && {
                        reason: (apiMsg as SessionEndedMessage).reason,
                        feedbackId: (apiMsg as SessionEndedMessage).feedbackId,
                    }),
                    ...(apiMsg.type ===
                        ResponseMessageType.ProgressIndicator && {
                        message: (apiMsg as ProgressIndicatorMessage).message,
                        indicatorType: (apiMsg as ProgressIndicatorMessage)
                            .indicatorType,
                    }),
                    // Add other types if they have unique fields to display
                    json:
                        apiMsg.type === ResponseMessageType.Inform
                            ? extractJson((apiMsg as InformMessage).message)
                            : undefined,
                };

                queryClient.setQueryData<AgentSessionState<T>>(
                    ["agentSession", agent.name, sessionKey],
                    (old) => {
                        if (!old) return old;

                        const newMessages = [...old.messages, agentApiMsg];
                        let updatedData = old.data;
                        let updatedLastStructured = old.lastStructuredMessage;

                        if (agentApiMsg.json) {
                            updatedData = {
                                ...(old.data || {}),
                                ...agentApiMsg.json,
                            } as T;
                            updatedLastStructured = agentApiMsg.json as T;
                        }

                        const isSessionEndingMessage =
                            apiMsg.type === ResponseMessageType.SessionEnded;
                        const isTurnEndingMessage =
                            apiMsg.type === ResponseMessageType.EndOfTurn ||
                            isSessionEndingMessage;

                        if (isTurnEndingMessage) streamFullyProcessed = true;

                        const newState = {
                            ...old,
                            messages: newMessages,
                            data: updatedData,
                            lastStructuredMessage: updatedLastStructured,
                            loading: !isTurnEndingMessage, // Set loading false only if stream ends this turn
                            active: old.active && !isSessionEndingMessage,
                        };
                        saveSessionState(agent.name, sessionKey, newState);
                        return newState;
                    },
                );
            };

            if (agent.enableMocking) {
                const mockResponses = getMockResponse(agent, runtimeContext);
                if (mockResponses.length < message.sequenceId + 1) {
                    var response = mockResponses[mockResponses.length - 1];
                } else {
                    response = mockResponses[message.sequenceId];
                }
                // Debugging
                console.group(`Agent ${agent.name} agentApiSendMessage`);
                console.log("Using mock response for agent");
                console.dir(agent);
                if (variables) {
                    console.log("With Variables");
                    console.dir(variables);
                }

                if (isAsyncGeneratorFunction(response)) {
                    // TODO make the type narrowing above work so we don't need to cast
                    const _response =
                        response as unknown as AsyncMockMessageFactoryGenerator;
                    for await (const apiMessage of _response(message)) {
                        processResponseMessage(apiMessage);
                        console.dir(apiMessage);
                    }
                    console.groupEnd();
                } else {
                    if (typeof response === "function") {
                        response = response(message);
                    }

                    console.dir(response);
                    console.groupEnd();

                    await wait(3000);
                    processResponseMessage(response);
                }
                if (!streamFullyProcessed) {
                    // process an EndOfTurn so the mock doesn't have to define it
                    processResponseMessage({
                        type: ResponseMessageType.EndOfTurn,
                        id: randomUUID(),
                    } as EndOfTurnMessage);
                }
            } else {
                const stream = agentApiSendMessageStream(
                    agent,
                    currentState.sessionId,
                    message,
                    { variables },
                );
                for await (const apiMessage of stream) {
                    processResponseMessage(apiMessage);
                    if (streamFullyProcessed) break;
                }

                if (!streamFullyProcessed) {
                    queryClient.setQueryData<AgentSessionState<T>>(
                        ["agentSession", agent.name, sessionKey],
                        (old) => {
                            if (!old || !old.loading) return old; // No change if not loading or already updated
                            console.warn(
                                "Stream processing finished without an explicit EndOfTurn or SessionEnded message.",
                            );
                            const newState = { ...old, loading: false };
                            saveSessionState(agent.name, sessionKey, newState);
                            return newState;
                        },
                    );
                }
            }
        },
        onSuccess: () => {
            // session state will be updated by event stream above
            qlabsEmit(
                "agent:messageSequenceComplete",
                {},
                { agentName: agent?.name, sessionKey },
            );
        },
        onError: (error) => {
            console.error("Failed to send message:", error);
        },
    });

    // Reset structured data
    const resetStructuredData = useCallback(() => {
        queryClient.setQueryData(
            ["agentSession", agent.name, sessionKey],
            (old: AgentSessionState<T>) => ({
                ...old,
                data: null,
                lastStructuredMessage: null,
            }),
        );
    }, [agent.name, sessionKey, queryClient]);

    // Reset the entire session store
    const resetSession = useCallback(() => {
        queryClient.setQueryData(
            ["agentSession", agent.name, sessionKey],
            null,
        );
        if (data?.sessionId && !agent.enableMocking) {
            try {
                agentApiEndSession(agent, data?.sessionId || "");
            } catch (e) {
                console.error("Failed to end session:", e);
            }
        }
        clearSessionState(agent.name, sessionKey);
        queryClient.invalidateQueries({
            queryKey: ["agentSession", agent.name, sessionKey],
        });
    }, [agent.name, sessionKey, queryClient]);

    const sendMessage = useCallback(
        (text: string) => {
            if (!agent) {
                console.error("Agent not initialized");
            } else if (!data?.active) {
                console.error("Agent Session not active; cannot send messages");
            } else {
                sendMessageMutation.mutate(text);
            }
        },
        [sendMessageMutation],
    );

    // qlabs events matching this agent context
    const subscribe = useCallback(
        (eventName: string, callback: CallbackFunc) =>
            qlabsSubscribe(eventName, callback, {
                agentName: agent.name,
                sessionKey: sessionKey,
            }),
        [agent?.name, sessionKey],
    );
    const emit = useCallback(
        (eventName: string, payload?: unknown) =>
            qlabsEmit(eventName, payload, {
                agentName: agent.name,
                sessionKey: sessionKey,
            }),
        [agent?.name, sessionKey],
    );

    useEffect(() => {
        const unsub = subscribe("agent:resetSession", () => {
            resetSession();
        });
        return () => {
            unsub();
        };
    }, [subscribe, resetSession]);

    useEffect(() => {
        qlabsEmit("agent:sessionState", data ?? {}, {
            agentName: agent?.name,
            sessionKey: sessionKey,
        });
    }, [data, qlabsEmit]);

    return {
        messages: data?.messages || [],
        sessionId: data?.sessionId,
        isLoading:
            isLoading ||
            isFetching ||
            sendMessageMutation.isPending ||
            data?.loading,
        isError: isError || sendMessageMutation.isError,
        error: error || sendMessageMutation.error,
        sendMessage,
        isActive:
            !!data?.sessionId &&
            !isLoading &&
            !sendMessageMutation.isPending &&
            !!data?.active,
        data: data?.data || null,
        lastStructuredMessage: data?.lastStructuredMessage || null,
        resetStructuredData,
        resetSession,
        subscribe,
        emit,
    };
}
