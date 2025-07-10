import { CONFIG } from "../config";
import { useMutation } from "@tanstack/react-query";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { uuid4 } from "../utils";
import type { Agent } from "./agents";
import { useEffect, useState } from "react";

async function getAccessToken(agent: Agent) {
    if (agent.userVerification) {
        // TODO move this out
        const userVerificationUrl = CONFIG.userVerificationUrl;
        const userResp = await fetch(userVerificationUrl, {
            method: "GET",
            credentials: "include",
        });
        const userData = await userResp.json();
        const userJwt = userData.jwt;

        return authenticateWithJwt(agent, userJwt);
    }
    return authenticateGuest(agent);
}

async function authenticateWithJwt(agent: Agent, userJwt: string) {
    const resp = await fetch(
        `${agent.messagingUrl}/iamessage/api/v2/authorization/authenticated/access-token`,
        {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                orgId: agent.orgId,
                esDeveloperName: agent.esDeveloperName,
                capabilitiesVersion: "1",
                platform: "Web",
                context: {
                    appName: "QLabs",
                    clientVersion: "0.0.1",
                },
                authorizationType: "JWT",
                customerIdentityToken: userJwt,
            }),
        },
    );
    const data = await resp.json();
    if (!resp.ok) {
        throw new Error("Failed to authenticate with JWT: " + data.message);
    }
    return data.accessToken;
}

async function authenticateGuest(agent: Agent) {
    const resp = await fetch(
        `${agent.messagingUrl}/iamessage/api/v2/authorization/unauthenticated/access-token`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                orgId: agent.orgId,
                esDeveloperName: agent.esDeveloperName,
                capabilitiesVersion: "1",
                platform: "Web",
                context: {
                    appName: "QLabs",
                    clientVersion: "0.0.1",
                },
            }),
        },
    );
    const data = await resp.json();
    if (!resp.ok) {
        throw new Error("Failed to authenticate with guest: " + data.message);
    }
    return data.accessToken;
}

export function useCreateConversation(agent: Agent) {
    const createConversation = useMutation({
        mutationFn: async (accessToken) => {
            const conversationId = uuid4();
            await fetch(`${agent.messagingUrl}/iamessage/api/v2/conversation`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    conversationId,
                    esDeveloperName: agent.esDeveloperName,
                }),
            });
            return { conversationId };
        },
    });

    return { createConversation };
}

export function useMessages(agent: Agent, jwt: string, conversationId: string) {
    const [messages, setMessages] = useState([]);

    const sendMessage = useMutation({
        mutationFn: async (messageText: string) => {
            const messageUUID = uuid4();
            const resp = await fetch(
                `${agent.messagingUrl}/iamessage/api/v2/conversation/${conversationId}/message`,
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        message: {
                            id: messageUUID,
                            messageType: "StaticContentMessage",
                            staticContent: {
                                formatType: "Text",
                                text: messageText,
                            },
                        },
                        esDeveloperName: agent.esDeveloperName,
                    }),
                },
            );
            return resp.json();
        },
    });

    useEffect(() => {
        if (!jwt || !conversationId) return;

        const connectToEventSource = async () => {
            await fetchEventSource(`${agent.messagingUrl}/eventrouter/v1/sse`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "X-Org-Id": agent.orgId,
                    //"Last-Event-ID": lastEventId,
                },
                onmessage(ev) {
                    try {
                        const jsonData = JSON.parse(ev.data);
                        if (jsonData.conversationEntry?.entryPayload) {
                            jsonData.conversationEntry.entryPayload =
                                JSON.parse(
                                    jsonData.conversationEntry.entryPayload,
                                );
                        }
                        const message = {
                            event: ev.event ?? "OTHER",
                            data: jsonData,
                        };
                        setMessages((msgs) => [...msgs, message]);
                    } catch (e) {
                        /* ignore */
                    }
                },
            });
        };

        connectToEventSource();
    }, [jwt, conversationId]);

    return { messages, sendMessage };
}

export function useMIAWChatSession(agent: Agent) {
    const { createConversation } = useCreateConversation(agent);
    const [conversationId, setConversationId] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string>(null);

    const { messages, sendMessage } = useMessages(
        agent,
        accessToken,
        conversationId,
    );

    const startConversation = async () => {
        try {
            const accessToken = await getAccessToken(agent);
            setAccessToken(accessToken);
            const result = await createConversation.mutateAsync(accessToken);
            setConversationId(result.conversationId);
            setIsLoading(false);
        } catch (e) {
            setError(e.message);
            setIsLoading(false);
        }
    };

    return {
        isLoading: isLoading,
        error: error,
        isAuthenticated: !!accessToken,
        conversationId,
        messages,
        jwt: accessToken,
        sendMessage,
        startConversation,
    };
}
