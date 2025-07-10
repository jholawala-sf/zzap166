import { getBMAuthGrant } from "./auth";
import { XMLParser } from "fast-xml-parser";

import axios from "axios";
import { useGlobalState } from "../state/global";
import { api as misc } from "./misc";

export const api = axios.create({
    baseURL: `/on/demandware.servlet/webdav/Sites/`,
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

export async function getFile(filename) {
    const response = await api.get(filename);
    return response.data;
}

/**
 * @typedef {object} WebDAVFile
 * @property {string} path
 * @property {string} name
 * @property {Date} creationDate
 * @property {Date} lastModified
 * @property {boolean} isFile
 * @property {boolean} isFolder
 */
/**
 *
 * @param {string} path
 * @returns {Promise<WebDAVFile[]>}
 */
export async function listFiles(path) {
    var resp = await api({
        url: path,
        method: "PROPFIND",
    });

    const parser = new XMLParser();
    let jObj = parser.parse(resp.data);

    const files = jObj.multistatus.response.map((response) => {
        return {
            path: response.href,
            name: response.propstat.prop.displayname,
            creationDate: new Date(response.propstat.prop.creationdate),
            lastModified: new Date(response.propstat.prop.getlastmodified),
            isFile:
                response.propstat.prop.resourcetype.collection === undefined,
            isFolder:
                response.propstat.prop.resourcetype.collection !== undefined,
        };
    });

    return files;
}

/**
 * Create a zip file from an object of filename:content pairs
 * This can then be imported by sfcc-site-import
 * @param {string} filename
 * @param {object} obj
 * @return {Promise<void>}
 */
export async function createImpexZipFile(filename, obj) {
    if (!filename) {
        throw new Error("bad filename");
    }
    const filenameBase = filename.split(".")[0];

    for (const [filename, content] of Object.entries(obj)) {
        await api.put(
            `Impex/src/instance/${filenameBase}/${filename}`,
            content,
        );
    }

    // getting 403 no matter what I do with this (bearer, session, etc); Could be related to support role
    // const token = await getBMAuthGrant();
    // await api.post(
    //     `Impex/src/instance/${filenameBase}/?method=ZIP&client_id=${CONFIG.clientId}`,
    //     {
    //         headers: {
    //             Authorization: `Bearer ${token.access_token}`,
    //         },
    //     }
    // );
    await misc.post(`?_endpoint=zipFile`, {
        filename: `IMPEX/src/instance/${filenameBase}`,
    });

    await api.delete(`Impex/src/instance/${filenameBase}`);
}
