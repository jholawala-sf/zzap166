const priceFactory = require('*/cartridge/scripts/factories/price');
const productHelper = require('*/cartridge/scripts/helpers/productHelpers');
const ProductMgr = require('dw/catalog/ProductMgr');
const collections = require('*/cartridge/scripts/util/collections');
const ProductSearchModel = require('dw/catalog/ProductSearchModel');

/**
 * Get product search hit for a given product
 * @param {dw.catalog.Product} apiProduct - Product instance returned from the API
 * @returns {dw.catalog.ProductSearchHit} - product search hit for a given product
 */
function getProductSearchHit(apiProduct) {
    const searchModel = new ProductSearchModel();
    searchModel.setSearchPhrase(apiProduct.ID);
    searchModel.search();

    if (searchModel.count === 0) {
        searchModel.setSearchPhrase(apiProduct.ID.replace(/-/g, ' '));
        searchModel.search();
    }

    let hit = searchModel.getProductSearchHit(apiProduct);
    if (!hit) {
        const tempHit = searchModel.getProductSearchHits().next();
        if (tempHit.firstRepresentedProductID === apiProduct.ID) {
            hit = tempHit;
        }
    }
    return hit;
}

/**
 * Hook to add additional data to product request
 * @param {Object} doc the response document
 */
exports.modifyGETResponse = function (doc) {
    if (doc.hits) {
        collections.forEach(doc.hits, function (hit, index) {
            const apiProduct = ProductMgr.getProduct(hit.productId);
            const productHit = getProductSearchHit(apiProduct);
            const colors = productHit.getRepresentedVariationValues('color');
            const colorVariation = {
                id: 'color',
                values: collections.map(colors, function (color) {
                    var apiImage = color.getImage('swatch', 0);
                    if (!apiImage) {
                        return {};
                    }
                    return {
                        id: color.ID,
                        displayValue: color.displayValue,
                        images: {
                            swatch: [{
                                alt: apiImage.alt,
                                url: apiImage.URL.toString(),
                                title: apiImage.title
                            }]
                        }
                    };
                })
            };
            doc.hits[index].c_colorVariation = colorVariation;


            const params = { pid: apiProduct.ID };
            const options = productHelper.getConfig(apiProduct, params);
            const prices = priceFactory.getPrice(
                apiProduct,
                null,
                false,
                options.promotions,
                options.optionModel
            );

            doc.hits[index].c_prices = prices;
        });
    }
};
