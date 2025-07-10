import type { Agent } from "@qlabs/state/agents";
import axios from "axios";
import { CONFIG } from "../config";
import type { Referenceable } from "./data";
import type { EventSourceMessage } from "eventsource-parser";
import { createParser } from "eventsource-parser";

import { randomUUID } from "./utils";

// this is proxied by ECOM for authorization and context variables
export const api = axios.create({
    baseURL: CONFIG.agentApiEndpoint,
});
// this is direct for SSE; we need user defined CORS origin support for this
// const agentApi = axios.create({
//     baseURL: "https://api.salesforce.com",
// });

api.interceptors.request.use((config) => {
    const originalUri = config.url;
    config.headers["x-original-method"] = config.method;
    config.headers["x-endpoint"] = originalUri;
    config.method = "post";
    config.url = "";
    return config;
});

api.interceptors.response.use(null, (error) => {
    if (error.response) {
        console.error(error.response.data);
    }
    throw error;
});

/** https://developer.salesforce.com/docs/einstein/genai/references/agent-api?meta=Summary **/
/** Request Messages **/
export enum RequestMessageType {
    Text = "Text",
    // TODO model these others
    Reply = "Reply",
    Cancel = "Cancel",
    TransferFailed = "TransferFailed",
    TransferSucceeded = "TransferSucceeded",
    PlanTemplate = "PlanTemplate",
}
export interface AbstractRequestMessage {
    type: RequestMessageType;
}
export interface TextMessage extends AbstractRequestMessage {
    type: RequestMessageType.Text;
    text: string;
    sequenceId: number;
    inReplyToMessageId?: string;
}
export type RequestMessage = TextMessage;

/** Response Messages **/
export enum ResponseMessageType {
    Inform = "Inform",
    SessionEnded = "SessionEnded",
    TextChunk = "TextChunk",
    ValidationFailureChunk = "ValidationFailureChunk",
    ProgressIndicator = "ProgressIndicator",
    Inquire = "Inquire",
    Confirm = "Confirm",
    Failure = "Failure",
    Escalate = "Escalate",
    EndOfTurn = "EndOfTurn",
    Error = "Error",
}

export interface AbstractResponseMessage {
    id: string;
    type: ResponseMessageType;
}

export interface InformMessage extends AbstractResponseMessage {
    type: ResponseMessageType.Inform;
    feedbackId: string;
    planId: string;
    isContentSafe: boolean;
    message: string;
    result: any[];
    citedReferences: any[];
}

export interface SessionEndedMessage extends AbstractResponseMessage {
    type: ResponseMessageType.SessionEnded;
    reason: string;
    feedbackId: string;
}
export interface EndOfTurnMessage extends AbstractResponseMessage {
    type: ResponseMessageType.EndOfTurn;
}
export interface ProgressIndicatorMessage extends AbstractResponseMessage {
    type: ResponseMessageType.ProgressIndicator;
    indicatorType: "ACTION";
    message: string;
}
export type ResponseMessage =
    | InformMessage
    | SessionEndedMessage
    | ProgressIndicatorMessage
    | EndOfTurnMessage;

export interface StartSessionSyncResponseMessage {
    sessionId: string;
    messages: ResponseMessage[];
}
export interface SendMessagesSyncResponseMessage {
    messages: ResponseMessage[];
}

export async function agentApiCreateSession(
    agent: Referenceable<Agent>,
    { variables = [] } = {},
): Promise<StartSessionSyncResponseMessage> {
    const uuid = randomUUID();

    console.debug("Creating Agent API session with uuid", uuid);
    const resp = await api.post<StartSessionSyncResponseMessage>(
        `/einstein/ai-agent/v1/agents/${agent.agentId}/sessions`,
        {
            externalSessionKey: uuid,
            instanceConfig: {
                endpoint: agent.endpoint,
            },
            tz: "America/Los_Angeles",
            variables,
            featureSupport: "Streaming",
            streamingCapabilities: {
                chunkTypes: [],
            },
            bypassUser: true,
        },
        {
            headers: {
                // this is the custom object ID not the SFDC ID
                "x-agent-id": agent.__id,
            },
        },
    );

    return {
        ...resp.data,
    };
}

export async function agentApiEndSession(
    agent: Referenceable<Agent>,
    sessionId: string,
): Promise<void> {
    console.debug("Deleting Agent API session with uuid", sessionId);
    await api.delete<void>(`/einstein/ai-agent/v1/sessions/${sessionId}`, {
        headers: {
            // this is the custom object ID not the SFDC ID
            "x-agent-id": agent.__id,
        },
    });
}

