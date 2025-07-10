import axios from "axios";
import { CONFIG } from "../config";
import { useGlobalState } from "../state/global";

export const api = axios.create({
    baseURL: `${CONFIG.componentInfoEndpoint}`,
});

// report global state error if error
api.interceptors.response.use(null, (error) => {
    if (error.response) {
        console.error(error.response.data);
    }
    throw error;
});

interface ComponentInfoResponse {
    // object of any comp
    components: Record<string, any>;
}

export async function getComponentInfo(
    componentTypeIds: string[],
): Promise<ComponentInfoResponse> {
    const resp = await api.post("", {
        componentTypeIds,
    });

    return resp.data;
}
