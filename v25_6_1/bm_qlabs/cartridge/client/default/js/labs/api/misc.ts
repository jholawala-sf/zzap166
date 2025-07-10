import axios from "axios";
import { CONFIG } from "../config";
import { useGlobalState } from "../state/global";

export const api = axios.create({
    baseURL: CONFIG.miscEndpoint,
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

interface StorefrontLinkResponse {
    url: string;
}

export async function getStorefrontLink(
    pid,
    siteId,
    locale,
): Promise<StorefrontLinkResponse> {
    const response = await api.post(`?_endpoint=getStorefrontLink`, {
        pid,
        siteId,
        locale,
    });
    return response.data;
}

export interface ShippingMethod {
    ID: string;
    displayName: string;
    description: string;
}
export interface ShippingMethodsResponse {
    shippingMethods: ShippingMethod[];
}
export async function getShippingMethods(): Promise<ShippingMethodsResponse> {
    const response = await api.post(`?_endpoint=getShippingMethods`, {});
    return response.data;
}
