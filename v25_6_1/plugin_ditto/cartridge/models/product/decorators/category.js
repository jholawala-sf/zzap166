module.exports = function (product, apiProduct) {
    Object.defineProperty(product, 'category', {
        enumerable: false,
        value: apiProduct.primaryCategory || null
    });
};
