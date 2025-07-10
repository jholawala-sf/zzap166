// PLANNER POC TOOLS
import { api as shop } from "../../api/shop";
import type { Tool } from "../types";

export const calculator: Tool = {
    invoke: async (context: unknown, args: any) => {
        const func = new Function(`return (${args.input})`);
        const result = func();
        return {
            type: "answer",
            answer: {
                result,
            },
        };
    },
    schema: {
        name: "math.Calculate",
        description: "calculate a mathematical expression",
        parameters: {
            type: "object",
            properties: {
                input: {
                    type: "string",
                    description: "expression to evaluate",
                },
            },
            required: ["input"],
        },
    },
};

export const weather: Tool = {
    invoke: async (context: unknown, args: any) => {
        return {
            type: "answer",
            answer: {
                forecast: "Sunny",
                // random between 50 and 75
                temperature: Math.floor(Math.random() * 25) + 50,
                unit: "F",
            },
        };
    },
    schema: {
        name: "weather.Get",
        description: "get the current weather",
        parameters: {},
    },
};

export const productSearch: Tool = {
    invoke: async (context: object, args: any) => {
        const resp = await shop.get(`product_search?q=${args.query}`);
        if (resp.data.count === 0) {
            return {
                type: "error",
                error: { message: "No products found for that query" },
            };
        }

        var categories = [];
        const categoryRefinement = resp.data.refinements.find(
            (r) => r.attribute_id === "cgid",
        );
        if (categoryRefinement) {
            categories = categoryRefinement.values.map((v) => ({
                category_id: v.value,
                category_name: v.label,
            }));
        }
        return {
            type: "answer",
            answer: {
                success: true,
                message: `${resp.data.count} Products found`,
                products: resp.data.hits.map((hit) => ({
                    product_id: hit.product_id,
                    product_name: hit.product_name,
                })),
                categories,
            },
        };
    },

    schema: {
        name: "product.Search",
        description:
            "search for products. when output display as a list including the product ID",
        parameters: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "search query",
                },
            },
            required: ["query"],
        },
    },
};

export const getSiteCategories: Tool = {
    invoke: async (context: object, args: any) => {
        const resp = await shop.get(`categories/root?levels=2`);

        // recurse through the categories and count them
        const countCategories = (category) => {
            var count = 0;
            if (category.categories) {
                category.categories.forEach((c) => {
                    count += countCategories(c);
                });
            }
            return count + 1;
        };
        const count = countCategories(resp.data);

        // recursively map the category tree so that only id, name and categories are in the structure
        const mapCategories = (category) => {
            return {
                category_id: category.id,
                category_name: category.name,
                categories: category.categories
                    ? category.categories.map(mapCategories)
                    : [],
            };
        };
        const categories = mapCategories(resp.data);

        return {
            type: "answer",
            answer: {
                success: true,
                message: `${count} Categories found`,
                categoryTree: categories,
            },
        };
    },

    schema: {
        name: "product.GetSiteCategories",
        description: "get all categories for the current site",
        parameters: {
            type: "object",
        },
    },
};
