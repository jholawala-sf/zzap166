// Helper function to extract JSON from messages
export function extractJson(message: string | object): any | undefined {
    let jsonData: any = undefined;

    if (typeof message === "object") {
        // The API does not support this but we do with mock responses
        return Object.assign({}, message);
    }

    // check if the message is directly parseable as JSON
    if (message && typeof message === "string") {
        try {
            jsonData = JSON.parse(message);
        } catch (e) {
            //ignore
        }
    }

    // Case 2: Extract and parse JSON from markdown code fences
    if (message && typeof message === "string") {
        const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)```/g;
        let match;
        const matches = [];

        while ((match = codeBlockRegex.exec(message)) !== null) {
            const codeContent = match[1].trim();
            try {
                const parsedJson = JSON.parse(codeContent);
                matches.push(parsedJson);
            } catch (e) {
                // Skip invalid JSON blocks
            }
        }

        // Merge all valid JSON objects found in code fences
        if (matches.length > 0) {
            if (!jsonData) {
                jsonData = matches.length === 1 ? matches[0] : {};
            }

            // Merge multiple JSON objects if found
            if (matches.length > 1) {
                for (const obj of matches) {
                    jsonData = { ...jsonData, ...obj };
                }
            }
        }
    }

    return jsonData;
}

export const wait = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export const randomUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        },
    );
};
