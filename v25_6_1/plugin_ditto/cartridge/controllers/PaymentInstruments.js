'use strict';

const server = require('server');
server.extend(module.superModule);

server.append('List', function (req, res, next) {
    const URLUtils = require('dw/web/URLUtils');
    const AccountModel = require('*/cartridge/models/account');
    const viewData = res.getViewData();

    viewData.addPaymentUrl = URLUtils.url('PaymentInstruments-AddPayment').toString();

    // overwrite params if this is Salesforce Payments
    if (viewData.commercePaymentsConfiguration && viewData.commercePaymentsConfiguration.multiStepCheckoutEnabled) {
        var paymentMethods = AccountModel.getCustomerPaymentMethods(req.currentCustomer.raw);
        viewData.actionUrl = URLUtils.url('PaymentInstruments-DetachPaymentMethod').toString();
        viewData.addPaymentUrl = null;
        viewData.paymentMethods = paymentMethods;
        viewData.noSavedPayments = paymentMethods.length === 0;
    }
    res.setViewData(viewData);
    next();
});

module.exports = server.exports();
