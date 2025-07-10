module.exports = function (product, apiProduct) {
    Object.defineProperty(product, 'specifications', {
        enumerable: true,
        writable: true,
        value: apiProduct.custom.specifications || null
    });
};
