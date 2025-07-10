var URLUtils = require('dw/web/URLUtils');

module.exports = function (product, apiProduct) {
    Object.defineProperty(product, 'url', {
        enumerable: true,
        value: URLUtils.url('Product-Show', 'pid', apiProduct.ID).toString()
    });
};
