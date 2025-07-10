'use strict';

var base = require('app_storefront_base/cartridge/scripts/cart/cartHelpers');

var StoreMgr = require('dw/catalog/StoreMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var ProductInventoryMgr = require('dw/catalog/ProductInventoryMgr');
var ShippingMgr = require('dw/order/ShippingMgr');
var UUIDUtils = require('dw/util/UUIDUtils');
var Resource = require('dw/web/Resource');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
var arrayHelper = require('*/cartridge/scripts/util/array');
var collections = require('*/cartridge/scripts/util/collections');
var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var overlayHelper = require('*/cartridge/scripts/overlayHelper');
var PERPETUAL_QTY = 1000;

/**
 * Replaces Bundle master product items with their selected variants
 *
 * @param {dw.order.ProductLineItem} apiLineItem - Cart line item containing Bundle
 * @param {string[]} childProducts - List of bundle product item ID's with chosen product variant
 *     ID's
 */
function updateBundleProducts(apiLineItem, childProducts) {
    var bundle = apiLineItem.product;
    var bundleProducts = bundle.getBundledProducts();
    var bundlePids = collections.map(bundleProducts, function (product) { return product.ID; });
    var selectedProducts = childProducts.filter(function (product) {
        return bundlePids.indexOf(product.pid) === -1;
    });
    var bundleLineItems = apiLineItem.getBundledProductLineItems();

    selectedProducts.forEach(function (product) {
        var selectedProduct = ProductMgr.getProduct(product.pid);

        collections.forEach(bundleLineItems, function (item) {
            if ((selectedProduct.variant || selectedProduct.variationGroup) && item.productID === selectedProduct.masterProduct.ID) {
                item.replaceProduct(selectedProduct);
            }
        });
    });
}

/**
 * Determines whether a product's current instore pickup store setting are
 * the same as the previous selected
 *
 * @param {string} existingStoreId - store id currently associated with this product
 * @param {string} selectedStoreId - store id just selected
 * @return {boolean} - Whether a product's current store setting is the same as
 * the previous selected
 */
function hasSameStore(existingStoreId, selectedStoreId) {
    return existingStoreId === selectedStoreId;
}

/**
 * Get the existing in store pickup shipment in cart by storeId
 * @param {dw.order.Basket} basket - the target Basket object
 * @param {string} storeId - store id
 * @return {dw.order.Shipment} returns Shipment object if the existing shipment has the same storeId
 */
function getInStorePickupShipmentInCartByStoreId(basket, storeId) {
    var existingShipment = null;
    if (basket && storeId) {
        var shipments = basket.getShipments();
        if (shipments.length) {
            existingShipment = arrayHelper.find(shipments, function (shipment) {
                return hasSameStore(shipment.custom.fromStoreId, storeId);
            });
        }
    }
    return existingShipment;
}

/**
 * create a new instore pick shipment if the store shipment
 * is not exist in the basket for adding product line item
 * @param {dw.order.Basket} basket - the target Basket object
 * @param {string} storeId - store id
 * @param {Object} req - The local instance of the request object
 * @return {dw.order.Shipment} returns Shipment object
 */
function createInStorePickupShipmentForLineItem(basket, storeId, req) {
    var shipment = null;
    if (basket && storeId) {
        // check if the instore pickup shipment is already exist.
        shipment = getInStorePickupShipmentInCartByStoreId(basket, storeId);
        if (!shipment) {
            // create a new shipment to put this product line item in
            shipment = basket.createShipment(UUIDUtils.createUUID());
            shipment.custom.fromStoreId = storeId;
            shipment.custom.shipmentType = 'instore';
            req.session.privacyCache.set(shipment.UUID, 'valid');

            // Find in-store method in shipping methods.
            var shippingMethods = ShippingMgr.getShipmentShippingModel(shipment).getApplicableShippingMethods();
            var shippingMethod = collections.find(shippingMethods, function (method) {
                return method.custom.storePickupEnabled;
            });
            var store = StoreMgr.getStore(storeId);
            var storeAddress = {
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
                shippingMethod: shippingMethod.ID
            };
            COHelpers.copyShippingAddressToShipment(storeAddress, shipment);
        }
    }
    return shipment;
}

/**
 * Loops through all Shipments and attempts to select a ShippingMethod, where absent
 * @param {dw.catalog.Product} product - Product object
 * @param {string} productId - Product ID to match
 * @param {dw.util.Collection<dw.order.ProductLineItem>} productLineItems - Collection of the Cart's
 *     product line items
 * @param {string[]} childProducts - the products' sub-products
 * @param {SelectedOption[]} options - product options
 * @param {string} storeId - store id
 * @return {dw.order.ProductLineItem} - Filtered the product line item matching productId
 *  and has the same bundled items or options and the same instore pickup store selection
 */
function getExistingProductLineItemInCartWithTheSameStore(
    product,
    productId,
    productLineItems,
    childProducts,
    options,
    storeId) {
    var existingProductLineItem = null;
    var matchingProducts = base.getExistingProductLineItemsInCart(
        product,
        productId,
        productLineItems,
        childProducts,
        options);
    if (matchingProducts.length) {
        existingProductLineItem = arrayHelper.find(matchingProducts, function (matchingProduct) {
            return hasSameStore(matchingProduct.custom.fromStoreId, storeId);
        });
    }
    return existingProductLineItem;
}

/**
 * Check if the bundled product can be added to the cart
 * @param {string[]} childProducts - the products' sub-products
 * @param {dw.util.Collection<dw.order.ProductLineItem>} productLineItems - Collection of the Cart's
 *     product line items
 * @param {number} quantity - the number of products to the cart
 * @return {boolean} - return true if the bundled product can be added
 */
function checkBundledProductCanBeAdded(childProducts, productLineItems, quantity) {
    var atsValueByChildPid = {};
    var totalQtyRequested = 0;
    var canBeAdded = false;
    var availableToSell;

    childProducts.forEach(function (childProduct) {
        var apiChildProduct = ProductMgr.getProduct(childProduct.pid);
        if (!apiChildProduct.availabilityModel.inventoryRecord) {
            if (ProductInventoryMgr.getInventoryList() && ProductInventoryMgr.getInventoryList().getDefaultInStockFlag()) {
                availableToSell = PERPETUAL_QTY;
            } else {
                availableToSell = 0;
            }
        } else {
            availableToSell = apiChildProduct.availabilityModel.inventoryRecord.perpetual
                ? PERPETUAL_QTY
                : apiChildProduct.availabilityModel.inventoryRecord.ATS.value;
        }
        atsValueByChildPid[childProduct.pid] = availableToSell;
    });

    canBeAdded = childProducts.every(function (childProduct) {
        var bundleQuantity = quantity;
        var itemQuantity = bundleQuantity * childProduct.quantity;
        var childPid = childProduct.pid;
        totalQtyRequested = itemQuantity + base.getQtyAlreadyInCart(childPid, productLineItems);
        return totalQtyRequested <= atsValueByChildPid[childPid];
    });

    return canBeAdded;
}

/**
 * Adds a line item for this product to the Cart
 *
 * @param {dw.order.Basket} currentBasket -
 * @param {dw.catalog.Product} product -
 * @param {number} quantity - Quantity to add
 * @param {string[]}  childProducts - the products' sub-products
 * @param {dw.catalog.ProductOptionModel} optionModel - the product's option model
 * @param {dw.order.Shipment} defaultShipment - the cart's default shipment method
 * @return {dw.order.ProductLineItem} - The added product line item
 */
function addLineItem(
    currentBasket,
    product,
    quantity,
    childProducts,
    optionModel,
    defaultShipment
) {
    var productLineItem = currentBasket.createProductLineItem(
        product,
        optionModel,
        defaultShipment
    );

    if (product.bundle && childProducts.length) {
        updateBundleProducts(productLineItem, childProducts);
    }

    productLineItem.setQuantityValue(quantity);

    return productLineItem;
}

/**
 * Adds a product to the cart. If the product is already in the cart it increases the quantity of
 * that product.
 * @param {dw.order.Basket} currentBasket - Current users's basket
 * @param {string} productId - the productId of the product being added to the cart
 * @param {number} quantity - the number of products to the cart
 * @param {string[]} childProducts - the products' sub-products
 * @param {SelectedOption[]} options - product options
 * @param {string} storeId - store id
 * @param {Object} req - The local instance of the request object
 * @return {Object} returns an error object
 */
function addProductToCart(currentBasket, productId, quantity, childProducts, options, storeId, req) {
    var inStorePickupEnabled = overlayHelper.isPluginEnabled('InStorePickup');

    var availableToSell;
    var defaultShipment = currentBasket.defaultShipment;
    var perpetual;
    var product = ProductMgr.getProduct(productId);
    var productInCart;
    var productLineItems = currentBasket.productLineItems;
    var productQuantityInCart;
    var quantityToSet;
    var optionModel = productHelper.getCurrentOptionModel(product.optionModel, options);
    var result = {
        error: false,
        message: Resource.msg('text.alert.addedtobasket', 'product', null)
    };

    var totalQtyRequested = 0;
    var canBeAdded = false;

    if (!product) {
        result.error = true;
        result.message = Resource.msg('error.alert.product.cannot.be.added', 'product', null);
        return result;
    }

    if (Number.isNaN(quantity)) {
        quantity = 1; // eslint-disable-line no-param-reassign
    }

    if (product.bundle) {
        canBeAdded = checkBundledProductCanBeAdded(childProducts, productLineItems, quantity);
    } else {
        totalQtyRequested = quantity + base.getQtyAlreadyInCart(productId, productLineItems);
        if (!product.availabilityModel.inventoryRecord) {
            if (ProductInventoryMgr.getInventoryList() && ProductInventoryMgr.getInventoryList().getDefaultInStockFlag()) {
                perpetual = true;
                canBeAdded = true;
            } else {
                perpetual = false;
                canBeAdded = false;
            }
        } else {
            perpetual = product.availabilityModel.inventoryRecord.perpetual;
            canBeAdded = (perpetual || totalQtyRequested <= product.availabilityModel.inventoryRecord.ATS.value);
        }
    }

    if (!canBeAdded) {
        result.error = true;
        result.message = Resource.msgf(
            'error.alert.selected.quantity.cannot.be.added.for',
            'product',
            null,
            product.availabilityModel.inventoryRecord.ATS.value,
            product.name
        );
        return result;
    }

    if (inStorePickupEnabled) {
        // Get the existing product line item from the basket if the new product item
        // has the same bundled items or options and the same instore pickup store selection
        productInCart = getExistingProductLineItemInCartWithTheSameStore(product, productId, productLineItems, childProducts, options, storeId);
    } else {
        productInCart = base.getExistingProductLineItemInCart(product, productId, productLineItems, childProducts, options);
    }

    if (productInCart) {
        productQuantityInCart = productInCart.quantity.value;
        quantityToSet = quantity ? quantity + productQuantityInCart : productQuantityInCart + 1;
        if (!productInCart.product.availabilityModel.inventoryRecord) {
            if (ProductInventoryMgr.getInventoryList() && ProductInventoryMgr.getInventoryList().getDefaultInStockFlag()) {
                availableToSell = PERPETUAL_QTY;
            } else {
                availableToSell = 0;
            }
        } else {
            availableToSell = productInCart.product.availabilityModel.inventoryRecord.perpetual
                ? PERPETUAL_QTY
                : productInCart.product.availabilityModel.inventoryRecord.ATS.value;
        }

        if (availableToSell >= quantityToSet || perpetual) {
            productInCart.setQuantityValue(quantityToSet);
            result.uuid = productInCart.UUID;
        } else {
            result.error = true;
            result.message = availableToSell === productQuantityInCart
                ? Resource.msg('error.alert.max.quantity.in.cart', 'product', null)
                : Resource.msg('error.alert.selected.quantity.cannot.be.added', 'product', null);
        }
    } else {
        var productLineItem;

        var shipment = defaultShipment;
        if (inStorePickupEnabled) {
            // Create a new instore pickup shipment as default shipment for product line item
            // if the shipment if not exist in the basket
            var inStoreShipment = createInStorePickupShipmentForLineItem(currentBasket, storeId, req);
            shipment = inStoreShipment || defaultShipment;

            if (shipment.shippingMethod && shipment.shippingMethod.custom.storePickupEnabled && !storeId) {
                shipment = currentBasket.createShipment(UUIDUtils.createUUID());
            }
        }

        productLineItem = addLineItem(
            currentBasket,
            product,
            quantity,
            childProducts,
            optionModel,
            shipment
        );

        if (inStorePickupEnabled) {
            // Once the new product line item is added, set the instore pickup fromStoreId for the item
            if (productLineItem.product.custom.availableForInStorePickup) {
                if (storeId) {
                    var instorePickupStoreHelper = require('*/cartridge/scripts/helpers/instorePickupStoreHelpers');
                    instorePickupStoreHelper.setStoreInProductLineItem(storeId, productLineItem);
                }
            }
        }

        result.uuid = productLineItem.UUID;
    }

    if (inStorePickupEnabled) {
        var Transaction = require('dw/system/Transaction');
        Transaction.wrap(function () {
            COHelpers.ensureNoEmptyShipments(req);
        });
    }

    return result;
}

base.addLineItem = addLineItem;
base.updateBundleProducts = updateBundleProducts;
base.addProductToCart = addProductToCart;
base.checkBundledProductCanBeAdded = checkBundledProductCanBeAdded;

module.exports = base;
