'use strict';

/**
 * check if the product attribute for the specified product ID already exists
 * @param {object} attributes - the attributes object
 * @param {string} attrLabel - the attribute to check
 * @param {string} pid - the product ID to check
 */
const doesProductAttributeExist = (attributes, attrLabel, pid) => {
    const filteredArray = attributes[attrLabel].values.filter((value) => value.pid === pid);
    return filteredArray.length > 0;
}

/**
 * @constructor
 * @desc Get an ordered list of product attributes
 *
 * @param {Product} products - Selected products instantiated through productFactory
 */
function CompareAttributesModel(products) {
    var attributes = {};
    var sorted = [];

    products.forEach(function (product) {
        if (product.attributes) {
            product.attributes.forEach(function (productAttr) {
                var isMainAttr = productAttr.ID === 'mainAttributes';
                productAttr.attributes.forEach(function (attr) {
                    if (!attributes[attr.label]) {
                        attributes[attr.label] = {
                            values: [],
                            order: isMainAttr ? 0 : 1
                        };
                    }
                    // ensure the attribute value for this product does not already exist
                    if (!doesProductAttributeExist(attributes, attr.label, product.id)) {
                        attributes[attr.label].values.push({
                            pid: product.id,
                            values: attr.value.join(',')
                        });
                    }
                });
            });
        }
    });

    Object.keys(attributes).sort(function (a, b) {
        return attributes[a].order - attributes[b].order;
    }).forEach(function (key) {
        if (attributes[key].values.length === products.length) {
            var attrs = attributes[key];
            attrs.displayName = key;
            sorted.push(attrs);
        }
    });
    sorted.forEach(function (attr) {
        this.push(attr);
    }, this);
}

CompareAttributesModel.prototype = [];

module.exports = CompareAttributesModel;
