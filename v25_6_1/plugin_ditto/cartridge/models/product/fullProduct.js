const base = module.superModule;
const decorators = require("*/cartridge/models/product/decorators/index");
const isNew = require("*/cartridge/models/product/decorators/isNew");
const isOnSale = require("*/cartridge/models/product/decorators/isOnSale");
const recommendations = require("*/cartridge/models/product/decorators/recommendations");
var features = require("*/cartridge/models/product/decorators/features");
var specifications = require("*/cartridge/models/product/decorators/specifications");
const categoryDec = require("*/cartridge/models/product/decorators/category");

/**
 * Decorate product with full product information
 * @param {Object} product - Product Model to be decorated
 * @param {dw.catalog.Product} apiProduct - Product information returned by the script API
 * @param {Object} options - Options passed in from the factory
 *
 * @returns {Object} - Decorated product model
 */
module.exports = function fullProduct(product, apiProduct, options) {
    base.call(this, product, apiProduct, options);

    var category = apiProduct.getPrimaryCategory();
    if (
        !category &&
        options.productType !== "master" &&
        options.productType !== "standard"
    ) {
        category = apiProduct.getMasterProduct().getPrimaryCategory();
    }

    if (!category) {
        category = apiProduct.getPrimaryCategory();
    }

    if (category) {
        decorators.sizeChart(product, category.custom.sizeChartID);
    }

    Object.defineProperty(product, "masterId", {
        enumerable: true,
        value:
            apiProduct.variant || apiProduct.variationGroup
                ? apiProduct.masterProduct.ID
                : apiProduct.ID,
    });

    // parent ID is the master if it's assigned to the site. Otherwise the current product
    Object.defineProperty(product, "parentId", {
        enumerable: true,
        value:
            (apiProduct.variant || apiProduct.variationGroup) &&
            apiProduct.masterProduct.assignedToSiteCatalog
                ? apiProduct.masterProduct.ID
                : apiProduct.ID,
    });

    isNew(product, apiProduct);
    isOnSale(product);
    recommendations(product, apiProduct);
    features(product, apiProduct);
    specifications(product, apiProduct);
    categoryDec(product, apiProduct);

    return product;
};
