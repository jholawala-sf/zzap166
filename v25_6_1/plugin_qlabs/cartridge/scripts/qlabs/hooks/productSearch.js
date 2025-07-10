'use strict';

const Logger = require('dw/system/Logger').getLogger('ocapi', 'product_search');
const ProductMgr = require('dw/catalog/ProductMgr');
const productUtils = require('*/cartridge/scripts/qlabs/productUtils');

exports.modifyGETResponse = function (searchResponse) {
    try {
        // log the request parameters and request query string
        if (request.httpParameterMap && request.httpParameterMap.getParameterCount() > 0) {
            const logObject = {
                querystring: request.httpQueryString,
                parameters: {}
            };
            request.httpParameterMap.parameterNames.toArray().forEach(function(param) {
                logObject.parameters[param] = request.httpParameterMap.get(param).values.toArray();
            });
            Logger.debug('Product search parameters: ' + JSON.stringify(logObject));
        }

        if (searchResponse && searchResponse.hits && searchResponse.hits.length > 0) {
            var hits = searchResponse.hits.toArray();

            hits.forEach(function (hit) {
                if (hit.productId) {
                    var product = ProductMgr.getProduct(hit.productId);
                    if (hit.representedProduct && hit.representedProduct.ID) {
                        product = ProductMgr.getProduct(hit.representedProduct.ID);
                    }

                    hit.c_representedProductId = product.ID;
                    hit.c_description = productUtils.getProductDescription(product);
                    hit.c_imageUrl = productUtils.getProductImage(product);
                    hit.c_masterProductId = productUtils.getMasterProductId(product);
                    hit.c_productUrl = productUtils.getProductUrl(product.ID);
                }
            });
        }
    } catch (e) {
        Logger.error('Error in dw.ocapi.shop.product_search.modifyGETResponse: {0}', e.message);
    }
};
