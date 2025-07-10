'use strict';

var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');

var LomLogger = require('*/cartridge/scripts/helpers/LomLogger');
var lomHelper = require('*/cartridge/scripts/helpers/lomHelper');

/**
 * @class
 * @classdesc LineItem model class
 * @param {string} id The UUID of the line item
 * @param {string} productName Name of the product contained is this line item
 * @param {string} bonusProductLineItemUUID The UUID of the BonusProduct
 * @param {string} productType The type of the Product
 * @param {string} quantity Number of items to be purchased
 * @param {string} priceTotal  The price of the line item before applying adjustments, in the purchase currency, excluding tax
 * @param {string} price Unit price
 * @param {string} status status
 * @param {string} url url
 * @constructor
 */
function LineItem(id, productName, bonusProductLineItemUUID, productType, quantity, priceTotal, price, status, url) {
    this.UUID = id;
    this.productName = productName;
    this.bonusProductLineItemUUID = bonusProductLineItemUUID;
    this.productType = productType;
    this.quantity = quantity;
    this.priceTotal = priceTotal;
    this.price = price;
    this.status = status;
    this.url = url;

    this.images = null;
    this.variationAttributes = null;
    this.options = null;
    this.bonusProducts = null;
    this.availability = null;
}

LineItem.prototype.setVariationAttributes = function (variationAttributes) {
    this.variationAttributes = variationAttributes;
};

LineItem.prototype.setImages = function (images) {
    this.images = images;
};

/**
 * get image from SFCC product.
 * @param {dw.catalog.Product} apiProduct - API object for a product
 * @returns {Object} object with the image data.
 */
function getSFCCProductImage(apiProduct) {
    var mediaFile;
    var img;
    try {
        mediaFile = apiProduct.getImage('small');
        img = {
            url: mediaFile.getUrl().toString(),
            alt: mediaFile.getAlt(),
            title: mediaFile.getTitle()
        };
    } catch (e) {
        LomLogger.warn('LineItem.getSFCCProductImage::Error when trying to get product image based on the API response: {0}', JSON.stringify(e));
        img = {
            url: URLUtils.staticURL('/images/noimagelarge.png'),
            alt: Resource.msgf('msg.no.image', 'common', null),
            title: Resource.msgf('msg.no.image', 'common', null)
        };
    }

    return img;
}

/**
 * Get product's variation attributes
 * @param {Object} apiProduct - LOM OrderSummary data
 * @returns {Array} Array with the Variation Attributes.
 */
function getSFCCProductVariationAttributes(apiProduct) {
    var collections = require('*/cartridge/scripts/util/collections');
    var variationModel;
    var allAttrs;
    var selectedValue;
    var variationAttributes;
    try {
        variationModel = apiProduct.getVariationModel();
        allAttrs = variationModel.getProductVariationAttributes();
        variationAttributes = [];
        collections.forEach(allAttrs, function (attr) {
            selectedValue = variationModel.getSelectedValue(attr);
            if (selectedValue) {
                variationAttributes.push({
                    displayName: attr.displayName,
                    displayValue: selectedValue.displayValue
                });
            }
        });
    } catch (e) {
        variationAttributes = [];
        LomLogger.warn('LineItem.getSFCCProductVariationAttributes::Error when trying to get sfcc product data based on the API response: {0}', JSON.stringify(e));
    }
    return variationAttributes;
}

/**
 * get product name
 * @param {dw.catalog.Product} apiProduct - API object for a product
 * @param {string} lomProductDescription - Product description from LOM (to be used as fallback)
 * @returns {Object} object with the image data.
 */
function getProductName(apiProduct, lomProductDescription) {
    var productName;
    try {
        productName = apiProduct.getName();
        if (!productName) {
            productName = lomProductDescription;
        }
    } catch (error) {
        productName = lomProductDescription;
        LomLogger.warn('LineItem.getProductName::Error when trying to get sfcc product name based on the API response: {0}', JSON.stringify(error));
    }
    return productName;
}

/**
 * Returns an instance of LineItem model based on data returned by LOM API
 * @param {Object} orderItemSummary - LOM orderItemSummary data
 * @returns {LineItem} lineItem instance
 */
LineItem.get = function (orderItemSummary) {
    var ProductMgr = require('dw/catalog/ProductMgr');
    var apiProduct;
    var price;
    var priceTotal;
    var lineItem;
    var image;
    var variationAttr;
    var productName;
    var listUnitPrice;
    var salesUnitPrice;
    var url;

    apiProduct = ProductMgr.getProduct(orderItemSummary.ProductCode);
    listUnitPrice = orderItemSummary.TotalLineAmount / orderItemSummary.Quantity;
    salesUnitPrice = (orderItemSummary.TotalLineAmount + orderItemSummary.TotalLineAdjustmentAmount) / orderItemSummary.Quantity;
    price = {
        type: '',
        list: !(orderItemSummary.TotalLineAdjustmentAmount) ? null : {
            decimalPrice: parseInt(listUnitPrice, 10),
            formatted: lomHelper.formatMoney(listUnitPrice)
        },
        sales: {
            decimalPrice: parseInt(salesUnitPrice, 10),
            formatted: lomHelper.formatMoney(salesUnitPrice)
        }
    };

    priceTotal = {
        nonAdjustedPrice: !(orderItemSummary.TotalLineAdjustmentAmount) ? null : lomHelper.formatMoney(orderItemSummary.TotalLineAmount),
        price: lomHelper.formatMoney(orderItemSummary.TotalLineAmount + orderItemSummary.TotalLineAdjustmentAmount)
    };

    productName = getProductName(apiProduct, orderItemSummary.Description);

    if (apiProduct) {
        if (apiProduct.variant) {
            url = URLUtils.abs('Product-Show', 'pid', apiProduct.masterProduct.ID);
        } else {
            url = URLUtils.abs('Product-Show', 'pid', apiProduct.ID);
        }
    } else {
        url = null;
    }

    lineItem = new LineItem(
        orderItemSummary.Id,
        productName,
        '',
        orderItemSummary.Type,
        orderItemSummary.Quantity,
        priceTotal,
        price,
        orderItemSummary.Status,
        url
    );

    image = getSFCCProductImage(apiProduct);
    lineItem.setImages({ small: [image] });

    variationAttr = getSFCCProductVariationAttributes(apiProduct);
    lineItem.setVariationAttributes(variationAttr);
    return lineItem;
};

module.exports = LineItem;
