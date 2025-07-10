'use strict';

var base = module.superModule;
var OrderMgr = require('dw/order/OrderMgr');
var Transaction = require('dw/system/Transaction');

/**
 * Get product's variation attributes
 * @param {Object} apiProduct - ProductLineItem
 * @returns {Array} Array with the Variation Attributes.
 */
function getVariationAttributes(apiProduct) {
    let selectedValue;

    let variationModel = apiProduct.getVariationModel();
    let allAttrs = variationModel.getProductVariationAttributes();
    let variationAttributes = [];

    allAttrs.toArray().forEach(function (attr) {
        selectedValue = variationModel.getSelectedValue(attr);

        if (selectedValue) {
            variationAttributes.push({
                attrID: attr.ID,
                selectedID: selectedValue.ID,
                selectedValue: selectedValue.displayValue
            });
        }
    });

    return variationAttributes;
}

/**
 * Attempts to create an order from the current basket
 * @param {dw.order.Basket} currentBasket - The current basket
 * @returns {dw.order.Order} The order object created from the current basket
 */
function createOrder(currentBasket) {
    var SystemObjectMgr = require('dw/object/SystemObjectMgr');
    var collections = require('*/cartridge/scripts/util/collections');
    var order;

    try {
        order = Transaction.wrap(function () {
            var newOrder = OrderMgr.createOrder(currentBasket);

            //
            // Order-level custom attributes
            //
            var orderTypeDef = newOrder.describe();

            if (orderTypeDef.getCustomAttributeDefinition('somSourceCode')) {
                var sourceCodeInfo = session.sourceCodeInfo;
                newOrder.custom.somSourceCode = sourceCodeInfo ? sourceCodeInfo.code : '';
            }

            //
            // Product LineItem-level custom attributes
            //
            var pliTypeDef = SystemObjectMgr.describe('ProductLineItem');

            collections.forEach(newOrder.allProductLineItems, function (productLineItem) {
                var pli = productLineItem;

                //
                // (a) SOM: categories
                //
                var categoryTree = [];

                if (pli.product && pli.product.classificationCategory) {
                    var category = pli.product.classificationCategory;

                    while (category.root === false) {
                        categoryTree.unshift(category.ID);
                        category = category.parent;
                    }

                    if (pliTypeDef.getCustomAttributeDefinition('somL1Category') && categoryTree[0]) {
                        pli.custom.somL1Category = categoryTree[0] ? categoryTree[0] : '';
                    }
                    if (pliTypeDef.getCustomAttributeDefinition('somL2Category') && categoryTree[1]) {
                        pli.custom.somL2Category = categoryTree[1] ? categoryTree[1] : '';
                    }
                    if (pliTypeDef.getCustomAttributeDefinition('somL3Category') && categoryTree[2]) {
                        pli.custom.somL3Category = categoryTree[2] ? categoryTree[2] : '';
                    }
                }

                //
                // (b) SOM: color/size variation attributes
                //
                if (pli.product && pli.product.variant === true) {
                    let variationAttributes = getVariationAttributes(pli.product);

                    variationAttributes.forEach(function (attr) {
                        if (pliTypeDef.getCustomAttributeDefinition('somVariationColor') && attr.attrID === 'color') {
                            pli.custom.somVariationColor = attr.selectedValue;
                        } else if (pliTypeDef.getCustomAttributeDefinition('somVariationSize') && attr.attrID === 'size') {
                            pli.custom.somVariationSize = attr.selectedValue;
                        }
                    });
                }
            });

            return newOrder;
        });
    } catch (error) {
        return null;
    }

    return order;
}

/**
 * Loop through all shipments and make sure all not null
 * @param {dw.order.LineItemCtnr} lineItemContainer - Current users's basket
 * @returns {boolean} - allValid
 */
function ensureValidShipments(lineItemContainer) {
    var collections = require('*/cartridge/scripts/util/collections');
    var shipments = lineItemContainer.shipments;
    var storeAddress = true;
    var allValid = collections.every(shipments, function (shipment) {
        if (shipment) {
            var hasStoreID = shipment.custom && shipment.custom.fromStoreId;
            if (shipment.shippingMethod && shipment.shippingMethod.custom && shipment.shippingMethod.custom.storePickupEnabled && !hasStoreID) {
                storeAddress = false;
            }
            var address = shipment.shippingAddress;
            return address && address.address1 && storeAddress;
        }
        return false;
    });
    return allValid;
}

/**
 * Sets the payment transaction amount
 * @param {dw.order.Basket} currentBasket - The current basket
 * @returns {Object} an error object
 */
