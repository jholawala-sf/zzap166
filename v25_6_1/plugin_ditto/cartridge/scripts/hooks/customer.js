'use strict';

/**
 * When customer logs in, set shipping address for BOPIS shipments
 * if shipment.custom.fromStoreId is present
 */
function customerLoggedIn() {
    const isInStorePickupEnabled = require('*/cartridge/scripts/helpers/siteHelpers').getSitePreference('sfraEnableOverlayInStorePickup');
    if (!isInStorePickupEnabled) {
        return;
    }

    const currentBasket = require('dw/order/BasketMgr').getCurrentBasket();
    if (!currentBasket) return;

    const shipmentIter = currentBasket.shipments.iterator();
    while (shipmentIter.hasNext()) {
        require('*/cartridge/scripts/helpers/storeHelpers').updateShipmentsWithStoreAddress(shipmentIter.next());
    }
}

module.exports.loggedIn = customerLoggedIn;
