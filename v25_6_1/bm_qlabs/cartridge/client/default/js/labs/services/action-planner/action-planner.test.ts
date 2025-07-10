import { afterEach, test, expect, it, vi } from "vitest";

import { ActionPlanner } from "./index";
import type { ToolInvocationResult } from "../types";

vi.mock("../../api/einsteingpt", () => ({
    egptGenerationsRequest: vi
        .fn()
        .mockReturnValue(
            Promise.resolve({
                requestId: "123",
                parameters: "",
                generations: [
                    {
                        parameters: "",
                        text: `{
"plan": {
"rationale": "I Should output the answer",
"function": "answer.Output",
"parameters": {
"output": "The answer is 4"
}}}`,
                    },
                ],
            }),
        )
        .mockReturnValueOnce(
            Promise.resolve({
                requestId: "123",
                parameters: "",
                generations: [
                    {
                        parameters: "",
                        text: `{"plan": {
"rationale": "I should use the calculator tool",
"function": "math.Calculate",
"parameters": {
"expression": "2 + 2"
}}}
#END-OF-PLAN`,
                    },
                ],
            }),
        ),
}));

test("planner execute", async () => {
    const planner = new ActionPlanner([]);
    const tool = {
        invoke: (context: object, args: any): Promise<ToolInvocationResult> =>
            Promise.resolve({ type: "answer", answer: { result: "4" } }),
        schema: {
            name: "math.Calculate",
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
    expect(planResult.finalAnswer).toContain("4");
});
