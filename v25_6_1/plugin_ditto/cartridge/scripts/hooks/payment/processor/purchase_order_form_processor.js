'use strict';

/**
 * Verifies the required information for billing form is provided.
 * @param {Object} req - The request object
 * @param {Object} paymentForm - the payment form
 * @param {Object} viewFormData - object contains billing form data
 * @returns {Object} an object that has error information or payment information
 */
function processForm(req, paymentForm, viewFormData) {
    const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

    var viewData = viewFormData;

    var purchaseOrderErrors = purchaseOrderHelpers.validatePurchaseOrder(paymentForm);
    if (Object.keys(purchaseOrderErrors).length) {
        return {
            fieldErrors: purchaseOrderErrors,
            error: true
        };
    }

    viewData.paymentMethod = {
        value: paymentForm.paymentMethod.value,
        htmlName: paymentForm.paymentMethod.value
    };

    viewData.paymentInformation = {
        purchaseOrderNumber: {
            value: paymentForm.purchaseOrderFields.purchaseOrderNumber.value,
            htmlName: paymentForm.purchaseOrderFields.purchaseOrderNumber.htmlName
        }
    };

    return {
        error: false,
        viewData: viewData
    };
}

/**
 * default hook if no save payment information processor is supported
 */
function savePaymentInformation() {
    return;
}

exports.processForm = processForm;
exports.savePaymentInformation = savePaymentInformation;
