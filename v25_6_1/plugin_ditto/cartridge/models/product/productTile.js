const base = module.superModule;
const raw = require('*/cartridge/models/product/decorators/raw');
const isNew = require('*/cartridge/models/product/decorators/isNew');
const isOnSale = require('*/cartridge/models/product/decorators/isOnSale');
const category = require('*/cartridge/models/product/decorators/category');
const manufacturerSKU = require('*/cartridge/models/product/decorators/manufacturerSKU');

/**
 * Decorate product with product tile information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {string} productType - Product type information
 *
 * @returns {Object} - Decorated product model
 */
module.exports = function productTile(product, apiProduct, productType) {
    base.call(this, product, apiProduct, productType);

    raw(product, apiProduct);
    isNew(product, apiProduct);
    isOnSale(product);
    category(product, apiProduct);
    manufacturerSKU(product, apiProduct);

    return product;
};
