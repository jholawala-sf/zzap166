'use strict';

var base = module.superModule;

/**
 * Determines if the provided shipment is an in-store pickup shipment
 * if it is, return the store address and shipping method so the
 * shipping address can be set via checkoutHelpers.copyShippingAddressToShipment
 * @param {dw.order.Shipment} shipment - current shipment
 * @returns {Object|null} store address object
 */
function getStoreAddressFromShipment(shipment) {
    const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');
    if (!shipment) return null;

    var shipmentType = siteHelpers.getCustomAttributeFromObject(shipment, 'shipmentType');
    var storeId = siteHelpers.getCustomAttributeFromObject(shipment, 'fromStoreId');
    var isStorePickupEnabled = shipment.shippingMethodID ? !!siteHelpers.getCustomAttributeFromObject(shipment.shippingMethod, 'storePickupEnabled') : false;

    if (shipmentType === 'instore' && isStorePickupEnabled && storeId) {
        var store = require('dw/catalog/StoreMgr').getStore(storeId);
        if (!store) {
            return null;
        }
        return {
            address: {
                firstName: store.name,
                lastName: '',
                address1: store.address1,
                address2: store.address2,
                city: store.city,
                stateCode: store.stateCode,
                postalCode: store.postalCode,
                countryCode: store.countryCode.value,
                phone: store.phone
            },
            shippingMethod: shipment.shippingMethodID
        };
    }

    return null;
}

/**
 * updates shipment shipping address with store address
 * if shipment is marked as in-store pickup
 * @param {dw.order.Shipment} shipment - current shipment
 */
function updateShipmentsWithStoreAddress(shipment) {
    const checkoutHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
    if (!shipment) return;
    try {
        const storeAddress = getStoreAddressFromShipment(shipment);
        if (storeAddress && Object.keys(storeAddress).length) {
            checkoutHelpers.copyShippingAddressToShipment(storeAddress, shipment);
        }
    } catch (e) {
        require('dw/system/Logger').error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
    }
}

module.exports = {
    updateShipmentsWithStoreAddress: updateShipmentsWithStoreAddress
};

Object.keys(base).forEach(function (prop) {
    // eslint-disable-next-line no-prototype-builtins
    if (!module.exports.hasOwnProperty(prop)) {
        module.exports[prop] = base[prop];
    }
});
