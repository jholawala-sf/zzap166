import axios from "axios";
import { CONFIG } from "../config";
import { useGlobalState } from "../state/global";
import type { OpenAIModel } from "./types";

const api = axios.create({
    baseURL: `${CONFIG.aiEndpoint}/`,
});

// report global state error if error
api.interceptors.response.use(
    (response) => {
        if (response) {
            //console.debug(response.data);
        }
        return response;
    },
    (error) => {
        if (error.response) {
            console.error(error.response.data);
        }
        useGlobalState.getState().setError("API Error: Refresh the page");
        throw error;
    },
);

/**
 * Make a request to the BM openAI proxy endpoint
 *
 * @param {string} method
 * @param {string} endpoint
 * @param {object} body
 * @return {Promise<*>}
 */
export async function openAIRequest(method, endpoint, body) {
    const response = await api.post(
        `?_method=${method}&_endpoint=${endpoint}`,
        body,
    );
    return response.data;
}

export interface OpenAIFunctionCall {
    name: string;
    arguments: string;
}

export interface OpenAIFunction {
    name: string;
    description: string;
    parameters: any;
}

// openAI message
export interface OpenAIChatMessage {
    role: "system" | "user" | "assistant" | "function";
    content?: string;
    name?: string;
    function_call?: OpenAIFunctionCall;
}

interface ForceFunctionCallParam {
    name: string;
}

export interface OpenAIChatCompletionRequest {
    model: OpenAIModel;
    messages: OpenAIChatMessage[];
    functions?: OpenAIFunction[];
    function_call?: "none" | "auto" | ForceFunctionCallParam;
    temperature?: number;
    top_p?: number;
    n?: number;
    max_tokens?: number;
    stop?: string | string[];
}

export interface LLMUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}

interface ChatCompletionChoice {
    index: number;
    message: OpenAIChatMessage;
    finish_reason: string;
}

export interface ChatCompletionResponse {
    id: string;
    created: number;
    choices: ChatCompletionChoice[];
    usage: LLMUsage;
}

export async function chatCompletionRequest(
    request: OpenAIChatCompletionRequest,
): Promise<ChatCompletionResponse> {
    return openAIRequest("POST", "chat/completions", request);
}
