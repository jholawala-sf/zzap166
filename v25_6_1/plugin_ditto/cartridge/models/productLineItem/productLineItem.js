const base = module.superModule;
const pliDecorators = require('*/cartridge/models/productLineItem/decorators/index');

function documentation(product, apiProduct, lineItem) {
    Object.defineProperty(product, 'documentationRequired', {
        enumerable: true,
        value: !!lineItem.custom.documentationRequired
    });
    Object.defineProperty(product, 'documentationWorkflowPage', {
        enumerable: true,
        value: apiProduct.custom.documentationWorkflowPage
    });
}

/**
 * Decorate product with product line item information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 * @property {dw.catalog.ProductVarationModel} options.variationModel - Variation model returned by the API
 * @property {Object} options.lineItemOptions - Options provided on the query string
 * @property {dw.catalog.ProductOptionModel} options.currentOptionModel - Options model returned by the API
 * @property {dw.util.Collection} options.promotions - Active promotions for a given product
 * @property {number} options.quantity - Current selected quantity
 * @property {Object} options.variables - Variables passed in on the query string
 *
 * @returns {Object} - Decorated product model
 */
module.exports = function productLineItem(product, apiProduct, options) {
    base.call(this, product, apiProduct, options);

    pliDecorators.url(product, apiProduct);
    pliDecorators.editAllowed(product, apiProduct);
    documentation(product, apiProduct, options.lineItem);

    return product;
};
