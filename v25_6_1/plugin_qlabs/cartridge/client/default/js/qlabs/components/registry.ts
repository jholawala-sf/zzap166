import type React from "react";
import { SFRASearchTabAgent } from "./agent-search-tab";
import { AgentConfig } from "./agent-config";
import {
    ChatInput,
    MarkdownMessageView,
    Messages,
    ProductTilesMessageView,
} from "./messages";
import Portal from "./portal";
import { ProductTile } from "./product-tile";
import { ShopperAgentAPI } from "./shopper-agent-api";
import { ShopperPinnedProducts } from "./shopper-pinned-products";
import {
    SFRAProductDetailScope,
    ShopperProductHelper,
} from "./shopper-product-helper";
import { Query, Template, Comment } from "./templates";
import { ShopperAgentModal } from "./chat-modal";
import { DevTools } from "./devtools";

interface ComponentRegistry {
    [key: string]: React.FC;
}

// Component Registry is a dictionary that contains all components that
// can be dynamic rendered from agents or page designer
export const ALLOWED_COMPONENTS: ComponentRegistry = {
    Portal,
    DevTools,
    // Old name
    SearchTabAgentAPI: SFRASearchTabAgent,
    SFRASearchTabAgent,
    ShopperAgentAPI,
    ShopperPinnedProducts,
    ShopperProductHelper,
    AgentConfig,
    SFRAProductDetailScope,
    ShopperAgentModal,

    // templating
    Query,
    Template,
    Comment,

    // Message Views
    Messages,
    MarkdownMessageView,
    ProductTilesMessageView,
    ChatInput,

    // Products
    ProductTile,
};
