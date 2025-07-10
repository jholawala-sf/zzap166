
/**
 * This can be used to update the basket server side, if for instance we need to call a tax service or sync the basket.
 * The client app can retrieve this updated basket by doing a PATCH request.
 */
// eslint-disable-next-line no-unused-vars
exports.beforePATCH = function (basket, basketInput) {
    var productLineItems = basket.getProductLineItems();

    /** pass on something to ensure hooks are executed */
    for (var i = 0; i < productLineItems.length; i += 1) {
        productLineItems[i].setLineItemText('PRODUCT ' + productLineItems[i].getLineItemText());
    }
};
// eslint-disable-next-line no-unused-vars
exports.validateBasket = function (basketResponse, duringSubmit) {
    /** add custom infos here. E.g. certain itmes cannot be checked out because of local shipping restrictions */
};
