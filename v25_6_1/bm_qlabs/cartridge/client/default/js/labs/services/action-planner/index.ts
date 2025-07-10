import {
    generateSystemPrompt,
    decodeEGPTOutput,
    OUTPUT_TOOL_NAME,
} from "./utils";
import type {
    Planner,
    PlannerOptions,
    PlanResult,
    PlanStep,
    Tool,
} from "../types";
import type { EGPTGenerationsResponse } from "../../api/einsteingpt";
import { egptGenerationsRequest } from "../../api/einsteingpt";
import { sleep } from "../../utils";

interface ActionResponse {
    plan: {
        rationale: string;
        function: string;
        parameters: {
            [key: string]: any;
        };
    };
}

/**
 *
 */
export class ActionPlanner implements Planner {
    tools: Tool[];
    maxIterations: number;
    private pastSummary: string;

    constructor(tools: Tool[] = [], options: PlannerOptions = {}) {
        const { maxIterations = 4, pastPlanResults = [] } = options;
        this.tools = tools;
        this.maxIterations = maxIterations;
        // summarize the last 4 plan results as a simple chat back and forth
        this.pastSummary = pastPlanResults
            .slice(Math.max(pastPlanResults.length - 4, 0))
            .map((result) => {
                return `User: ${result.question}\nPlanner:${result.finalAnswer}`;
            })
            .join("\n");
    }

    addTool(tool: Tool) {
        this.tools.push(tool);
    }

    async executePlan(
        question: string,
        context: object = {},
    ): Promise<PlanResult> {
        const messages: EGPTGenerationsResponse[] = [];
        const planSteps: PlanStep[] = [];
        console.groupCollapsed(`[ACTION PLANNER] Starting plan execution`);
        console.log(
            JSON.stringify(
                {
                    question,
                    context,
                },
                null,
                2,
            ),
        );
        console.groupEnd();

        const systemPrompt = generateSystemPrompt(
            this.tools,
            context,
            this.pastSummary,
        );
        var prompt = `${systemPrompt}
Goal: ${question}\n`;

        var errors = 0;
        for (let i = 0; i < this.maxIterations; i++) {
            console.groupCollapsed(`[ACTION PLANNER] [REQ] Send AI request`);
            console.log(prompt);
            console.groupEnd();
            // TODO replace this with QLabs feature name
            const resp = await egptGenerationsRequest(
                prompt,
                "gpt-4",
                "ProductDescription",
            );
            messages.push(resp);
            var content = decodeEGPTOutput(resp.generations[0].text) ?? "";

            // remove "#END-OF-PLAN" from content
            content = content.replace("#END-OF-PLAN", "");
            var actionResponse;
            try {
                actionResponse = JSON.parse(content);
            } catch (e) {
                if (errors > 1) {
                    throw new Error(`Failed to parse JSON: ${content}`);
                }
                errors++;
                console.warn(
                    `[ACTION PLANNER] [ERROR] Failed to parse JSON: ${content}`,
                );
                // not including content here as the repetitive error causes parroting and
                // not useful self correction
                continue;
            }

            if (actionResponse.plan?.function === OUTPUT_TOOL_NAME) {
                console.groupCollapsed(`[ACTION PLANNER] [FINAL ANSWER] found`);
                console.log(actionResponse);
                console.groupEnd();

                return {
                    question,
                    success: true,
                    messages,
                    finalAnswer: actionResponse.plan.parameters.output,
                    steps: planSteps,
                };
            }

            var thought = actionResponse.plan?.rationale;
            if (thought) {
                console.groupCollapsed(`[ACTION PLANNER] [THOUGHT]`);
                console.log(thought);
                console.groupEnd();
            } else {
                // TODO this really should be an error
                thought = "";
            }

            const action = actionResponse.plan?.function;
            const actionInput = actionResponse.plan?.parameters;

            console.groupCollapsed(`[ACTION PLANNER] [ACTION] ${action} Input`);
            console.log(actionInput);
            console.groupEnd();

            const tool = this.tools.find((tool) => tool.schema.name === action);

            // allow retry for invalid action request
            // this is critical for 3.5-like models as they frequently miss the action output
            // step or other calling requirements
            if (!tool && errors > 1) {
                throw new Error(`Tool ${action} not found`);
            } else if (!action) {
                errors++;
                console.warn(`[ACTION PLANNER] [ERROR] function not specified`);
                prompt += `\n${content}\nERROR: function not specified. try again.\n`;
                continue;
            } else if (!tool) {
                errors++;
                console.warn(
                    `[ACTION PLANNER] [ERROR] function ${action} not found`,
                );
                prompt += `\n${content}\nERROR: function ${action} not found. try again.\n`;
                continue;
            }

            // TODO also check JSON schema

            // TODO tools should be able to return a new planner instance
            // or confirmation, or something else
            const actionOutput = await tool.invoke({}, actionInput);
            console.groupCollapsed(
                `[ACTION PLANNER] [ACTION] ${action} Output`,
            );
            console.log(actionOutput);
            console.groupEnd();

            if (actionOutput.type === "plan") {
                console.groupCollapsed(
                    `[ACTION PLANNER] [PLAN] Defer to Planner ${actionOutput.nextPlan.plannerName}`,
                );
                console.log(actionOutput);
                console.groupEnd();
                planSteps.push({
                    thought,
                    action,
                    actionInput,
                    actionOutput: actionOutput.nextPlan,
                });
                return {
                    question,
                    success: true,
                    messages,
                    steps: planSteps,
                    nextPlan: actionOutput.nextPlan,
                };
            } else if (actionOutput.type === "answer") {
                // append to the prompt as a scratchpad
                prompt += JSON.stringify(
                    {
                        plan: {
                            rationale: thought,
                            function: action,
                            parameters: actionInput,
                        },
                    },
                    null,
                    2,
                );
                prompt += "\nResult:\n";
                prompt += JSON.stringify(actionOutput.answer, null, 2);

                planSteps.push({
                    thought,
                    action,
                    actionInput,
                    actionOutput: actionOutput.answer,
                });

                console.debug(
                    "Sleeping for 1.0 seconds to avoid rate limiting",
                );
                await sleep(1000);
            } else {
                throw new Error(
                    `Action error: ${JSON.stringify(actionOutput.error, null, 2)}`,
                );
            }
        }

        // TODO reached max iterations; this should be an error
        return {
            question,
            success: false,
            messages,
            steps: planSteps,
            finalAnswer:
                "I'm sorry, I don't know how to answer that question with the information given.",
        };
    }
}
