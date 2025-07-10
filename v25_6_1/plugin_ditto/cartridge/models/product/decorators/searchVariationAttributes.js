'use strict';

var ATTRIBUTE_NAME = 'color';
var collections = require('*/cartridge/scripts/util/collections');
var ProductImageDIS = require('*/cartridge/scripts/helpers/ProductImageDIS');
var URLUtils = require('dw/web/URLUtils');

module.exports = function (object, hit) {
    Object.defineProperty(object, 'variationAttributes', {
        enumerable: true,
        value: (function () {
            var colors = hit.getRepresentedVariationValues(ATTRIBUTE_NAME);

            return [{
                attributeId: 'color',
                id: 'color',
                swatchable: true,
                values: collections.map(colors, function (color) {
                    var apiImage = ProductImageDIS.getImage(color, 'swatch');
                    if (!apiImage || !apiImage.scaleableImage) {
                        return {};
                    }
                    var swatch = [];
                    if (apiImage.scaleableImage) {
                        swatch.push({
                            alt: apiImage.alt,
                            url: apiImage.scaleableImage.URL.toString(),
                            title: apiImage.title
                        })
                    }
                    return {
                        id: color.ID,
                        description: color.description,
                        displayValue: color.displayValue,
                        value: color.value,
                        selectable: true,
                        selected: true,
                        images: {
                            swatch: swatch
                        },
                        url: URLUtils.url(
                            'Product-Show',
                            'pid',
                            hit.productID,
                            'dwvar_' + hit.productID + '_color',
                            color.value
                        ).toString()
                    };
                })
            }];
        }())
    });
};
