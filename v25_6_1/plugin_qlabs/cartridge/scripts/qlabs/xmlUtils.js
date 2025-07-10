'use strict';

const PREFIX_ID = 'af';
const PREFIX_FILENAME = 'agentforce';

/**
 * Writes campaign XML for a promotion
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 * @param {string} promotionId - The promotion ID
 */
function writeCampaignXml(xsw, promotion, promotionId) {
    xsw.writeStartElement('campaign');
    xsw.writeAttribute('campaign-id', `${promotionId}-campaign`);

    xsw.writeStartElement('enabled-flag');
    xsw.writeCharacters(promotion.enabled === false ? 'false' : 'true');
    xsw.writeEndElement(); // </enabled-flag>

    xsw.writeStartElement('campaign-scope');
    xsw.writeEmptyElement('applicable-online');
    xsw.writeEndElement(); // </campaign-scope>

    if (promotion.startDate) {
        xsw.writeStartElement('start-date');
        xsw.writeCharacters(promotion.startDate);
        xsw.writeEndElement();
    }

    if (promotion.endDate) {
        xsw.writeStartElement('end-date');
        xsw.writeCharacters(promotion.endDate);
        xsw.writeEndElement();
    }

    // customer groups
    xsw.writeStartElement('customer-groups');
    xsw.writeAttribute('match-mode', 'any');

    if (promotion.customerGroupIds && promotion.customerGroupIds.length > 0) {
        promotion.customerGroupIds.forEach(function(customerGroupId) {
            xsw.writeEmptyElement('customer-group');
            xsw.writeAttribute('group-id', customerGroupId);
        });
    }

    xsw.writeEndElement(); // </customer-groups>
    xsw.writeEndElement(); // </campaign>
}

/**
 * Writes promotion-campaign assignment XML
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {string} promotionId - The promotion ID
 */
function writePromotionCampaignAssignmentXml(xsw, promotionId) {
    xsw.writeStartElement('promotion-campaign-assignment');
    xsw.writeAttribute('promotion-id', promotionId);
    xsw.writeAttribute('campaign-id', `${promotionId}-campaign`);

    xsw.writeStartElement('qualifiers');
    xsw.writeAttribute('match-mode', 'any');

    xsw.writeEmptyElement('customer-groups');
    xsw.writeEmptyElement('source-codes');
    xsw.writeEmptyElement('coupons');

    xsw.writeEndElement(); // </qualifiers>
    xsw.writeEndElement(); // </promotion-campaign-assignment>
}

/**
 * Writes common promotion attributes
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 * @param {string} promotionId - The promotion ID
 */
function writeCommonPromotionAttributes(xsw, promotion, promotionId) {
    xsw.writeStartElement('enabled-flag');
    xsw.writeCharacters(promotion.enabled === false ? 'false' : 'true');
    xsw.writeEndElement();

    xsw.writeStartElement('archived-flag');
    xsw.writeCharacters('false');
    xsw.writeEndElement();

    xsw.writeStartElement('searchable-flag');
    xsw.writeCharacters('true');
    xsw.writeEndElement();

    xsw.writeStartElement('refinable-flag');
    xsw.writeCharacters('false');
    xsw.writeEndElement();

    xsw.writeStartElement('prevent-requalifying-flag');
    xsw.writeCharacters('false');
    xsw.writeEndElement();

    xsw.writeStartElement('prorate-across-eligible-items-flag');
    xsw.writeCharacters('false');
    xsw.writeEndElement();

    xsw.writeStartElement('exclusivity');
    xsw.writeCharacters('no');
    xsw.writeEndElement();

    xsw.writeStartElement('name');
    xsw.writeAttribute('xml:lang', 'x-default');
    xsw.writeCharacters(promotion.name || promotionId);
    xsw.writeEndElement();

    if (promotion.calloutMsg) {
        xsw.writeStartElement('callout-msg');
        xsw.writeAttribute('xml:lang', 'x-default');
        xsw.writeCData(promotion.calloutMsg);
        xsw.writeEndElement();
    }

    if (promotion.description) {
        xsw.writeStartElement('details');
        xsw.writeAttribute('xml:lang', 'x-default');
        xsw.writeCData(promotion.description);
        xsw.writeEndElement();
    }

    xsw.writeStartElement('tags');
    xsw.writeStartElement('tag');
    xsw.writeCharacters(PREFIX_FILENAME);
    xsw.writeEndElement(); // </tag>
    xsw.writeEndElement(); // </tags>
}

