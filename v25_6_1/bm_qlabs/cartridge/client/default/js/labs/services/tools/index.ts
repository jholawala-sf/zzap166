import { getProduct } from "./catalog";
import {
    debugInstance,
    getCodeFile,
    getCodeVersion,
    queryErrorLogs,
    reindexSite,
} from "./technical";
import {
    createProductPromotion,
    createPromotionProxy,
    createShippingPromotion,
    getCustomerGroups,
    getShippingMethodsTool,
} from "./promotion";
import type { PlannerRegistry, Tool } from "../types";
import { ActionPlanner } from "../action-planner";

import {
    calculator,
    getSiteCategories,
    productSearch,
    weather,
} from "./general";
import { StepwisePlanner } from "../stepwise-planner";

/**
 * Groups tools into categories for selection by an action
 */
export const TOOL_GROUPS = {
    "product, category, catalogs, product search": [
        "product.GetProduct",
        "shop.product.Search",
    ],
    "creation of promotions, coupons and campaigns": ["promotion.CreateProxy"],
    "technical, code, indexing, sandbox instance diagnostics, deployment information":
        [
            "technical.GetCodeVersion",
            "technical.GetCodeFile",
            "technical.ReindexSite",
            "technical.DebugInstance",
        ],
};

export const TOOL_GROUP_SELECTION: Tool = {
    invoke: async (context: object, args: any) => {
        if (!TOOL_GROUPS[args.functionGroup]) {
            return {
                type: "error",
                error: {
                    message: `Tool group ${args.functionGroup} not found`,
                },
            };
        }

        // return a new action plan with the tools from the selected tool group
        return {
            type: "plan",
            nextPlan: {
                plannerName: "planners.Action.Default",
                toolNames: TOOL_GROUPS[args.functionGroup],
            },
        };
    },
    schema: {
        name: "functions.Find",
        description: "list more functions related to the goal",
        parameters: {
            type: "object",
            properties: {
                functionGroup: {
                    type: "string",
                    description: "category or group of functions to select",
                    enum: Object.keys(TOOL_GROUPS),
                },
            },
            required: ["functionGroup"],
        },
    },
};

// A key/value register of planners and tools is used so that tool and plan state
// can be suspended and resumed between unique invocations of chats or application instances
// in addition tools can return references to planners or other tools decoupled from the
// implementation reference
export const REGISTRY: PlannerRegistry = {
    planners: {
        "planners.Action.Default": ActionPlanner,
        "planners.Stepwise.Default": StepwisePlanner,
    },
    tools: {
        // General Purpose
        "functions.SelectGroup": TOOL_GROUP_SELECTION,
        "weather.Get": weather,
        "math.Calculate": calculator,

        // Promotion, Campaigns, Etc
        "promotion.CreateProxy": createPromotionProxy,
        "promotion.product.Create": createProductPromotion,
        "promotion.shipping.Create": createShippingPromotion,
        "shipping.GetMethods": getShippingMethodsTool,
        "promotion.GetCustomerGroups": getCustomerGroups,

        // Product Catalog
        "product.GetProduct": getProduct,
        "shop.product.Search": productSearch,
        "shop.catalog.GetSiteCategories": getSiteCategories,

        // Technical
        "technical.GetCodeVersion": getCodeVersion,
        "technical.ReindexSite": reindexSite,
        "technical.QueryErrorLogs": queryErrorLogs,
        "technical.GetCodeFile": getCodeFile,
        "technical.DebugInstance": debugInstance,
    },
};
