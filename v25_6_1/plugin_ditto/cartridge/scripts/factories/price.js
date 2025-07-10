'use strict';

var money = require('dw/value/Money');
const base = module.superModule;
const priceHelper = require('*/cartridge/scripts/helpers/pricing');
const DefaultPrice = require('*/cartridge/models/price/default');

/**
 * Get list price for a product
 *
 * @param {dw.catalog.ProductPriceModel} priceModel - Product price model
 * @return {dw.value.Money} - List price
 */
function getListPrice(priceModel) {
    var price = money.NOT_AVAILABLE;
    var priceBook;
    var priceBookPrice;

    if (priceModel.price.valueOrNull === null && priceModel.minPrice) {
        return priceModel.minPrice;
    }

    priceBook = priceHelper.getRootPriceBook(priceModel.priceInfo.priceBook);
    priceBookPrice = priceModel.getPriceBookPrice(priceBook.ID);

    if (priceBookPrice.available) {
        return priceBookPrice;
    }

    price = priceModel.price.available ? priceModel.price : priceModel.minPrice;

    return price;
}

/**
 * Retrieves price for prodect set
 *
 * @param {dw.catalog.Product|dw.catalog.productSearchHit} inputProduct - API object for a product
 * @return {DefaultPrice} - The product's price
 */
function getProductSetPrice(inputProduct) {
    var minListPrice = null;
    var minSalesPrice = null;
    var priceModel;
    if (inputProduct && inputProduct.isProductSet()) {
        const productsIterator = inputProduct.getProductSetProducts().iterator();
        while (productsIterator && productsIterator.hasNext()) {
            var product = productsIterator.next();
            if (product.isOnline() && product.isSearchable()) {
                if (product.isMaster() || product.isVariationGroup()) {
                    var defaultVariant = product;
                    if (product.variationModel.defaultVariant) {
                        defaultVariant = product.variationModel.defaultVariant;
                    } else if (product.variationModel && product.variationModel.variants.length > 0) {
                        defaultVariant = product.variationModel.variants[0];
                    }
                    priceModel = defaultVariant.getPriceModel();
                } else {
                    priceModel = product.getPriceModel();
                }
                if (priceModel) {
                    var listPrice = getListPrice(priceModel);
                    var salesPrice = priceModel.price;
                    if (listPrice && listPrice.available && (minListPrice === null || listPrice.value < minListPrice.value)) {
                        minListPrice = listPrice;
                    }

                    if (salesPrice && salesPrice.available && (minSalesPrice === null || salesPrice.value < minSalesPrice.value)) {
                        minSalesPrice = salesPrice;
                    }
                }
            }
        }
    }
    return new DefaultPrice(minSalesPrice, minListPrice);
}

base.getProductSetPrice = getProductSetPrice;
module.exports = base;