/**
 * Writes product IDs XML
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 */
function writeProductIdsXml(xsw, promotion) {
    if (promotion.productIds && promotion.productIds.length > 0) {
        xsw.writeStartElement('condition-group'); // <condition-group>
        xsw.writeStartElement('product-id-condition'); // <product-id-condition>
        xsw.writeAttribute('operator', 'is equal');

        promotion.productIds.forEach((productId) => {
            xsw.writeStartElement('product-id'); // <product-id>
            xsw.writeCharacters(productId)
            xsw.writeEndElement(); // </product-id>
        });

        xsw.writeEndElement(); // </product-id-condition>
        xsw.writeEndElement(); // </condition-group>
    }
}

/**
 * Writes category IDs XML
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 * @param {string} storefrontCatalogId - the storefront catalog ID
 */
function writeCategoryIdsXml(xsw, promotion, storefrontCatalogId) {
    if (promotion.categoryIds && promotion.categoryIds.length > 0) {
        xsw.writeStartElement('condition-group'); // <condition-group>
        xsw.writeStartElement('category-condition'); // <category-condition>
        xsw.writeAttribute('catalog-id', storefrontCatalogId);

        promotion.categoryIds.forEach((categoryId) => {
            xsw.writeStartElement('category-id'); // <category-id>
            xsw.writeCharacters(categoryId)
            xsw.writeEndElement(); // </category-id>
        });

        xsw.writeEndElement(); // </category-condition>
        xsw.writeEndElement(); // </condition-group>
    }
}

/**
 * Writes amount or percent off XML
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 */
function writeAmountOrPercentOffXml(xsw, promotion) {
    xsw.writeStartElement(promotion.discountType === 'amount' ? 'amount' : 'percentage');
    xsw.writeCharacters(promotion.discountAmount != null ? promotion.discountAmount : 0);
    xsw.writeEndElement(); // </amount> or </percentage>
}

/**
 * Writes discount XML
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 */
function writeDiscountXml(xsw, promotion) {
    if (!promotion.discountConditionType) {
        xsw.writeStartElement('simple-discount'); // <simple-discount>
        writeAmountOrPercentOffXml(xsw, promotion);
        xsw.writeEndElement(); // </simple-discount>
    } else {
        var discountConditionType = promotion.discountConditionType;
        if (promotion.discountConditionType !== 'product-quantity') {
            discountConditionType = promotion.promotionType === 'product' ? 'product-amount' : 'order-total';
        }

        xsw.writeStartElement('discounts'); // <discounts>
        xsw.writeAttribute('condition-type', discountConditionType);

        xsw.writeStartElement('discount'); // <discount>
        xsw.writeStartElement('threshold'); // <threshold>
        xsw.writeCharacters(promotion.discountThreshold || 1);
        xsw.writeEndElement(); // </threshold>
        writeAmountOrPercentOffXml(xsw, promotion);
        xsw.writeEndElement(); // </discount>

        xsw.writeEndElement(); // </discounts>
    }
}

/**
 * Writes XML for order promotions
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 * @param {string} promotionId - The promotion ID
 * @param {string} storefrontCatalogId - The storefront catalog ID
 */
function writeOrderPromotionXml(xsw, promotion, promotionId, storefrontCatalogId) {
    xsw.writeStartElement('promotion'); // <promotion>
    xsw.writeAttribute('promotion-id', promotionId);

    // write common promotion attributes
    writeCommonPromotionAttributes(xsw, promotion, promotionId);

    // order promotion rule
    xsw.writeStartElement('order-promotion-rule');

    // qualifying products
    xsw.writeStartElement('qualifying-products');
    xsw.writeStartElement('included-products');

    // write products Xml
    writeProductIdsXml(xsw, promotion);

    // write category Xml
    writeCategoryIdsXml(xsw, promotion, storefrontCatalogId);

    xsw.writeEndElement(); // </included-products>
    xsw.writeEndElement(); // </qualifying-products>

    xsw.writeStartElement('discount-only-qualifying-products');
    xsw.writeCharacters('true');
    xsw.writeEndElement(); // </discount-only-qualifying-products>

    // write discount information based on type and condition
    writeDiscountXml(xsw, promotion);

    xsw.writeEndElement(); // </order-promotion-rule>
    xsw.writeEndElement(); // </promotion>
}