function calculatePaymentTransaction(currentBasket) {
    var result = { error: false };
    var Money = require('dw/value/Money');
    var PaymentInstrument = require('dw/order/PaymentInstrument');
    var paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');
    var purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

    var isPurchaseOrderEnabled = purchaseOrderHelpers.isPurchaseOrderEnabled();

    try {
        Transaction.wrap(function () {
            // get all payment instruments for the basket
            var iter = currentBasket.getPaymentInstruments().iterator();
            var nonGiftCardPurchaseOrderPaymentInstrument = null;
            var giftCertTotal = new Money(0.0, currentBasket.currencyCode);
            var purchaseOrderTotal = new Money(0.0, currentBasket.currencyCode);
            var paymentInstrumentsToDelete = [];

            while (iter && iter.hasNext()) {
                var paymentInstrument = iter.next();
                if (PaymentInstrument.METHOD_GIFT_CERTIFICATE.equals(paymentInstrument.paymentMethod)) {
                    giftCertTotal = giftCertTotal.add(paymentInstrument.getPaymentTransaction().getAmount());
                    continue; // eslint-disable-line no-continue
                } else if (purchaseOrderHelpers.PURCHASE_ORDER_PAYMENT_METHOD_ID.equals(paymentInstrument.paymentMethod)) {
                    if (isPurchaseOrderEnabled) {
                        purchaseOrderTotal = purchaseOrderTotal.add(paymentInstrument.getPaymentTransaction().getAmount());
                    } else {
                        paymentInstrumentsToDelete.push(paymentInstrument);
                    }
                    continue; // eslint-disable-line no-continue
                }

                // locate any payment instrument that is not a gift cert or purchase order
                nonGiftCardPurchaseOrderPaymentInstrument = paymentInstrument;
            }

            // if we didn't find a payment instrument we are done
            if (!nonGiftCardPurchaseOrderPaymentInstrument) {
                return;
            }

            // calculate the amount to be charged for the non-gift certificate and purchase order payment instruments
            var amount = paymentHelpers.getPaymentAmount(currentBasket);

            // now set the non-gift certificate payment instrument total.
            if (amount.value <= 0.0) {
                var zero = new Money(0, amount.getCurrencyCode());
                nonGiftCardPurchaseOrderPaymentInstrument.paymentTransaction.setAmount(zero);
                paymentInstrumentsToDelete.push(nonGiftCardPurchaseOrderPaymentInstrument);
                currentBasket.removePaymentInstrument(nonGiftCardPurchaseOrderPaymentInstrument);
            } else {
                nonGiftCardPurchaseOrderPaymentInstrument.paymentTransaction.setAmount(amount);
            }

            // delete invalid payment instruments
            if (paymentInstrumentsToDelete) {
                for (var i = 0; i < paymentInstrumentsToDelete.length; i++) {
                    currentBasket.removePaymentInstrument(paymentInstrumentsToDelete[i]);
                }
            }
        });
    } catch (e) {
        result.error = true;
    }

    return result;
}

/**
 * validates the order has payment instruments if its total is nonzero.
 * @param {dw.order.Order} order - the order object
 * @returns {Object} an error object
 */
function handleCommercePayments(order) {
    const PaymentInstrument = require('dw/order/PaymentInstrument');
    const PaymentMgr = require('dw/order/PaymentMgr');
    const HookMgr = require('dw/system/HookMgr');
    const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

    var result = {};
    var total = order.totalNetPrice;
    var orderNumber = order.orderNo;
    var i;

    if (total.available && total.value !== 0.00) {
        var paymentInstruments = order.paymentInstruments;
        var paymentInstrumentsToDelete = [];

        if (paymentInstruments.length === 0) {
            // In this case there are no payment instruments so there can be no
            // payment to cancel or refund for the order
            Transaction.wrap(function () { OrderMgr.failOrder(order, true); });
            result.error = true;
        }

        // handle authorizations for all non salesforce payment instruments
        if (!result.error) {
            for (i = 0; i < paymentInstruments.length; i++) {
                var paymentInstrument = paymentInstruments[i];
                var paymentMethod = PaymentMgr.getPaymentMethod(paymentInstrument.paymentMethod);
                var paymentProcessor = paymentMethod && paymentMethod.paymentProcessor ? paymentMethod.paymentProcessor : null;
                var authorizationResult;

                // skip salesforce payments payment instruments
                if (paymentInstrument.paymentMethod === 'Salesforce Payments' || paymentProcessor.ID === 'SALESFORCE_PAYMENTS') {
                    continue;
                }
                if (paymentProcessor === null) {
                    Transaction.begin();
                    paymentInstrument.paymentTransaction.setTransactionID(orderNumber);
                    Transaction.commit();
                } else {
                    if (PaymentInstrument.METHOD_GIFT_CERTIFICATE.equals(paymentInstrument.paymentMethod)
                        && purchaseOrderHelpers.isPurchaseOrderPaymentInstrument(paymentInstrument)
                        && HookMgr.hasHook('app.payment.processor.purchase_order')) {
                        paymentProcessor = PaymentMgr.getPaymentMethod(purchaseOrderHelpers.PURCHASE_ORDER_PAYMENT_METHOD_ID).getPaymentProcessor();
                        var purchaseOrderPaymentInstrument = purchaseOrderHelpers.replaceGiftCertificatePaymentInstrument(order, paymentInstrument);
                        if (purchaseOrderPaymentInstrument) {
                            paymentInstrumentsToDelete.push(paymentInstrument);
                            authorizationResult = HookMgr.callHook(
                                'app.payment.processor.purchase_order',
                                'Authorize',
                                orderNumber,
                                purchaseOrderPaymentInstrument,
                                paymentProcessor
                            );
                        }
                    } else if (HookMgr.hasHook('app.payment.processor.'
                        + paymentProcessor.ID.toLowerCase())) {
                        authorizationResult = HookMgr.callHook(
                            'app.payment.processor.' + paymentProcessor.ID.toLowerCase(),
                            'Authorize',
                            orderNumber,
                            paymentInstrument,
                            paymentProcessor
                        );
                    } else {
                        authorizationResult = HookMgr.callHook(
                            'app.payment.processor.default',
                            'Authorize'
                        );
                    }

                    if (authorizationResult.error) {
                        Transaction.wrap(function () { OrderMgr.failOrder(order, true); });
                        result.error = true;
                        break;
                    }
                }
            }

            if (paymentInstrumentsToDelete.length) {
                Transaction.wrap(function () {
                    for (i = 0; i < paymentInstrumentsToDelete.length; i++) {
                        order.removePaymentInstrument(paymentInstrumentsToDelete[i]);
                    }
                });
            }
        }
    }

    return result;
}

base.calculatePaymentTransaction = calculatePaymentTransaction;
base.createOrder = createOrder;
base.ensureValidShipments = ensureValidShipments;
base.handleCommercePayments = handleCommercePayments;

module.exports = base;
