import axios from "axios";
import { APP_SETTINGS, CONFIG } from "../config";

const CLIENT_ID = CONFIG.clientId;

export const api = axios.create({
    baseURL: `/s/${CONFIG.currentSite}/dw/shop/${APP_SETTINGS.OCAPI_VERSION}/`,
});

api.interceptors.request.use(async (config) => {
    config.headers["x-dw-client-id"] = CLIENT_ID;
    return config;
});
