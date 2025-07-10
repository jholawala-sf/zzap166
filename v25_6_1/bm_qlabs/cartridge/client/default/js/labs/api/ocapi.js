import axios from "axios";
import { APP_SETTINGS } from "../config";
import { getBMAuthGrant } from "./auth";
import { useGlobalState } from "../state/global";
import { sleep } from "../utils";

export const api = axios.create({
    baseURL: `/s/-/dw/data/${APP_SETTINGS.OCAPI_VERSION ?? "v23_2"}/`,
});

var accessToken = null;
var accessTokenExpiration = null;
api.interceptors.request.use(async (config) => {
    // authenticate with bm auth grant if we do not have one
    if (
        !accessToken ||
        !accessTokenExpiration ||
        accessTokenExpiration < Date.now()
    ) {
        var grant = await getBMAuthGrant();
        accessToken = grant.access_token;
        // shift expiration back 5 seconds to account for latency
        accessTokenExpiration = Date.now() + (grant.expires_in - 5) * 1000;
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

// report global state error if error
api.interceptors.response.use(null, (error) => {
    if (error.response) {
        console.error(error.response.data);
    }
    if (
        error.response &&
        error.response.status !== 404 &&
        // special case see below
        !error.response?.data?.fault?.type === "UnknownPropertyException"
    ) {
        // 404s are expected for some requests; let them pass through to be handled in app
        useGlobalState.getState().setError("API Error: Refresh the page");
    }
    throw error;
});

// track failed auths to prevent loop of 401s
// reset will require a page refresh
var failedAuths = 0;
// axios interceptor to capture 401 errors and refresh the access token
api.interceptors.response.use(null, async (error) => {
    if (error?.response?.status === 401 && failedAuths < 3) {
        failedAuths++;
        var grant = await getBMAuthGrant();
        accessToken = grant.access_token;
        // shift expiration back 5 seconds to account for latency
        accessTokenExpiration = Date.now() + (grant.expires_in - 5) * 1000;
        return api.request(error.config);
    }
    throw error;
});

export async function getCodeVersions() {
    const response = await api.get("/code_versions");
    return response.data.data;
}

export async function getProduct(pid) {
    const response = await api.get(`/products/${pid}`);
    return response.data;
}

export async function waitForJob(jobId, executionId) {
    var startTime = Date.now();
    var ticks = 0;
    // eslint-disable-next-line no-constant-condition
    while (true) {
        await sleep(3000);
        var resp = await api.get(`jobs/${jobId}/executions/${executionId}`);
        var jobStatus = resp.data.status;
        var executionStatus = resp.data.execution_status;
        if (executionStatus === "aborted" || jobStatus === "ERROR") {
            console.error(`Job log ${resp.data.log_file_path}`);
            throw new Error(`Error executing job`);
        } else if (executionStatus === "finished") {
            break;
        } else if (ticks % 5 === 0) {
            var now = Date.now();

            console.log(
                `Waiting for job ${executionId} (${jobId}) to finish (${
                    (now - startTime) / 1000
                }s elapsed)...`,
            );
        }
        ticks++;
    }
    var duration = resp.data.duration / 1000;
    console.info(
        `Job ${executionId} (${jobId}) finished. Status ${jobStatus} (duration: ${duration}s)`,
    );
}

export async function siteArchiveImport(filename) {
    var resp;
    try {
        resp = await api.post("jobs/sfcc-site-archive-import/executions", {
            file_name: filename,
        });
    } catch (e) {
        if (
            e.response &&
            e.response?.data?.fault?.type === "UnknownPropertyException"
        ) {
            // OCAPI BUG: internal users need to use this form
            console.log(
                "OCAPI BUG: internal users must use different form for import",
            );
            resp = await api.post("jobs/sfcc-site-archive-import/executions", {
                parameters: [
                    {
                        name: "ImportFile",
                        value: filename,
                    },
                ],
            });
        }
    }
    var jobId = resp.data.id;

    await waitForJob("sfcc-site-archive-import", jobId);
}

export async function getStorefrontCatalogs() {
    var resp = await api.post("catalog_search", {
        query: {
            term_query: {
                fields: ["is_storefront_catalog"],
                operator: "is",
                values: [true],
            },
        },
        select: "(**)",
    });
    return resp.data.hits;
}

/**
 *
 * @param {string} siteId
 * @returns {Promise<string[]>}
 */
export async function getSiteCartridges(siteId) {
    const resp = await api.get(`sites/${siteId}?select=(**)`);
    return resp.data.cartridges.split(":");
}