export async function agentApiSendMessage(
    agent: Referenceable<Agent>,
    sessionId: string,
    message: RequestMessage,
    { variables = [] } = {},
): Promise<SendMessagesSyncResponseMessage> {
    const resp = await api.post<SendMessagesSyncResponseMessage>(
        `/einstein/ai-agent/v1/sessions/${sessionId}/messages`,
        {
            message,
            variables,
        },
        {
            headers: {
                // this is the custom object ID not the SFDC ID
                "x-agent-id": agent.__id,
            },
        },
    );

    return resp.data;
}

/**
 * Sends a message to the agent API and returns an async generator for the SSE stream.
 *
 * @yields ResponseMessage objects from the stream.
 * @throws Error if the stream connection fails, or an unrecoverable error occurs during streaming.
 */
export async function* agentApiSendMessageStream(
    agent: Referenceable<Agent>, // Unused in request, kept for consistency
    sessionId: string,
    message: RequestMessage,
    { variables = [] }: { variables?: any[] } = {},
): AsyncGenerator<ResponseMessage, void, undefined> {
    const controller = new AbortController();

    // readable stream to consume the processed response messages from the SSE stream
    const stream = new ReadableStream<ResponseMessage>({
        async start(streamController) {
            try {
                // using fetch instead of axios here for better SSE support
                // (should probably go back and remove axios altogether)
                const response = await fetch(CONFIG.agentApiEndpoint, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "text/event-stream",
                        "x-agent-id": agent.__id,
                        "x-original-method": "POST",
                        "x-endpoint": `/einstein/ai-agent/v1/sessions/${sessionId}/messages/stream`,
                    },
                    body: JSON.stringify({
                        message,
                        variables,
                    }),
                    signal: controller.signal,
                    credentials: "include",
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(
                        `SSE stream API error: ${response.status} ${response.statusText}`,
                        errorText,
                    );
                    streamController.error(
                        new Error(
                            `API request failed with status ${response.status}: ${errorText}`,
                        ),
                    );
                    return;
                }

                if (!response.body) {
                    streamController.error(
                        new Error("Response body is null for SSE stream"),
                    );
                    return;
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                const parser = createParser({
                    onEvent: (event: EventSourceMessage) => {
                        if (event.data) {
                            try {
                                const parsedData = JSON.parse(event.data);
                                const message = parsedData.message;

                                if (message && message.type) {
                                    const messageType =
                                        message.type as ResponseMessageType;

                                    streamController.enqueue(
                                        message as ResponseMessage,
                                    );

                                    if (
                                        messageType ===
                                            ResponseMessageType.EndOfTurn ||
                                        messageType ===
                                            ResponseMessageType.SessionEnded
                                    ) {
                                        // These messages signify the end of the interaction.
                                        streamController.close();
                                        reader.cancel().catch(() => {
                                            /* Ignore cancel errors if already closing */
                                        });
                                    }
                                } else {
                                    console.warn(
                                        "Received SSE data event without a valid 'type' property:",
                                        parsedData,
                                    );
                                    streamController.error(
                                        new Error(
                                            "Invalid message structure from stream: missing type",
                                        ),
                                    );
                                    reader.cancel().catch(() => {});
                                }
                            } catch (e: any) {
                                console.error(
                                    "Failed to parse SSE data JSON or handle event:",
                                    e,
                                );
                                streamController.error(
                                    new Error(
                                        `SSE data parsing error: ${e.message}`,
                                    ),
                                );
                                reader.cancel().catch(() => {});
                            }
                        }
                    },
                });

                (async () => {
                    try {
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) {
                                parser.feed("");
                                try {
                                    streamController.close();
                                } catch (e) {}
                                break;
                            }
                            const chunk = decoder.decode(value, {
                                stream: true,
                            });
                            parser.feed(chunk);
                        }
                    } catch (error: any) {
                        if (
                            error instanceof DOMException &&
                            error.name === "AbortError"
                        ) {
                            console.debug(
                                "SSE Read loop aborted (likely intentional).",
                            );
                        } else {
                            console.error("Error in SSE read loop:", error);
                            try {
                                streamController.error(error);
                            } catch (e) {}
                        }
                    }
                })();

                controller.signal.addEventListener("abort", () => {
                    reader.cancel().catch(() => {});
                    try {
                        streamController.close();
                    } catch (e) {}
                });
            } catch (error: unknown) {
                console.error("agentApiSendMessageStream setup failed:", error);
                streamController.error(error);
            }
        },
        cancel(reason: string) {
            console.debug(
                "SSE Stream consumption cancelled by consumer:",
                reason,
            );
            if (!controller.signal.aborted) {
                controller.abort();
            }
        },
    });

    // Yield messages from the ReadableStream
    /** @ts-ignore not sure why it thinks this */
    for await (const message of stream) {
        yield message;
    }
}
