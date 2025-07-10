import type { Tool } from "../../types";

import {
    getProduct as ocapiGetProduct,
    api as ocapi,
} from "../../../api/ocapi";

export const getProduct: Tool = {
    invoke: async (context: object, args: any) => {
        try {
            const product = await ocapiGetProduct(args.productID);
            return {
                type: "answer",
                answer: {
                    productID: product.id,
                    productName: product.name.default,
                    shortDescription: product.short_description.default.markup,
                    longDescription: product.long_description?.default?.markup,
                    specifications: product.c_specifications?.default?.markup,
                },
            };
        } catch (e) {
            return {
                type: "error",
                error: {
                    success: false,
                    message: "Product could not found",
                },
            };
        }
    },
    schema: {
        name: "product.GetProduct",
        description: "Get a product details by ID",
        parameters: {
            type: "object",
            properties: {
                productID: {
                    type: "string",
                    description: "The product ID",
                },
            },
            required: ["productID"],
        },
    },
};

// TODO unused right now; this is data API
export const searchProducts = async (context: unknown, args: any) => {
    try {
        const result = await ocapi.post(`/product_search`, {
            query: {
                text_query: {
                    fields: ["name"],
                    search_phrase: args.query,
                },
            },
            select: "(**)",
        });
        return {
            success: true,
            message: `${result.data.count} Products found`,
            results: result.data.hits.slice(0, 5).map((product: any) => ({
                productID: product.id,
                productName: product.name.default,
            })),
        };
    } catch (e) {
        console.log(e);
        return {
            success: false,
            error: "Products could not be found",
        };
    }
};
searchProducts.confirm = () => false;
searchProducts.schema = {
    name: "search_products",
    description:
        "Searches for products. Output to the user should enumerate the top 5 results and provide both the product ID and product name",
    parameters: {
        type: "object",
        properties: {
            query: {
                type: "string",
                description: "The search query",
            },
        },
        required: ["query"],
    },
};
