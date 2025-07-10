module.exports = function (product, apiProduct) {
    var isEditAllowed = true;

    // do not allow edit from cart if this is a product bundle with a bundled master or variation group
    if (apiProduct.isBundle() && apiProduct.bundledProducts.length) {
        for (var i = 0; i < apiProduct.bundledProducts.length; i++) {
            var bundledProduct = apiProduct.bundledProducts[i];
            if (bundledProduct.isMaster() || bundledProduct.isVariationGroup()) {
                isEditAllowed = false;
                break;
            }
        }
    }

    Object.defineProperty(product, 'editAllowed', {
        enumerable: true,
        value: isEditAllowed
    });
};
