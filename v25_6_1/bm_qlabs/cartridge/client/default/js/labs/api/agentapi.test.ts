import {
    afterAll,
    afterEach,
    beforeAll,
    beforeEach,
    describe,
    expect,
    it,
    vi,
} from "vitest";

import { HttpResponse, http } from "msw";
import type { InformMessage } from "./agentapi";
import {
    RequestMessageType,
    agentApiCreateSession,
    agentApiSendMessage,
} from "./agentapi";

import type { Agent } from "@qlabs/state/agents";
import { setupServer } from "msw/node";
import type { Referenceable } from "./data";

const server = setupServer(
    http.post(/.*AgentApiRequest.*/, ({ request, params, cookies }) => {
        if (request.headers.get("x-endpoint")?.endsWith("sessions")) {
            return HttpResponse.json({
                sessionId: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
                messages: [
                    {
                        type: "Inform",
                        message: "INITIAL_MESSAGE",
                    },
                ],
            });
        } else if (request.headers.get("x-endpoint")?.endsWith("messages")) {
            return HttpResponse.json({
                messages: [
                    {
                        type: "Inform",
                        message: `FIRST_MESSAGE`,
                    },
                ],
            });
        }
    }),
);

/* @ts-ignore */
const TEST_AGENT: Referenceable<Agent> = {
    __id: "1234",
    __typeId: "agent",
    name: "Test Agent",
    enableMocking: false,
    endpoint: "https://api.example.com",
};
/* @ts-ignore */
const MOCKING_AGENT: Referenceable<Agent> = {
    __id: "1234",
    __typeId: "agent",
    name: "Test Agent",
    enableMocking: true,
    endpoint: "https://api.example.com",
    mockResponse: `[
        {
            type: "Inform",
            message: "Hello world!",
        },
        {
            type: "Inform",
            message: "MESSAGE_1",
        },
        (message) => {
            return {
                type: "Inform",
                message: message.text.toUpperCase()
            }
        }
    ]`,
};

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
});

// Reset handlers after each test (important for test isolation)
afterEach(() => {
    server.resetHandlers();
    vi.useRealTimers();
});

// Close server after all tests
afterAll(() => server.close());

describe("agentapi", () => {
    it("creates a session", async () => {
        const session = await agentApiCreateSession(TEST_AGENT);
        expect(session).toBeDefined();
        expect(session.sessionId).toBeDefined();
    });

    it("responds to messages", async () => {
        const resp = await agentApiSendMessage(
            TEST_AGENT,
            "1234-1234-1234-134",
            {
                type: RequestMessageType.Text,
                text: "Testing",
                sequenceId: 1,
            },
        );
        expect(resp).toBeDefined();
        expect((resp.messages[0] as InformMessage).message).toBe(
            "FIRST_MESSAGE",
        );
    });
});
