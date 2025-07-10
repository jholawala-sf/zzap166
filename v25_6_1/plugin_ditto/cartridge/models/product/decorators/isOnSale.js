module.exports = function (product) {
    Object.defineProperty(product, 'isOnSale', {
        enumerable: true,
        value: !!product.price.sales && product.price.list
    });
};
