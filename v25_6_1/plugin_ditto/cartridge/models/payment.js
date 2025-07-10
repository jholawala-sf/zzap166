'use strict';

const base = module.superModule;
const Money = require('dw/value/Money');
const URLUtils = require('dw/web/URLUtils');
const paymentHelpers = require('*/cartridge/scripts/helpers/paymentHelpers');
const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');
const renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');
const formatMoney = require('dw/util/StringUtils').formatMoney;

/**
 * Payment class that represents payment information for the current basket
 * @param {dw.order.Basket} currentBasket - the target Basket object
 * @param {dw.customer.Customer} currentCustomer - the associated Customer object
 * @param {string} countryCode - the associated Site countryCode
 * @constructor
 */
function Payment(currentBasket, currentCustomer, countryCode) {
    base.call(this, currentBasket, currentCustomer, countryCode);
    var paymentInstrument;
    var amount;
    var amountMoney;

    if (this.paymentMethod) {
        try {
            paymentInstrument = paymentHelpers.getPaymentInstrument(currentBasket);
            if (paymentInstrument) {
                // add amount and formatted amount
                amount = paymentInstrument.paymentTransaction
                && paymentInstrument.paymentTransaction.amount != null ?
                    paymentInstrument.paymentTransaction.amount.value : null;
                amountMoney = amount ? new Money(amount, currentBasket.currencyCode) : null;
                this.paymentMethod.amount = amount;
                this.paymentMethod.formattedAmount = amountMoney != null
                && amountMoney.available
                    ? formatMoney(amountMoney) : '-';
            }
        } catch (ex) {
            // skip
        }
    }
    if (this.selectedPaymentInstruments) {
        for (var i = 0; i < this.selectedPaymentInstruments.length; i++) {
            var selectedPaymentInstrument = this.selectedPaymentInstruments[i];

            // add formatted amount to payment instrument
            if (selectedPaymentInstrument.amount != null && selectedPaymentInstrument.amount) {
                amount = selectedPaymentInstrument.amount;
                amountMoney = new Money(amount, currentBasket.currencyCode);
                selectedPaymentInstrument.formattedAmount = amountMoney.available ? formatMoney(amountMoney) : '-';
            }

            // add purchase order number to payment instrument
            paymentInstrument = paymentHelpers.getBasketPaymentInstrumentByPaymentMethodId(currentBasket, selectedPaymentInstrument.paymentMethod, selectedPaymentInstrument.amount);
            if (!paymentInstrument) {
                continue;
            }

            var isPurchaseOrder = purchaseOrderHelpers.isPurchaseOrderPaymentInstrument(paymentInstrument);
            selectedPaymentInstrument.UUID = paymentInstrument.UUID;
            selectedPaymentInstrument.isPurchaseOrder = isPurchaseOrder;
            if (isPurchaseOrder) {
                selectedPaymentInstrument.paymentMethod = purchaseOrderHelpers.PURCHASE_ORDER_PAYMENT_METHOD_ID;
                selectedPaymentInstrument.purchaseOrderNumber = Object.hasOwnProperty.call(paymentInstrument.custom, 'purchaseOrderNumber') ? paymentInstrument.custom.purchaseOrderNumber : null;
                selectedPaymentInstrument.removePurchaseOrderUrl = URLUtils.url('PurchaseOrder-RemovePaymentInstrument', 'uuid', paymentInstrument.UUID).toString();
            }
        }

        // add payment instrument summary html
        const summaryData = {
            purchaseOrderDetails: purchaseOrderHelpers.getPurchaseOrderConfig(),
            order: {
                billing: {
                    payment:
                        { selectedPaymentInstruments: this.selectedPaymentInstruments }
                }
            }
        };
        this.paymentOptionsSummaryHtml = renderTemplateHelper.getRenderedHtml(summaryData, 'checkout/billing/paymentOptions/paymentOptionsSummary');
        this.purchaseOrdersHtml = renderTemplateHelper.getRenderedHtml(summaryData, 'checkout/billing/purchaseOrderList');
    }
}

Payment.prototype = Object.create(base.prototype);

module.exports = Payment;
