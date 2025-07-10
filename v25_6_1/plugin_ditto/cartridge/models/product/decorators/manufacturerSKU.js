'use strict';
module.exports = function (object, apiProduct) {
    var manufacturerSKU = apiProduct.manufacturerSKU;
    
    Object.defineProperty(object, 'manufacturerSKU', {
        enumerable: false,
        value: manufacturerSKU ==null ? 'No value' : manufacturerSKU
    });
};