/**
 * Writes XML for product promotions
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 * @param {string} promotionId - The promotion ID
 * @param {string} storefrontCatalogId - The storefront catalog ID
 */
function writeProductPromotionXml(xsw, promotion, promotionId, storefrontCatalogId) {
    xsw.writeStartElement('promotion'); // <promotion>
    xsw.writeAttribute('promotion-id', promotionId);

    // write common promotion attributes
    writeCommonPromotionAttributes(xsw, promotion, promotionId);

    // product promotion rule
    xsw.writeStartElement('product-promotion-rule');

    // discounted products
    xsw.writeStartElement('discounted-products');
    xsw.writeStartElement('included-products');

    // write products Xml
    writeProductIdsXml(xsw, promotion);

    // write category Xml
    writeCategoryIdsXml(xsw, promotion, storefrontCatalogId);

    xsw.writeEndElement(); // </included-products>
    xsw.writeEndElement(); // </discounted-products>

    // write discount information based on type and condition
    writeDiscountXml(xsw, promotion);

    xsw.writeEndElement(); // </product-promotion-rule>
    xsw.writeEndElement(); // </promotion>
}

/**
 * Generates XML for shipping promotions
 * @param {dw.io.XMLIndentingStreamWriter} xsw - The XML stream writer
 * @param {Object} promotion - The promotion object
 * @param {string} promotionId - The promotion ID
 * @returns {string} The generated XML
 */
function writeShippingPromotionXml(xsw, promotion, promotionId) {
    xsw.writeStartElement('promotion'); // <promotion>
    xsw.writeAttribute('promotion-id', promotionId);

    // write common promotion attributes
    writeCommonPromotionAttributes(xsw, promotion, promotionId);

    // shipping promotion rule
    xsw.writeStartElement('shipping-promotion-rule');
    if (promotion.shippingMethodIds && promotion.shippingMethodIds.length > 0) {
        xsw.writeStartElement('shipping-methods');
        promotion.shippingMethodIds.forEach(function(shippingMethodId) {
            xsw.writeStartElement('method-id');
            xsw.writeCharacters(shippingMethodId);
            xsw.writeEndElement();
        });
        xsw.writeEndElement(); // </shipping-methods>
    }

    // discounts
    xsw.writeStartElement('discounts');
    xsw.writeAttribute('condition-type', 'shipment-total');
    xsw.writeStartElement('discount');
    xsw.writeStartElement('threshold');
    xsw.writeCharacters('0.0');
    xsw.writeEndElement(); // </threshold>

    // discount type
    if (!promotion.discountType || promotion.discountAmount == null || promotion.discountType === 'free') {
        xsw.writeEmptyElement('free')
    } else if (promotion.discountType === 'amount') {
        xsw.writeStartElement('amount');
        xsw.writeCharacters(promotion.discountAmount.toString());
        xsw.writeEndElement();
    } else if (promotion.discountType === 'percentage') {
        xsw.writeStartElement('percentage');
        xsw.writeCharacters(promotion.discountAmount.toString());
        xsw.writeEndElement();
    }

    xsw.writeEndElement(); // </discount>
    xsw.writeEndElement(); // </discounts>

    xsw.writeEndElement(); // </shipping-promotion-rule>

    xsw.writeEndElement(); // </promotion>
}

/**
 * Write condition elements for customer group rules
 * @param {XMLIndentingStreamWriter} xsw - The XML writer
 * @param {Array} conditions - Array of condition objects
 * @param {string} conditionType - Type of condition (included or excluded)
 */
