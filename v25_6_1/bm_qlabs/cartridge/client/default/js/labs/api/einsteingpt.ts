import axios from "axios";
import { CONFIG } from "../config";
import { useGlobalState } from "../state/global";

export const api = axios.create({
    baseURL: `${CONFIG.egptEndpoint}`,
});

api.interceptors.request.use((config) => {
    const originalUri = config.url;
    config.headers["x-original-method"] = config.method;
    config.headers["x-endpoint"] = originalUri;
    config.method = "post";
    config.url = "";
    return config;
});

// report global state error if error
api.interceptors.response.use(null, (error) => {
    if (error.response) {
        console.error(error.response.data);
    }
    if (error.response && error.response.status !== 404) {
        // 404s are expected for some requests; let them pass through to be handled in app
        useGlobalState.getState().setError("API Error: Refresh the page");
    }
    throw error;
});

export interface EPTGeneration {
    text: string;
    parameters: string | null;
}

export interface EGPTGenerationsResponse {
    requestId: string;
    generations: EPTGeneration[];
    parameters: string | null;
}

export async function egptGenerationsRequest(
    prompt: string,
    model = "llmgateway__OpenAIGPT4Omni",
    applicationName = "ECOMQLabs",
): Promise<EGPTGenerationsResponse> {
    const resp = await api.post("prompt/generations", {
        promptTextorId: prompt,
        provider: "OpenAI",
        additionalConfig: {
            applicationName: applicationName,
            model: model,
            enablePiiMasking: false,
            // TODO: figure this out
            maxTokens: model === "gpt-4" ? 3500 : 2000,
        },
    });

    return resp.data;
}
