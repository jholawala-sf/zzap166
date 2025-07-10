import type { PlanStep, Tool } from "../types";
import type { ActionResponse } from "./types";
import { decode } from "html-entities";

export const SCRATCH_PAD_PREFIX = `This was my previous work (but they haven't seen any of it! They only see what I return as final answer):`;

/**
 * Generate a system prompt that includes the stringified tool descriptions
 * @param tools
 */
export function generateSystemPrompt(
    tools: Tool[],
    context: any = {},
    pastSummary?: string,
    preamble?: string,
    postamble?: string,
) {
    const toolList = tools.map((tool) => {
        return `${tool.schema.name}: ${
            tool.schema.description
        }, parameters: ${JSON.stringify(tool.schema.parameters || {})}`;
    });

    return `[INSTRUCTION]
Answer the following questions as accurately as possible using the provided functions.
${preamble ? preamble + "\n" : ""}
[AVAILABLE FUNCTIONS]
The function definitions below are in the following format. The tool parameters are specified in JSON schema format:
<functionName>: <description>, parameters: {"type":"object", "properties": {"<parameterName>": {"type":"string", "description": "<parameterDescription>"}, ...}}

${toolList.join("\n")}
[END AVAILABLE FUNCTIONS]

[USAGE INSTRUCTIONS]
To use the functions, specify a JSON blob representing an action. The JSON blob should contain an "action" key with the name of the function to use, and an "action_input" key with a JSON object matching the JSON schema to use when calling the function.
Do not call functions directly; they must be invoked through an action.
Keys in the "action_input" value should match the defined parameters of the named "action" in [AVAILABLE FUNCTIONS].
Dictionary values in "action_input" must be strings and represent the actual values to be passed to the function.
Ensure that the $JSON_BLOB contains only a SINGLE action; do NOT return multiple actions. Only one [ACTION] should be specified at a time.
IMPORTANT: Use only the available functions listed in the [AVAILABLE FUNCTIONS] section. Do not attempt to use any other functions that are not specified.

Here is an example of a valid $JSON_BLOB:
{
  "action": "functionName",
  "action_input": {"parameterName": "some value", ...}
}
[END USAGE INSTRUCTIONS]
[END INSTRUCTION]

[THOUGHT PROCESS]
[QUESTION]
the input question I must answer
[THOUGHT]
To solve this problem, I should carefully analyze the given question and identify the necessary steps. Any facts I discover earlier in my thought process should be repeated here to keep them readily available.
[ACTION]
{
  "action": "functionName",
  "action_input": {"parameterName": "some value", ...}
}
[OBSERVATION]
The result of the action will be provided here. Only the user will provide the observation. I will not provide any observations only a single action or final answer.
... (These Thought/Action/Observation can repeat until the final answer is reached.)
[FINAL ANSWER]
Once I have gathered all the necessary observations and performed any required actions, I can provide the final answer in a clear and human-readable format.
[END THOUGHT PROCESS]

User context:
${JSON.stringify(context, null, 2)}
${pastSummary ? `Most recent conversation:\n${pastSummary}\n` : ""}\`;

Let's break down the problem step by step and think about the best approach. Questions and observations should be followed by a single thought and an optional single action to take. If no further actions are required output the [FINAL ANSWER].
${postamble ? postamble + "\n" : ""}

Begin!
`;
}

/**
 * Parse the action code fence from the LLM response
 * @param str
 */
export function parseActionCodeFence(str): ActionResponse {
    const regex = /\[ACTION\].*/gs;
    const match = str.match(regex);

    if (match) {
        const jsonString = match[0].replace(/\[ACTION\]\n?/gi, "");
        // if [OBSERVATION] is in the string remove it and everything after
        const observationIndex = jsonString.indexOf("[OBSERVATION]");

        // ```json code fence preamable is in the string remove it, and also remove the the trailing ```
        jsonString.replace(/```json/g, "");
        jsonString.replace(/```/g, "");

        if (observationIndex > -1) {
            return JSON.parse(jsonString.substring(0, observationIndex));
        }
        return JSON.parse(jsonString);
    } else {
        // TODO throw a more specific error
        throw new Error("No action fence found.");
    }
}

export function parseFinalAnswer(str): string | null {
    const regex = /\[FINAL ANSWER\].*/gs;
    const match = str.match(regex);

    if (match) {
        const finalAnswer = match[0].replace(/\[FINAL ANSWER\]\n?/gi, "");
        return finalAnswer;
    }

    return null;
}

export function generateAgentScratchPad(steps: PlanStep[]): string {
    // TODO this screws up the linter if reformatted, fix
    return `${SCRATCH_PAD_PREFIX}
        ${steps
            .map((step) => {
                return `[THOUGHT]
${step.thought}
[ACTION]
{"action": "${step.action}", "action_input": ${JSON.stringify(step.actionInput)}}
[OBSERVATION]
Action ${step.action} result:
 ${JSON.stringify(step.actionOutput, null, 2)}`;
            })
            .join("\n")}`;
}

export function parseThought(str): string | null {
    const regex = /\[THOUGHT\].*/gs;
    const match = str.match(regex);

    if (match) {
        const thoughtStartIndex = str.indexOf("[THOUGHT]") + "[THOUGHT]".length;
        const finalAnswerStartIndex = str.indexOf("[FINAL ANSWER]");
        const actionStartIndex = str.indexOf("[ACTION]");

        if (finalAnswerStartIndex > -1) {
            return str
                .substring(thoughtStartIndex, finalAnswerStartIndex)
                .trim();
        } else if (actionStartIndex > -1) {
            return str.substring(thoughtStartIndex, actionStartIndex).trim();
        }
    }

    return null;
}

export function decodeEGPTOutput(str): string {
    return decode(str);
}