function writeConditions(xsw, conditions, conditionType) {
    xsw.writeStartElement(conditionType + '-customers');

    xsw.writeStartElement('condition-group');
    xsw.writeAttribute('match-mode', 'all');

    for (var i = 0; i < conditions.length; i++) {
        var condition = conditions[i];
        var conditionListType = condition.conditionListType ? condition.conditionListType : 'string';
        var conditionList = condition.conditionList;

        xsw.writeStartElement('condition'); // <condition>

        xsw.writeStartElement('attribute-path'); // <attribute-path>
        xsw.writeCharacters(condition.attributePath);
        xsw.writeEndElement(); // </attribute-path>

        xsw.writeStartElement('operator'); // <operator>
        xsw.writeCharacters(condition.operator);
        xsw.writeEndElement(); // </operator>

        // write the condition list
        if (conditionList && conditionList.length) {
            for (let j = 0; j < conditionList.length; j++) {
                xsw.writeStartElement(conditionListType);
                xsw.writeCharacters(conditionList[j]);
                xsw.writeEndElement();
            }
        }

        xsw.writeEndElement(); // </condition>
    }

    xsw.writeEndElement(); // </condition-group>
    xsw.writeEndElement(); // </included-customers> or </excluded-customers>
}

/**
 * Generate dynamic customer group XML content for a specific customer group
 * @param {XMLIndentingStreamWriter} xsw - The XML writer
 * @param {Object} customerGroup - The customer group object
 * @param {string} customerGroupId - The customer group ID
 * @return {void} - The function writes directly to the XML writer
 */
function writeDynamicCustomerGroupXml(xsw, customerGroup, customerGroupId) {
    xsw.writeStartElement('customer-group'); // <customer-group>
    xsw.writeAttribute('group-id', customerGroupId);

    // description
    if (customerGroup.description) {
        xsw.writeStartElement('description');
        xsw.writeCData(customerGroup.description);
        xsw.writeEndElement(); // </description>
    }

    // membership rule
    xsw.writeStartElement('membership-rule');

    // include conditions
    if (customerGroup.includedConditions && customerGroup.includedConditions.length) {
        writeConditions(xsw, customerGroup.includedConditions, 'included');
    }

    // exclude conditions
    if (customerGroup.excludedConditions && customerGroup.excludedConditions.length) {
        writeConditions(xsw, customerGroup.excludedConditions, 'excluded');
    }

    xsw.writeEndElement(); // </membership-rule>

    // custom attributes
    xsw.writeEmptyElement('custom-attributes'); // <custom-attributes/>

    xsw.writeEndElement(); // </customer-group>
}

/**
 * Generate static customer group XML content
 * @param {XMLIndentingStreamWriter} xsw - The XML writer
 * @param {Object} customerGroup - The customer group object
 * @param {string} customerGroupId - The customer group ID
 * @return {void} - The function writes directly to the XML writer
 */
function writeStaticCustomerGroupXml(xsw, customerGroup, customerGroupId) {
    xsw.writeStartElement('customer-group'); // <customer-group>
    xsw.writeAttribute('group-id', customerGroupId);

    // description
    if (customerGroup.description) {
        xsw.writeStartElement('description');
        xsw.writeCData(customerGroup.description);
        xsw.writeEndElement(); // </description>
    }

    // custom attributes
    xsw.writeEmptyElement('custom-attributes'); // <custom-attributes/>

    xsw.writeEndElement(); // </customer-group>
}

/**
 * Generate XML content for customer group assignments
 * @param {XMLIndentingStreamWriter} xsw - The XML writer
 * @param {Object} customerGroup - The customer group object
 * @param {string} customerGroupId - The customer group ID
 * @return {void} - The function writes directly to the XML writer
 */
function writeCustomerGroupAssignmentsXml(xsw, customerGroup, customerGroupId) {
    var groupAssignments = customerGroup.groupAssignments;
    if (groupAssignments && groupAssignments.length) {
        for (var i = 0; i < groupAssignments.length; i++) {
            var customerNo = groupAssignments[i];
            xsw.writeEmptyElement('group-assignment'); // <group-assignment>
            xsw.writeAttribute('group-id', customerGroupId);
            xsw.writeAttribute('customer-no', customerNo);
        }
    }
}

module.exports = {
    PREFIX_ID,
    PREFIX_FILENAME,
    writeCampaignXml,
    writeOrderPromotionXml,
    writeProductPromotionXml,
    writeShippingPromotionXml,
    writePromotionCampaignAssignmentXml,
    writeDynamicCustomerGroupXml,
    writeStaticCustomerGroupXml,
    writeCustomerGroupAssignmentsXml
};

