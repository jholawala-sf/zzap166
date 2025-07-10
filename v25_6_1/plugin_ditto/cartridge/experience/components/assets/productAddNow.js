'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {

    var ProductFactory = require('*/cartridge/scripts/factories/product');
    var model = new HashMap();
    var content = context.content;

    model.id = 'shop-now-' + context.component.getID();
    
    var productTileParams1 = {
        pview: 'tile',
        pid: content.product1.ID
    };
    model.productTileParams1 = productTileParams1;
    var product1 = ProductFactory.get(productTileParams1);

    model.productUrl1 = URLUtils.url('Product-Show', 'pid', product1.id).relative().toString();
    model.product1 = product1;

    model.product = {
        btnColour: !empty(content.btn_colour) ? content.btn_colour.color : 'var(--primary)',
        borderColour: !empty(content.btn_border) ? content.btn_border.color : '', 

    }


    return new Template('experience/components/assets/productAddNow').render(model).text;
};