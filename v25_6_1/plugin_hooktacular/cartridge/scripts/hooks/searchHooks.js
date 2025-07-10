
exports.modifyGETResponse = function (searchResponse) {
    if (searchResponse && searchResponse.count > 0) {
        var hits = searchResponse.hits.toArray();

        hits.forEach(function (hit) {
            if (hit.represented_product) {
                var productApi = require('*/cartridge/scripts/apis/productExtend');
                hit.c_extend = productApi.createExtendedProduct(hit.represented_product.id);
            }
        });
    }
};

