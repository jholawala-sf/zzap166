'use strict';

var priceFactory = require('*/cartridge/scripts/factories/price');

module.exports = function (object, product) {
    var salesFormatted = object.price && object.price.sales && object.price.sales.formatted;
    var minSalesFormatted = object.price && object.price.min && object.price.min.sales && object.price.min.sales.formatted;
    if (salesFormatted || minSalesFormatted) {
        return;
    }
    Object.defineProperty(object, 'price', {
        enumerable: true,
        value: priceFactory.getProductSetPrice(product)
    });
};
