import { CONFIG } from "../config";

import type { OpenAIChatMessage, LLMUsage } from "../api/openai";
import { REGISTRY } from "../services/tools";
import queryClient from "../query-client.ts";
import { useQuery } from "@tanstack/react-query";
import type { DataStoreObject } from "../api/data";
import {
    deleteObject,
    getObject,
    postObject,
    putObject,
    searchObjects,
} from "../api/data";
import type { Planner, PlanResult, Tool } from "../services/types";

/**
 * Chat session message is a wrapper around system/assistant/user messages to OpenAI
 */
export interface ChatSessionMessage {
    __type: "message";
    message: OpenAIChatMessage;
    inbound: boolean;
    date: number;
    username: string;
    planResult?: PlanResult | PlanResult[];
    omit?: boolean;
    model?: string;
    cost?: LLMUsage;
}

interface ChatSessionEvent {
    __type: "event";
}

type ChatSessionMessageOrEvent = ChatSessionMessage | ChatSessionEvent;

export const isChatSessionMessage = (
    m: ChatSessionMessage | ChatSessionEvent,
): m is ChatSessionMessage => !m.__type || m.__type === "message";

export const isAIChatSessionMessage = (
    m: ChatSessionMessage | ChatSessionEvent,
): m is ChatSessionMessage => isChatSessionMessage(m) && !m.inbound;

export interface ChatSession {
    messages?: Array<ChatSessionMessageOrEvent>;
    currentTool?: string;
}

export const chatSessionsQuery = () => ({
    queryKey: ["chatSessions", "__list__"],
    queryFn: async (): Promise<DataStoreObject<ChatSession>[]> =>
        (await searchObjects<ChatSession>("chatSessions")).data,
});

export function useChatSessions() {
    return useQuery(chatSessionsQuery());
}

export const chatSessionQuery = (sessionId) => ({
    queryKey: ["chatSessions", sessionId],
    queryFn: async (): Promise<DataStoreObject<ChatSession>> =>
        await getObject(sessionId),
});

export const useChatSession = (sessionId: string) => {
    return useQuery<DataStoreObject<ChatSession>>({
        ...chatSessionQuery(sessionId),
        select: (obj): DataStoreObject<ChatSession> => ({
            ...obj,
            data: {
                ...obj.data,
                messages:
                    obj.data.messages
                        ?.filter((ev) => ev.__type === "message")
                        .filter(
                            (message: ChatSessionMessage) =>
                                message.message?.content &&
                                ["user", "assistant"].includes(
                                    message.message.role,
                                ),
                        ) || [],
            },
        }),
    });
};

export const createChatSessionMutation = () => ({
    mutationFn: async (): Promise<void> => {
        await postObject("chatSessions", {
            messages: [],
            currentTool: null,
        });
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["chatSessions"] });
    },
});

export const deleteChatSessionMutation = () => ({
    mutationFn: async (obj: DataStoreObject<ChatSession>): Promise<void> =>
        await deleteObject(obj),
    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["chatSessions", "__list__"],
        });
    },
});

export const sendMessageMutation = (
    sessionId: string,
    systemPrompt: string,
    context: Record<string, unknown> = {},
) => {
    return {
        mutationFn: async (message: string): Promise<void> => {
            const sessionObj = queryClient.getQueryData<
                DataStoreObject<ChatSession>
            >(["chatSessions", sessionId]);
            if (!sessionObj) {
                throw new Error("Session not found");
            }
            const session = sessionObj.data;
            const messages = session.messages || [];

            const pastPlanResults = messages
                .filter(isAIChatSessionMessage)
                .filter((m) => !!m.planResult)
                .map((m) =>
                    Array.isArray(m.planResult)
                        ? m.planResult[m.planResult.length - 1]
                        : m.planResult,
                ) as PlanResult[];
            const planResults: PlanResult[] = [];
            var tools: Tool[] = [
                REGISTRY.tools["functions.SelectGroup"],
                REGISTRY.tools["math.Calculate"],
                REGISTRY.tools["weather.Get"],
            ];
            var plannerOptions = {};
            var plannerName = "planners.Action.Default";
            for (var i = 0; i < 5; i++) {
                const agent: Planner = new REGISTRY.planners[plannerName](
                    tools,
                    Object.assign(
                        {},
                        {
                            pastPlanResults,
                        },
                        plannerOptions,
                    ),
                );
                const planResult = await agent.executePlan(message, context);
                planResult.plannerName = plannerName;
                planResults.push(planResult);

                if (planResult.nextPlan) {
                    plannerName = planResult.nextPlan.plannerName;
                    tools = planResult.nextPlan.toolNames
                        .map((toolName) => {
                            return REGISTRY.tools[toolName];
                        })
                        .filter(Boolean);
                    plannerOptions = planResult.nextPlan.plannerOptions || {};
                } else {
                    break;
                }
            }

            const lastPlanResult = planResults[planResults.length - 1];
            messages.push({
                __type: "message",
                // TODO this is should now be part of the plan result
                model: "llmgateway__OpenAIGPT4Omni",
                message: {
                    role: "assistant",
                    // TODO better interface here
                    content: lastPlanResult.finalAnswer ?? "Error",
                },
                inbound: false,
                date: Date.now(),
                username: planResults[planResults.length - 1].success
                    ? "AI"
                    : "Q-Labs",
                planResult: planResults,
            });

            await putObject({
                ...sessionObj,
                data: {
                    ...session,
                    messages,
                },
            });
        },

        onMutate: async (message: string) => {
            await queryClient.cancelQueries({
                queryKey: ["chatSessions", sessionId],
            });

            const previousSessionObj = queryClient.getQueryData<
                DataStoreObject<ChatSession>
            >(["chatSessions", sessionId]);
            const previousSession = previousSessionObj?.data;
            const messages = previousSession?.messages || [];

            const newMessage: ChatSessionMessage = {
                __type: "message",
                message: {
                    content: message,
                    role: "user",
                },
                inbound: true,
                date: Date.now(),
                username: CONFIG.username,
            };
            // LOG
            console.groupCollapsed(
                `[CHAT:${sessionId}] [USER] Setting user message`,
            );
            console.dir(newMessage.message);
            console.groupEnd();
            messages.push(newMessage);

            // Optimistically update to the new value
            queryClient.setQueryData(
                ["chatSessions", sessionId],
                (session: any) => {
                    return {
                        ...session,
                        messages,
                    };
                },
            );

            // Return a context object with the snapshotted value
            return { previousSessionObj, newMessage };
        },
        onError: async (err, newSession, context) => {
            console.error(err);
            const sessionObj = context.previousSessionObj;
            const session = sessionObj.data;
            const messages = session.messages || [];
            messages.push({
                __type: "message",
                message: {
                    content:
                        "An error has occured:\n\n```\n" +
                        err.message +
                        "\n```",
                    role: "assistant",
                },
                date: Date.now(),
                inbound: false,
                username: "Q-Labs",
            });
            await putObject({
                ...sessionObj,
                data: {
                    ...session,
                    messages,
                },
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["chatSessions", sessionId],
            });
        },
        retry: 0,
    };
};
