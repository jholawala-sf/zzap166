'use strict';

const base = module.superModule;
const decorators = require('*/cartridge/models/product/decorators/index');

/**
 * Decorate product with set product information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 * @property {dw.catalog.ProductVarationModel} options.variationModel - Variation model returned by the API
 * @property {Object} options.options - Options provided on the query string
 * @property {dw.catalog.ProductOptionModel} options.optionModel - Options model returned by the API
 * @property {dw.util.Collection} options.promotions - Active promotions for a given product
 * @property {number} options.quantity - Current selected quantity
 * @property {Object} options.variables - Variables passed in on the query string
 * @param {Object} factory - Reference to product factory
 *
 * @returns {Object} - Set product
 */

module.exports = function setProduct(product, apiProduct, options, factory) {
    base.call(this, product, apiProduct, options, factory);
    decorators.productSetPrice(product, apiProduct, options.promotions, false, options.options);
    return product;
};
