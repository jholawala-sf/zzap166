'use strict';

module.exports = function (object, apiProduct) {
    var productHelpers = require('*/cartridge/scripts/helpers/productHelpers');

    /**
     * get standard custom attributes
     */
    var customAttributes = [
        'bundleEnableBundledProductsDetails',
        'bundleUpdateMainCarouselOnVariationSelection'
    ];

    for (var i = 0; i < customAttributes.length; i++) {
        var customAttributeName = customAttributes[i];
        Object.defineProperty(object, customAttributeName, {
            enumerable: true,
            value: productHelpers.getProductCustomAttribute(apiProduct, customAttributeName)
        });
    }

    /**
     * custom attributes that require a custom function go here
     */
};
