// eslint-disable-next-line no-unused-vars
function validatePayment(order) {
    /** someone to do the hard work :D */
    return true;
}

// eslint-disable-next-line no-unused-vars
function sendConfirmationMail(order) {
    /** someone to do the hard work :D */
    return true;
}

// eslint-disable-next-line no-unused-vars
function rollbackPayments(order) {
    /** someone to do the hard work :D */
    return true;
}

exports.beforePATCH = function (order, orderInput) {
    if (orderInput.status) {
        // finalize order
        if (validatePayment(order) && order.status.displayValue.toUpperCase() === 'CREATED' && orderInput.status.toUpperCase() === 'NEW') {
            // clear/delete modifyPOSTResponse
            sendConfirmationMail(order);
            dw.order.OrderMgr.placeOrder(order);
        }
        // stop temporary order and give basket back
        if (order.status.displayValue.toUpperCase() === 'CREATED' && orderInput.status.toUpperCase() === 'FAILED') {
            rollbackPayments(order);
            dw.order.OrderMgr.failOrder(order);
        }

        if (orderInput.status.toUpperCase() === 'CANCELLED') {
            dw.order.OrderMgr.cancelOrder(order);
            // set custom objects here and custom logic
        }
    }

    var positions = orderInput.product_items ? orderInput.product_items.toArray() : [];
    positions.forEach(function (element) {
        var lineToUpdate;
        // .filter creates a weird copy
        order.getProductLineItems(element.product_id).toArray().forEach(function (orderLine) {
            if (orderLine.UUID === element.item_id) {
                lineToUpdate = orderLine;
            }
        });
        if (lineToUpdate) {
            lineToUpdate.custom.lineStatus = element.c_lineStatus;
        }
    });
};

// create order
// eslint-disable-next-line no-unused-vars
exports.afterPOST = function (order, orderInput) {
    /** remove temporary payment added for order creation */
    // remove Dummy, but nothing else like paypal, apple pay
    var instruments = order.getPaymentInstruments('DUMMY').iterator();
    if (instruments.hasNext()) {
        order.removePaymentInstrument(instruments.next());
    }
};
