const ShippingMgr = require('dw/order/ShippingMgr');

/**
 * Hook to add additional data to basket request
 * @param {dw.catalog.Basket} basket an instance of dw.catalog.Basket
 */
exports.beforePOST = function (basket) {
    const defaultShippingMethod = ShippingMgr.getDefaultShippingMethod();
    const shipment = basket.getDefaultShipment();
    if (defaultShippingMethod && shipment) {
        shipment.setShippingMethod(defaultShippingMethod);
    }
};
