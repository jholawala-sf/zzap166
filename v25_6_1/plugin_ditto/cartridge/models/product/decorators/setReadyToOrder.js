'use strict';

module.exports = function (object) {
    Object.defineProperty(object, 'readyToOrder', {
        enumerable: true,
        value: (function () {
            return object.individualProducts.every(function (product) {
                return product.readyToOrder;
            });
        }())
    });
    // Redefine available here as it's available if the individual products are
    Object.defineProperty(object, 'available', {
        enumerable: true,
        value: (function () {
            return object.individualProducts.every(function (product) {
                return product.available;
            });
        }())
    });
};
