import type { Tool, ToolInvocationResult } from "../../types";
import type { ChatResponseError, Planner } from "../../types";
import { CONFIG } from "../../../config";
import {
    getStorefrontCatalogs,
    siteArchiveImport,
    api as ocapi,
} from "../../../api/ocapi";
import {
    generateCampaignPromotionXML,
    generateShippingCampaignPromotionXML,
} from "./xml";
import { createImpexZipFile } from "../../../api/webdav";
import { getShippingMethods } from "../../../api/misc";

// Tool for action planners that will defer to a stepwise for promotion creation
export const createPromotionProxy: Tool = {
    invoke: async (context: unknown, args: any) => {
        return {
            type: "plan",
            nextPlan: {
                plannerName: "planners.Stepwise.Default",
                toolNames: [
                    "promotion.product.Create",
                    "promotion.shipping.Create",
                    "promotion.GetCustomerGroups",
                    "shop.product.Search",
                    "shop.catalog.GetSiteCategories",
                    "shipping.GetMethods",
                ],
            },
        };
    },
    schema: {
        name: "promotion.Create",
        description: "create a promotion with a campaign",
        parameters: {
            type: "object",
            properties: {},
        },
    },
};

export const createProductPromotion: Tool = {
    invoke: async (
        context: object,
        args: any,
    ): Promise<ToolInvocationResult> => {
        try {
            const {
                callout_message,
                discount_type,
                discount_amount,
                product_ids,
                category_ids,
                customer_group_id,
            } = args;

            // TODO this should be part of the context
            var site_id = CONFIG.currentSite;
            var promotionId = "AI-" + new Date().getTime();
            var promotion_id = promotionId;

            if (!product_ids && !category_ids) {
                return {
                    type: "error",
                    error: {
                        message:
                            "Please provide either product IDs or category IDs",
                    },
                };
            }

            // easiest to just let them know they are in business manager so we need to be specific
            if (!site_id) {
                return {
                    type: "error",
                    error: {
                        message:
                            "Please provide a site ID or select a site from the dropdown",
                    },
                };
            }

            // TODO this should be in context
            const storefrontCatalogs = await getStorefrontCatalogs();
            const storefrontCatalog = storefrontCatalogs.find((c) => {
                const site = c.assigned_sites.find((s) => s.id === site_id);
                return !!site;
            });

            // promotion capabilities of data API are limited so we'll use XML instead
            const xml = generateCampaignPromotionXML(
                {
                    id: promotionId,
                    calloutMsg: callout_message,
                    discountType: discount_type,
                    discountAmount: discount_amount,
                    productIds: product_ids || [],
                    categoryIds: category_ids || [],
                    customerGroupId: customer_group_id,
                },
                {
                    storefrontCatalogId: storefrontCatalog.id,
                },
            );

            await createImpexZipFile(`${promotion_id}.zip`, {
                [`sites/${site_id}/promotions.xml`]: xml,
            });

            await siteArchiveImport(`${promotion_id}.zip`);
            // todo this is also not working; possible issue with support role
            // await webdav.delete(`${promotion_id}.zip`);

            return {
                type: "answer",
                answer: {
                    success: true,
                    suggestion:
                        "Recommend reindexing the site to see the promotion on PLPs.",
                    ...args,
                },
            };
        } catch (e) {
            return {
                type: "error",
                error: { message: "Promotion creation failure" },
            };
        }
    },
    schema: {
        name: "promotion.product.Create",
        description:
            "Create a promotion and a related campaign. Opt to create promotions on categories rather than individual products if possible.",
        parameters: {
            type: "object",
            properties: {
                callout_message: {
                    type: "string",
                    description:
                        "A short, descriptive message that appears on the storefront to promote the promotion",
                },
                disount_type: {
                    type: "string",
                    enum: ["amount", "percent"],
                },
                discount_amount: {
                    type: "number",
                },
                product_ids: {
                    type: "array",
                    description:
                        "A list of the product IDs to apply this promotion to",
                    items: {
                        type: "string",
                    },
                },
                category_ids: {
                    type: "array",
                    description:
                        "A list of the category IDs to apply this promotion to",
                    items: {
                        type: "string",
                    },
                },
                customer_group_id: {
                    type: "string",
                    description:
                        "The customer group to apply this promotion to (default Everyone)",
                },
            },
            required: ["callout_message"],
        },
    },
};

