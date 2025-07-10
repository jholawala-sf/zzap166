module.exports = function (product, apiProduct) {
    Object.defineProperty(product, 'recommendations', {
        enumerable: true,
        value: apiProduct.getOrderableRecommendations()
    });
};
