// simple promotion configuration
interface Promotion {
    id: string;
    name?: string;
    tags?: string[];

    calloutMsg: string;
    productIds: string[];
    categoryIds: string[];
    discountType: "amount" | "percent";
    discountAmount: number;
    customerGroupId?: string;
}

interface ShippingPromotion {
    id: string;
    name?: string;
    tags?: string[];

    calloutMsg: string;
    discountType: "free" | "amount" | "percent";
    discountAmount?: number;
    shippingMethodId: string;
    customerGroupId?: string;
}

/**
 * Generate a XML import for a campaign/promotion
 *
 * This is intentionally simplified for the AI assitant
 *
 * @param promotion
 */
export function generateCampaignPromotionXML(
    promotion: Promotion,
    {
        storefrontCatalogId,
    }: {
        storefrontCatalogId: string;
    },
) {
    // TODO this should use fast-xml-parser instead of a string template
    const xml = PROMOTION_TEMPLATE(promotion, storefrontCatalogId);
    return xml;
}

export function generateShippingCampaignPromotionXML(
    promotion: ShippingPromotion,
    {}: object,
) {
    // TODO this should use fast-xml-parser instead of a string template
    const xml = PROMOTION_SHIPPING_TEMPLATE(promotion);
    return xml;
}

const PROMOTION_TEMPLATE = (promotion: Promotion, storefrontCatalogId) => {
    /* eslint-disable */
    return `<?xml version="1.0" encoding="UTF-8"?>
<promotions xmlns="http://www.demandware.com/xml/impex/promotion/2008-01-31">
    <campaign campaign-id="AI-${promotion.id}-campaign">
        <enabled-flag>true</enabled-flag>
        <campaign-scope>
            <applicable-online/>
        </campaign-scope>
        <customer-groups match-mode="any">
            ${
                promotion.customerGroupId
                    ? `<customer-group group-id="${promotion.customerGroupId}"/>`
                    : '<customer-group group-id="Everyone"/>'
            }
        </customer-groups>
    </campaign>

    <promotion promotion-id="AI-${promotion.id}">
        <enabled-flag>true</enabled-flag>
        <archived-flag>false</archived-flag>
        <searchable-flag>true</searchable-flag>
        <refinable-flag>false</refinable-flag>
        <prevent-requalifying-flag>false</prevent-requalifying-flag>
        <prorate-across-eligible-items-flag>false</prorate-across-eligible-items-flag>
        <exclusivity>no</exclusivity>
        <name xml:lang="x-default">${promotion.id}</name>
        <callout-msg xml:lang="x-default"><![CDATA[${
            promotion.calloutMsg
        }]]></callout-msg>
        <tags>
            <tag>AI</tag>
        </tags>
        <product-promotion-rule>
            <discounted-products>
                <included-products>
                    ${
                        promotion.productIds.length > 0
                            ? `
                    <condition-group>
                        <product-id-condition operator="is equal">
                            ${promotion.productIds
                                .map((id) => `<product-id>${id}</product-id>`)
                                .join("\n")}
                        </product-id-condition>
                    </condition-group>
                    `
                            : ""
                    }
                    ${
                        promotion.categoryIds.length > 0
                            ? `
                    <condition-group>
                        <category-condition catalog-id="${storefrontCatalogId}" operator="is equal">
                            ${promotion.categoryIds
                                ?.map(
                                    (id) => `<category-id>${id}</category-id>`
                                )
                                .join("\n")}
                        </category-condition>
                    </condition-group>
                    `
                            : ""
                    }
                </included-products>
            </discounted-products>

            <simple-discount>
            ${
                promotion.discountType === "amount"
                    ? `<amount>${promotion.discountAmount}</amount>`
                    : `<percentage>${promotion.discountAmount}</percentage>`
            }
            </simple-discount>
        </product-promotion-rule>
    </promotion>

    <promotion-campaign-assignment promotion-id="AI-${
        promotion.id
    }" campaign-id="AI-${promotion.id}-campaign">
        <qualifiers match-mode="any">
            <customer-groups/>
            <source-codes/>
            <coupons/>
        </qualifiers>
    </promotion-campaign-assignment>

</promotions>
`;
    /* eslint-enable */
};

const PROMOTION_SHIPPING_TEMPLATE = (promotion: ShippingPromotion) => {
    /* eslint-disable */
    return `<?xml version="1.0" encoding="UTF-8"?>
<promotions xmlns="http://www.demandware.com/xml/impex/promotion/2008-01-31">
    <campaign campaign-id="${promotion.id}-campaign">
        <enabled-flag>true</enabled-flag>
        <campaign-scope>
            <applicable-online/>
        </campaign-scope>
        <customer-groups match-mode="any">
            ${
                promotion.customerGroupId
                    ? `<customer-group group-id="${promotion.customerGroupId}"/>`
                    : '<customer-group group-id="Everyone"/>'
            }
        </customer-groups>
    </campaign>

    <promotion promotion-id="${promotion.id}">
        <enabled-flag>true</enabled-flag>
        <archived-flag>false</archived-flag>
        <searchable-flag>true</searchable-flag>
        <refinable-flag>false</refinable-flag>
        <prevent-requalifying-flag>false</prevent-requalifying-flag>
        <prorate-across-eligible-items-flag>false</prorate-across-eligible-items-flag>
        <exclusivity>no</exclusivity>
        <name xml:lang="x-default">${promotion.id}</name>
        <callout-msg xml:lang="x-default"><![CDATA[${
            promotion.calloutMsg
        }]]></callout-msg>
        <tags>
            <tag>AI</tag>
        </tags>
        <shipping-promotion-rule>
            <shipping-methods>
                <method-id>${promotion.shippingMethodId}</method-id>
            </shipping-methods>
            <discounts condition-type="shipment-total">
                <discount>
                    <threshold>0.0</threshold>
                    ${
                        promotion.discountType === "amount"
                            ? `<amount>${promotion.discountAmount}</amount>`
                            : ""
                    }
                    ${
                        promotion.discountType === "percent"
                            ? `<percentage>${promotion.discountAmount}</percentage>`
                            : ""
                    }
                    ${promotion.discountType === "free" ? "<free/>" : ""}
                </discount>
            </discounts>
        </shipping-promotion-rule>
    </promotion>

    <promotion-campaign-assignment promotion-id="${
        promotion.id
    }" campaign-id="${promotion.id}-campaign">
        <qualifiers match-mode="any">
            <customer-groups/>
            <source-codes/>
            <coupons/>
        </qualifiers>
    </promotion-campaign-assignment>

</promotions>
`;
    /* eslint-enable */
};
