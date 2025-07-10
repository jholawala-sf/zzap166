import {
    generateAgentScratchPad,
    generateSystemPrompt,
    parseActionCodeFence,
    parseFinalAnswer,
    parseThought,
    decodeEGPTOutput,
} from "./utils";
import type { PlannerOptions, PlanResult, PlanStep, Tool } from "../types";
import type { EGPTGenerationsResponse } from "../../api/einsteingpt";
import { egptGenerationsRequest } from "../../api/einsteingpt";
import { sleep } from "../../utils";
import type { Planner } from "../types";

/**
 * Represents a ReAct planning interface for a chat LLM API
 *
 * Tools can be added to the planner. If at least 1 tool group is added, the planner will
 * make available a tool selection tool and expose the tools on-demand.
 */
export class StepwisePlanner implements Planner {
    tools: Tool[];
    maxIterations: number;
    private pastSummary: string;
    private postamble: string;
    private preamble: string;

    constructor(tools: Tool[] = [], options: PlannerOptions = {}) {
        const { maxIterations = 9, pastPlanResults = [] } = options;
        this.tools = tools;
        this.maxIterations = maxIterations;
        this.pastSummary = pastPlanResults
            .slice(Math.max(pastPlanResults.length - 4, 0))
            .map((result) => {
                return `User: ${result.question}\nPlanner:${result.finalAnswer}`;
            })
            .join("\n");
        this.postamble = options.postamble ?? "";
        this.preamble = options.preamble ?? "";
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
        console.groupCollapsed(`[STEPWISE PLANNER] Starting plan execution`);
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
            this.preamble,
            this.postamble,
        );

        for (let i = 0; i < this.maxIterations; i++) {
            var userPrompt = `${systemPrompt}
[QUESTION]
${question}\n\n`;
            if (planSteps.length > 0) {
                const agentScratchPad = generateAgentScratchPad(planSteps);
                userPrompt += `${agentScratchPad}\n\ncontinue`;
            }

            console.groupCollapsed(`[STEPWISE PLANNER] [REQ] Send AI request`);
            console.log(userPrompt);
            console.groupEnd();
            // TODO replace this with QLabs feature name
            const resp = await egptGenerationsRequest(
                userPrompt,
                "llmgateway__OpenAIGPT4Omni",
            );
            messages.push(resp);
            var content = decodeEGPTOutput(resp.generations[0].text) ?? "";

            // parse for any final answer first
            const finalAnswer = parseFinalAnswer(content);

            if (finalAnswer) {
                console.groupCollapsed(
                    `[STEPWISE PLANNER] [FINAL ANSWER] found`,
                );
                console.log(finalAnswer);
                console.groupEnd();

                return {
                    question,
                    success: true,
                    messages,
                    finalAnswer,
                    steps: planSteps,
                };
            }

            var thought = parseThought(content);
            if (thought) {
                console.groupCollapsed(`[STEPWISE PLANNER] [THOUGHT]`);
                console.log(thought);
                console.groupEnd();
            } else {
                // TODO this really should be an error
                thought = "";
            }

            // TODO handle Syntax and Code Fence errors and allow correction
            const actionResponse = parseActionCodeFence(content);
            const action = actionResponse.action;
            const actionInput = actionResponse.action_input;

            console.groupCollapsed(
                `[STEPWISE PLANNER] [ACTION] ${action} Input`,
            );
            console.log(actionInput);
            console.groupEnd();

            const tool = this.tools.find((tool) => tool.schema.name === action);
            if (!tool) {
                throw new Error(`Tool ${action} not found`);
            }

            const invocationResult = await tool.invoke({}, actionInput);
            console.groupCollapsed(
                `[STEPWISE PLANNER] [ACTION] ${action} Output`,
            );
            console.log(invocationResult);
            console.groupEnd();

            if (invocationResult.type === "answer") {
                planSteps.push({
                    thought,
                    action,
                    actionInput,
                    actionOutput: invocationResult.answer,
                });
            } else if (invocationResult.type === "plan") {
                throw new Error("Nested stepwise plans not supported");
            } else if (invocationResult.type === "error") {
                throw new Error(
                    `Error executing action: ${JSON.stringify(invocationResult.error, null, 2)}`,
                );
            }

            console.debug("Sleeping for 1.0 seconds to avoid rate limiting");
            await sleep(1000);
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
