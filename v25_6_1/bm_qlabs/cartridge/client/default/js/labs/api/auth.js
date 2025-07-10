// OCAPI Authentication
import { CONFIG } from "../config";

/**
 * @typedef {Object} BMAuthGrantResponse
 * @property {string} access_token
 * @property {number} expires_in
 */

/**
 * Get a BM Auth Grant using the internal client and session auth
 *
 * @return {Promise<BMGrantResponse>}
 */
export async function getBMAuthGrant() {
    // TODO: why did I use fetch instead of axios here?
    const response = await fetch(
        `https://${CONFIG.hostname}/dw/oauth2/access_token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `grant_type=urn%3Ademandware%3Aparams%3Aoauth%3Agrant-type%3Aclient-id%3Adwsid%3Adwsecuretoken&client_id=${CONFIG.clientId}`,
            includeCredentials: true,
        },
    );
    const data = await response.json();
    return data;
}
