const base = module.superModule;
const url = require('*/cartridge/models/productLineItem/decorators/url');

/**
 * Decorate product with product line item information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 * @returns {Object} - Decorated product model
 */
module.exports = function orderLineItem(product, apiProduct, options) {
    base.call(this, product, apiProduct, options);

    url(product, apiProduct);

    return product;
};
