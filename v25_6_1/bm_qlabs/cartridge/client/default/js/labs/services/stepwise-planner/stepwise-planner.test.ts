import { afterEach, test, expect, it, vi } from "vitest";

import { parseActionCodeFence, decodeEGPTOutput } from "./utils";
import { StepwisePlanner } from "./index";
import type { ToolAnswerInvocationResult } from "../types";

vi.mock("../../api/openai", () => ({
    chatCompletionRequest: vi.fn(() =>
        Promise.resolve({
            choices: [
                {
                    message: {
                        content: `[THOUGHT] I think the answer is 4
[FINAL ANSWER]
4`,
                    },
                },
            ],
        }),
    ),
}));

vi.mock("../../api/einsteingpt", () => ({
    egptGenerationsRequest: vi.fn(() =>
        Promise.resolve({
            requestId: "123",
            parameters: "",
            generations: [
                {
                    parameters: "",
                    text: `[THOUGHT] I think the answer is 4
[FINAL ANSWER]
4`,
                },
            ],
        }),
    ),
}));

test("parses action code fence", () => {
    const actionCodeFence = `[THOUGHT]
I should use the calculator tool
[ACTION]
{
    "action": "calculator",
    "action_input": "2+2"
}
`;
    const action = parseActionCodeFence(actionCodeFence);
    expect(action.action).toBe("calculator");
    expect(action.action_input).toBe("2+2");
});

test("parses action code fence complex object", () => {
    const actionCodeFence = `[THOUGHT]
I should use the calculator tool
[ACTION]
{
    "action": "calculator",
    "action_input": {
        "expression": "2+2",
        "foo": ["bar", "baz"]
    }
}
`;
    const action = parseActionCodeFence(actionCodeFence);
    expect(action.action).toBe("calculator");
    expect(action.action_input.foo).toEqual(["bar", "baz"]);
});

test("planner execute", async () => {
    const planner = new StepwisePlanner();
    const tool = {
        invoke: (
            context: unknown,
            args: any,
        ): Promise<ToolAnswerInvocationResult> =>
            Promise.resolve({ type: "answer", answer: { result: "4" } }),
        schema: {
            name: "calculator",
            description: "A basic calulator",
            parameters: {
                type: "string",
                description:
                    "The mathematical expression to evaluate; example 2+2",
                name: "expression",
            },
        },
    };
    planner.addTool(tool);

    const planResult = await planner.executePlan("What is 2+2?", {
        siteId: "RefArch",
    });

    expect(planResult.success).toBe(true);
    expect(planResult.finalAnswer).toBe("4");
});

test("throws an error on invalid json", () => {
    const actionCodeFence = `[THOUGHT]
I should use the calculator tool
[ACTION]
{
    "action": "calculator",
    "action_input": {
        "expression": "2+2"
        "foo": "bar"
    }
}`;

    expect(() => parseActionCodeFence(actionCodeFence)).toThrow();
});

test("decodes egpt output", () => {
    const testStr = `[THOUGHT]
To create a promotion, we need to identify the category or product IDs that fall under &quot;workout clothes&quot;. We can use the product.Search function to find these.
[ACTION]
{
  &quot;action&quot;: &quot;product.Search&quot;,
  &quot;action_input&quot;: {&quot;query&quot;: &quot;workout clothes&quot;}
}`;

    const decoded = decodeEGPTOutput(testStr);

    const action = parseActionCodeFence(decoded);
    expect(action.action).toBe("product.Search");
    expect(action.action_input.query).toBe("workout clothes");
});