export const createShippingPromotion: Tool = {
    invoke: async (
        context: object,
        args: any,
    ): Promise<ToolInvocationResult> => {
        try {
            const {
                callout_message,
                discount_type,
                discount_amount,
                customer_group_id,
                shipping_method_id,
            } = args;

            // TODO this should be part of the context
            var site_id = CONFIG.currentSite;
            var promotionId = "AI-" + new Date().getTime();
            var promotion_id = promotionId;

            // easiest to just let them know they are in business manager so we need to be specific
            if (!site_id) {
                return {
                    type: "error",
                    error: {
                        message:
                            "Please provide a site ID or select a site from the dropdown",
                    },
                };
            }

            // promotion capabilities of data API are limited so we'll use XML instead
            const xml = generateShippingCampaignPromotionXML(
                {
                    id: promotionId,
                    calloutMsg: callout_message,
                    discountType: discount_type,
                    discountAmount: discount_amount,
                    customerGroupId: customer_group_id,
                    shippingMethodId: shipping_method_id,
                },
                {},
            );

            await createImpexZipFile(`${promotion_id}.zip`, {
                [`sites/${site_id}/promotions.xml`]: xml,
            });

            await siteArchiveImport(`${promotion_id}.zip`);
            // todo this is also not working; possible issue with support role
            // await webdav.delete(`${promotion_id}.zip`);

            const currentHostName = window.location.hostname;

            return {
                type: "answer",
                answer: {
                    success: true,
                    promotion_link: `https://${currentHostName}/on/demandware.store/Sites-Site/default/BMPromotion-Edit?PromotionID=${promotion_id}`,
                    ...args,
                },
            };
        } catch (e) {
            return {
                type: "error",
                error: { message: "Promotion creation failure" },
            };
        }
    },
    schema: {
        name: "promotion.shipping.Create",
        description: "Create a shipping promotion and a related campaign",
        parameters: {
            type: "object",
            properties: {
                callout_message: {
                    type: "string",
                    description:
                        "A short, descriptive message that appears on the storefront to promote the promotion",
                },
                discount_type: {
                    type: "string",
                    description: "The discount on shipping or free",
                    enum: ["free", "amount", "percent"],
                },
                discount_amount: {
                    type: "number",
                },
                shipping_method_id: {
                    type: "string",
                    description: "The shipping method ID to apply discount to",
                },
                customer_group_id: {
                    type: "string",
                    description:
                        "The customer group to apply this promotion to (default Everyone)",
                },
            },
            required: [
                "callout_message",
                "shipping_method_id",
                "discount_type",
            ],
        },
    },
};

export const getShippingMethodsTool: Tool = {
    invoke: async (
        context: object,
        args: any,
    ): Promise<ToolInvocationResult> => {
        const shippingMethods = await getShippingMethods();
        return {
            type: "answer",
            answer: {
                success: true,
                shippingMethods: shippingMethods,
            },
        };
    },
    schema: {
        name: "shipping.GetMethods",
        description: "Get a list of shipping methods",
        parameters: {
            type: "object",
            properties: {},
            required: [],
        },
    },
};

export const getCustomerGroups: Tool = {
    invoke: async (
        context: object,
        args: any,
    ): Promise<ToolInvocationResult> => {
        const resp = await ocapi.get(
            `/sites/${CONFIG.currentSite}/customer_groups?select=(**)`,
        );

        return {
            type: "answer",
            answer: {
                success: true,
                customerGroups: resp.data.data.map((cg: any) => ({
                    id: cg.id,
                    description: cg.description,
                })),
            },
        };
    },
    schema: {
        name: "promotion.GetCustomerGroups",
        description: "Get a list of customer groups",
        parameters: {
            type: "object",
            properties: {},
            required: [],
        },
    },
};
