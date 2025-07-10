/**
 * Generate a UUID v4 string
 * @returns {string} UUID v4 string
 */
export function uuid4(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        },
    );
}

export function snakeCaseToCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace("-", "").replace("_", ""),
    );
}

export function camelCaseToSnakeCase(str: string): string {
    return str.replace(/([A-Z])/g, (group) => `_${group.toLowerCase()}`);
}

export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
