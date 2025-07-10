const priceFactory = require('*/cartridge/scripts/factories/price');
const productHelper = require('*/cartridge/scripts/helpers/productHelpers');
const ProductMgr = require('dw/catalog/ProductMgr');
const ImageModel = require('*/cartridge/models/product/productImages');
const collections = require('*/cartridge/scripts/util/collections');

/**
 * Hook to add additional data to product request
 * @param {Object} doc the response document
 */
exports.modifyGETResponse = function (doc) {
    if (doc.productSuggestions && 'products' in doc.productSuggestions) {
        collections.forEach(doc.productSuggestions.products, function (productHit, index) {
            const apiProduct = ProductMgr.getProduct(productHit.productId);
            const images = new ImageModel(apiProduct, { types: ['large'], quantity: 'single' });
            doc.productSuggestions.products[index].c_images = images;

            const params = { pid: apiProduct.ID };
            const options = productHelper.getConfig(apiProduct, params);
            const prices = priceFactory.getPrice(
                apiProduct,
                null,
                false,
                options.promotions,
                options.optionModel
            );

            doc.productSuggestions.products[index].c_prices = prices;
        });
    }
};
