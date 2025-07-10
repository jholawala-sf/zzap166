var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');
var Logger = require('dw/system/Logger');
var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');

var log = Logger.getLogger('dc-order-export', 'orders');

var orders;
var fileWriter;
var csvWriter;

const TOTAL_LINE_ITEMS = 10
var COLUMNS = [
    'UniqueId',
    'SiteId',
    'VisitId',
    'OrderNo',
    'CreationDate',
    'CustomerNo',
    'CustomerName',
    'CustomerEmail',
    'Currency',
    'BillingFirstName',
    'BillingLastName',
    'BillingAddress1',
    'BillingCity',
    'BillingState',
    'BillingPostalCode',
    'BillingCountry',
    'RemoteHost',
    'OrderTotal',
    'ShippingTotal',
    'AdjustedShippingTotal',
    'ShippingTaxTotal',
    'TaxTotal',
    'MerchandizeTotal',
    'AdjustedMerchandizeTotal',
    'AdjustmentTotal',
    'TotalLineItems',
];
for (var j = 1; j <= TOTAL_LINE_ITEMS; j++) {
    COLUMNS.push(`LineItemId${j}`, `LineItemQty${j}`, `LineItemPrice${j}`);
}

var startDate = new Date(1970, 0, 1);
var endDate;
var lastOrder;
exports.beforeStep = function (parameters) {
    var _startDate = parameters.startDate;
    var _endDate = parameters.endDate;

    var startDateStr = _startDate.toISOString()
        .slice(0, 10)
        .replace(/-/g, '');
    if (!_endDate && parameters.minAge) {
        _endDate = new Date();
        _endDate = new Date(_endDate.getTime() - (parameters.minAge * 24 * 60 * 60 * 1000))
    } else if (!endDate) {
        _endDate = new Date();
    }
    var endDateStr = _endDate.toISOString()
        .slice(0, 10)
        .replace(/-/g, '');
    startDate = _startDate;
    endDate = _endDate;
    var fileName = parameters.filename
    if (!fileName) {
        fileName = `orders-${dw.system.Site.current.ID}-${startDateStr}-${endDateStr}.csv`;
    }
    var directory = new File(File.IMPEX + File.SEPARATOR + 'orders');
    directory.mkdirs();
    var file = new File(directory, fileName);
    fileWriter = new FileWriter(file);
    csvWriter = new CSVStreamWriter(fileWriter);
    orders = OrderMgr.searchOrders('creationDate > {0} AND creationDate <= {1} AND (status = {2} OR status = {3})', 'creationDate asc', _startDate, _endDate, Order.ORDER_STATUS_NEW, Order.ORDER_STATUS_OPEN);

    csvWriter.writeNext(COLUMNS);

    if (orders.count > 0) {
        log.debug('Processing {0} orders', orders.count);
    }
};

exports.getTotalCount = function () {
    return orders.count;
};

exports.beforeChunk = function () {
    if (lastOrder) {
        startDate = lastOrder.creationDate;
        orders = OrderMgr.searchOrders('creationDate > {0} AND creationDate <= {1} AND (status = {2} OR status = {3})', 'creationDate asc', startDate, endDate, Order.ORDER_STATUS_NEW, Order.ORDER_STATUS_OPEN);
    }
};

exports.read = function () {
    if (orders.hasNext()) {
        lastOrder = orders.next();
        return lastOrder
    }
};

/**
 *
 * @param {dw.order.Order} order
 * @return {string}
 */
exports.process = function (order) {
    // map up to TOTAL_LINE_ITEMS as columns
    var lineItems = order.getAllProductLineItems();
    var lineItemData = [];
    for (var i = 0; i < Math.min(TOTAL_LINE_ITEMS, lineItems.size()); i++) {
        /** @type {dw.order.ProductLineItem} */
        var lineItem = lineItems[i];
        if (lineItem) {
            lineItemData.push(lineItem.productID, lineItem.quantityValue, lineItem.price.toNumberString());
        } else {
            lineItemData.push('', '', '');
        }
    }

    const siteId = `Sites-${dw.system.Site.current.ID}-Site`
    const uniqueId = `${siteId}.${order.orderNo}`
    const visitId = order.customer.ID
    return [
        uniqueId,
        siteId,
        visitId,
        order.orderNo,
        order.creationDate.toISOString(),
        order.customerNo,
        order.customerName,
        order.customerEmail,
        order.currencyCode,
        order.billingAddress.firstName,
        order.billingAddress.lastName,
        order.billingAddress.address1,
        order.billingAddress.city,
        order.billingAddress.stateCode,
        order.billingAddress.postalCode,
        order.billingAddress.countryCode.value,
        order.remoteHost,
        order.totalGrossPrice.toNumberString(),
        order.shippingTotalPrice.toNumberString(),
        order.adjustedShippingTotalPrice.toNumberString(),
        order.shippingTotalTax.toNumberString(),
        order.totalTax.toNumberString(),
        order.merchandizeTotalPrice.toNumberString(),
        order.adjustedMerchandizeTotalPrice.toNumberString(),
        order.merchandizeTotalPrice.subtract(order.adjustedMerchandizeTotalPrice).toNumberString(),
        order.productLineItems.size()
    ].concat(lineItemData);
};

exports.write = function (chunk) {
    for (var i = 0; i < chunk.length; i++) {
        csvWriter.writeNext(chunk[i].toArray());
    }
};

exports.afterChunk = function () {
    fileWriter.flush();
};

exports.afterStep = function () {
    fileWriter.close();
    orders.close();
};
