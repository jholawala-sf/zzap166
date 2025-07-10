/**
 * Is Companion plugin running in Business Manager
 * @returns {boolean} - True if running in Business Manager
 */
export function isBM() {
    return document.location.pathname.includes("Sites-Site");
}

export function isStorefront() {
    return !isBM();
}
