var customerPromotions = dw.campaign.PromotionMgr.getActiveCustomerPromotions();
/**
 *  Converts a product into a extended object
 *  @param {string} productId  the product id to get infos from
 *  @returns {Object} the mini product
 */
function createExtendedProduct(productId) {
    var staticCache = dw.system.CacheMgr.getCache('ProductExtendStatic');
    var product = dw.catalog.ProductMgr.getProduct(productId);

    if (!product) {
        return null;
    }
    // try to cache if we can
    var resultSealed = staticCache.get(productId + ';' + request.locale, function () {
        var priceModel = product.priceModel;
        if (!priceModel) {
            return null;
        }
        var originalPrice = priceModel.price;
        var activePriceBookId;
        var salePrice = priceModel.price;
        var parentPriceBookID;
        if (!empty(priceModel) && !empty(priceModel.priceInfo)) {
            activePriceBookId = priceModel.priceInfo.priceBook.ID;
            if (!empty(priceModel.priceInfo.priceBook.parentPriceBook)) {
                parentPriceBookID = priceModel.priceInfo.priceBook.parentPriceBook.ID;
                originalPrice = priceModel.getPriceBookPrice(parentPriceBookID);
            }
        }

        return {
            masterProductId: product.variationModel.master ? product.variationModel.master.ID : product.ID,
            priceInfo: {
                originalPrice: {
                    value: originalPrice.value,
                    currency: originalPrice.currencyCode,
                    pricebook: parentPriceBookID || activePriceBookId
                },
                salePrice: {
                    value: salePrice.value,
                    currency: salePrice.currencyCode,
                    pricebook: activePriceBookId
                }
            }
        };
    });

    // make cache entry editable, as it is sealed otherweise
    var result = JSON.parse(JSON.stringify(resultSealed));
    result.id = productId;
    var promos = customerPromotions.getProductPromotions(product).iterator();
    if (promos.hasNext()) {
        var promo = promos.next();
        // add personalized information to cache entry
        var dynamicCache = dw.system.CacheMgr.getCache('ProductExtendDynamic');
        var promotionPrice = dynamicCache.get(productId + ';' + promo.ID + ';' + request.locale, function () {
            var promoPrice = promo.getPromotionalPrice(product);
            return {
                value: promoPrice.value,
                currency: promoPrice.currencyCode,
                promoDetails: {
                    id: promo.ID,
                    name: promo.name ? promo.name.toString() : null,
                    callOut: promo.calloutMsg ? promo.calloutMsg.toString() : null,
                    details: promo.details ? promo.details.toString() : null,
                    image: promo.image ? promo.image.absURL : null
                }
            };
        });

        result.priceInfo.promotionPrice = promotionPrice;
    }
    return result;
}

exports.get = function (httpParams) {
    var products = httpParams.c_products.pop().replace('(', '').replace(')', '').split(',');
    var result = products.map(createExtendedProduct);
    return result;
};
exports.createExtendedProduct = createExtendedProduct;
