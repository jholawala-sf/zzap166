// Page Designer Component Schema

const SCHEMA_ID = {
    type: "string",
    pattern: "^[_A-Za-z0-9]+$",
    description:
        "Unique ID that must contain only alphanumeric characters, and underscores.",
};
const SCHEMA_NAME = {
    type: "string",
};
const SCHEMA_DESCRIPTION = {
    type: "string",
};
const ATTRIBUTE_BASE = {
    properties: {
        id: SCHEMA_ID,
        name: SCHEMA_NAME,
        description: SCHEMA_DESCRIPTION,
        required: { type: "boolean", default: true },
    },
};

const SCHEMA_DEFS = {
    id: {
        type: "string",
        pattern: "^[\\w]+$",
    },
    full_qualified_id: {
        type: "string",
        pattern: "^[\\w\\.]+$",
    },
    name: {
        type: "string",
    },
    description: {
        type: "string",
    },

    string: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["string"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    text: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["text"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    markup: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["markup"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    integer: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["integer"] },
            default_value: { type: "integer" },
        },
        required: ["id", "type"],
    },
    boolean: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["boolean"] },
            default_value: { type: "boolean" },
        },
        required: ["id", "type"],
    },
    product: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["product"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    category: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["category"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    file: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["file"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    page: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["page"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    image: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["image"] },
            default_value: { not: {} },
        },
        required: ["id", "type"],
    },
    url: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["url"] },
            default_value: { type: "string" },
        },
        required: ["id", "type"],
    },
    enum_of_integer: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["enum"] },
            values: {
                type: "array",
                minItems: 1,
                items: { type: "integer" },
            },
            default_value: { type: "integer" },
        },
        required: ["id", "type", "values"],
    },
    enum_of_string: {
        type: "object",
        properties: {
            ...ATTRIBUTE_BASE.properties,
            type: { enum: ["enum"] },
            values: {
                type: "array",
                minItems: 1,
                items: { type: "string" },
            },
            default_value: { type: "string" },
        },
        required: ["id", "type", "values"],
    },
};

export const COMPONENT_SCHEMA = {
    type: "object",
    properties: {
        name: SCHEMA_NAME,
        description: SCHEMA_DESCRIPTION,
        group: SCHEMA_ID,
        region_definitions: {
            type: "array",
            description: "A list of regions that may contain child components",
            items: {
                type: "object",
                properties: {
                    id: SCHEMA_ID,
                    name: SCHEMA_NAME,
                },
                required: ["id"],
            },
        },
        attribute_definition_groups: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: SCHEMA_ID,
                    name: SCHEMA_NAME,
                    description: SCHEMA_DESCRIPTION,
                    attribute_definitions: {
                        type: "array",
                        items: {
                            oneOf: [
                                SCHEMA_DEFS.string,
                                SCHEMA_DEFS.text,
                                SCHEMA_DEFS.markup,
                                SCHEMA_DEFS.integer,
                                SCHEMA_DEFS.boolean,
                                SCHEMA_DEFS.product,
                                SCHEMA_DEFS.category,
                                SCHEMA_DEFS.file,
                                SCHEMA_DEFS.page,
                                SCHEMA_DEFS.image,
                                SCHEMA_DEFS.url,
                                SCHEMA_DEFS.enum_of_integer,
                                SCHEMA_DEFS.enum_of_string,
                            ],
                        },
                    },
                },
                required: ["id", "attribute_definitions"],
                additionalProperties: false,
            },
        },
    },
    required: ["region_definitions", "attribute_definition_groups", "group"],
};
