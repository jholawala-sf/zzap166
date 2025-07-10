'use strict';

const base = module.superModule;

function addAddress(shipment, allAddresses) {
    if (!shipment) return;
    // do not save BOPIS addresses to my account
    var hasStoreID = shipment.custom && shipment.custom.fromStoreId;
    if (!hasStoreID && shipment.shippingAddress) {
        allAddresses.push(base.copyShippingAddress(shipment.shippingAddress));
    }
}

/**
 * Gather all addresses from shipments and return as an array
 * @param {dw.order.Basket} order - current order
 * @returns {Array} - Array of shipping addresses
 */
function gatherShippingAddresses(order) {
    var collections = require('*/cartridge/scripts/util/collections');
    var allAddresses = [];

    if (order.shipments) {
        collections.forEach(order.shipments, function (shipment) {
            addAddress(shipment, allAddresses);
        });
    } else {
        addAddress(order.defaultShipment, allAddresses);
    }
    return allAddresses;
}

module.exports = Object.assign({}, base, {
    gatherShippingAddresses: gatherShippingAddresses
});
