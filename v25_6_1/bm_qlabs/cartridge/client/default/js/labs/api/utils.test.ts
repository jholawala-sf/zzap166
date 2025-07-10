import { describe, it, expect } from "vitest";
import { extractJson } from "./utils";

describe("extractJson", () => {
    it("should extract JSON when message is an object", () => {
        const message = { key: "value", nested: { prop: 123 } };

        const result = extractJson(message);

        expect(result).toEqual({ key: "value", nested: { prop: 123 } });
        expect(result).not.toBe(message); // Should be a new object
    });

    it("should extract JSON when message is a JSON string", () => {
        const message = '{"name": "John", "age": 30}';

        const result = extractJson(message);

        expect(result).toEqual({ name: "John", age: 30 });
    });

    it("should extract JSON from markdown code fences", () => {
        const message =
            'Here is the data:\n```json\n{"name": "Alice", "role": "admin"}\n```';

        const result = extractJson(message);

        expect(result).toEqual({ name: "Alice", role: "admin" });
    });

    it("should extract JSON from code fences without json language specifier", () => {
        const message =
            'Here is the data:\n```\n{"name": "Bob", "role": "user"}\n```';

        const result = extractJson(message);

        expect(result).toEqual({ name: "Bob", role: "user" });
    });

    it("should merge multiple JSON objects from multiple code blocks", () => {
        const message =
            '```json\n{"name": "Charlie"}\n```\nMore data:\n```json\n{"role": "developer"}\n```';

        const result = extractJson(message);

        expect(result).toEqual({ name: "Charlie", role: "developer" });
    });

    it("should handle invalid JSON in code blocks", () => {
        const message =
            '```json\n{"valid": true}\n```\nInvalid JSON:\n```json\n{"invalid: broken}\n```';

        const result = extractJson(message);

        expect(result).toEqual({ valid: true });
        expect(result).not.toEqual({ invalid: "broken" }); // Should not include invalid JSON
    });

    it("should return undefined for non-JSON messages", () => {
        const message = "This is just a plain text message";

        const result = extractJson(message);

        expect(result).toBeUndefined();
    });

    it("should handle JSON strings with whitespace and newlines", () => {
        const message = `
      {
        "user": {
          "name": "David",
          "permissions": ["read", "write"]
        },
        "active": true
      }
    `;

        const result = extractJson(message);

        expect(result).toEqual({
            user: {
                name: "David",
                permissions: ["read", "write"],
            },
            active: true,
        });
    });
});
