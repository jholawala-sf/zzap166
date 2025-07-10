import type { Tool } from "../types";
import { decode } from "html-entities";

// This isn't a real tool; it's just used for the planner to communicate the final answer
export const OUTPUT_TOOL_NAME = "answer.Output";

/**
 * Generate a system prompt that includes the stringified tool descriptions
 * @param tools
 * @param context JSON context
 * @param pastSummary string representation of the past conversation (i.e. chat messages or summary)
 */
export function generateSystemPrompt(
    tools: Tool[],
    context: any = {},
    pastSummary = "",
): string {
    const toolList = tools.map((tool) => {
        return `${tool.schema.name}: ${
            tool.schema.description
        }, parameters: ${JSON.stringify(tool.schema.parameters || {})}`;
    });

    return `A planner takes a list of functions, a goal, and chooses which function to use using a single JSON blob.
For each function the list includes details about the input parameters. The planner will only response with a single JSON blob plan including a rationale, function and function parameters.
Final answer for the goal should be communicated with a plan using the ${OUTPUT_TOOL_NAME} function. Respond with only 1 plan at a time.

[START OF EXAMPLES]

[EXAMPLE]
- List of functions:
functions.Find: list more functions related to the goal, parameters: {"type":"object", "properties": {"functionGroup": {"type":"string", "description": "category or group of functions to select", "enum": ["product related", "promotion related", "technical related"]}}, "required": ["functionGroup"]}
FileIO.WriteAsync: Create a file, parameters: {"type":"object", "properties": {"path": {"type":"string", "description": "The filename"}, "content": {"type": "string", "description": "file content"}}, "required": ["path"]}
- End list of functions.
Goal: show me the details of product 1234
{"plan":{
"rationale": "the list allows finding more functions by a group name",
"function": "functions.Find",
"parameters": {
"functionGroup": "product related"
}}}

[EXAMPLE]
- List of functions:
${OUTPUT_TOOL_NAME}: Use to answer the goal with a final answer or when no other defined functions are appropriate, parameters: {"type":"object", "properties": {"output": {"type":"string", "description": "The answer or response to the goal"}}, "required": ["output"]}
FileIO.WriteAsync: Create a file, parameters: {"type":"object", "properties": {"path": {"type":"string", "description": "The filename"}, "content": {"type": "string", "description": "file content"}}, "required": ["path"]}
- End list of functions.
Goal: create a file called "something.txt".
{"plan":{
"rationale": "the list contains a function that allows to create files",
"function": "FileIO.WriteAsync",
"parameters": {
"path": "something.txt",
"content": null
}}}
Result:
{"success": true,
"result": {
"filename": "something.txt",
"message": "file created"
}}
{"plan":{
"rationale": "the function was called successfully with the file named something.txt being created",
"function": "${OUTPUT_TOOL_NAME}",
"parameters": {
"output": "File something.txt created successfully."
}}}
#END-OF-PLAN

[EXAMPLE]
- List of functions:
${OUTPUT_TOOL_NAME}: Use to answer the goal with a final answer or when no other defined functions are appropriate, parameters: {"type":"object", "properties": {"output": {"type":"string", "description": "The answer or response to the goal"}}, "required": ["output"]}
time.Get: get the current time, parameters: {"type":"object", "properties": {}}
FileIO.WriteAsync: Create a file, parameters: {"type":"object", "properties": {"path": {"type":"string", "description": "The filename"}, "content": {"type": "string", "description": "file content"}}, "required": ["path"]}
- End list of functions.
Goal: tell me a joke.
{"plan":{
"rationale": "the list does not contain functions to tell jokes or something funny",
"function": "${OUTPUT_TOOL_NAME}",
"parameters": {
"output": "Why don't scientists trust atoms?\\n\\nBecause they make up everything!"
}}}
#END-OF-PLAN

[END OF EXAMPLES]
[REAL SCENARIO STARTS HERE]
- List of functions:
${toolList.join("\n")}
- End list of functions.
${pastSummary ? `Most recent conversation:\n${pastSummary}\n` : ""}`;
}

export function decodeEGPTOutput(str): string {
    return decode(str);
}
