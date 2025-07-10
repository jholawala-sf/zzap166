
/**
 * passes eventual error codes to the API consumer
 * @param basket {dw.order.Basket} the basket to add the coupon to
 * @param couponItem {object} the couponsn request
 * @returns status {dw.system.Status} the status of this request
 */
// eslint-disable-next-line
exports.beforePOST = function (basket, couponItem) {
    var status;
    try {
        var line = basket.createCouponLineItem(couponItem.code, true);
        basket.removeCouponLineItem(line);
    } catch (e) {
        status = e.errorCode;
    }
    if (status) {
        return new dw.system.Status(dw.system.Status.ERROR, status);
    }
};
