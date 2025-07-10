import axios from "axios";
import { CONFIG } from "../config";
import { useGlobalState } from "../state/global";

export const api = axios.create({
    baseURL: CONFIG.mrtEndpoint,
});

// report global state error if error
api.interceptors.response.use(null, (error) => {
    if (error.response) {
        console.error(error.response.data);
    }
    if (error.response.status !== 404) {
        // 404s are expected for some requests; let them pass through to be handled in app
        useGlobalState.getState().setError("API Error: Refresh the page");
    }
    throw error;
});
