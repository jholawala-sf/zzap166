'use strict';

const base = module.superModule;
const Logger = require('dw/system/Logger');

function getScript(scriptPath) {
    var script;
    try {
        script = require(scriptPath);
    } catch (e) {
        var cartridgeName = scriptPath.split('/')[0];
        var cartridgePath = scriptPath.replace(cartridgeName, 'app_storefront_base');
        script = require(cartridgePath);
        Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
    }
    return script;
}

function getOrderHelpersScript() {
    const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');
    const isSelfServiceEnabled = siteHelpers.getSitePreference('dittoSomSelfServiceEnabled');

    var orderHelpersScript = getScript('app_storefront_base/cartridge/scripts/order/orderHelpers');
    if (isSelfServiceEnabled) {
        orderHelpersScript = getScript('plugin_ordermanagement/cartridge/scripts/order/orderHelpers');
    }
    return orderHelpersScript;
}

/**
 * Creates an order model for the current customer
 * @param {Object} req - the request object
 * @returns {Object} an object of the customer's last order
 */
function getLastOrder(req) {
    const orderHelpersScript = getOrderHelpersScript();
    return orderHelpersScript.getLastOrder(req);
}

/**
 * Returns a list of orders for the current customer with filters values
 * @param {Object} currentCustomer - object with customer properties
 * @param {Object} queryString - object of query string parameters
 * @param {string} locale - the current request's locale id
 * @returns {Object} - Object with an array of order models and filters
 * */
function getOrders(currentCustomer, queryString, locale) {
    const orderHelpersScript = getOrderHelpersScript();
    return orderHelpersScript.getOrders(currentCustomer, queryString, locale);
}

/**
 * Creates an order model for the current customer
 * @param {Object} req - the request object
 * @returns {Object} an object of the customer's order
 */
function getOrderDetails(req) {
    const orderHelpersScript = getOrderHelpersScript();
    return orderHelpersScript.getOrderDetails(req);
}

module.exports = Object.assign({}, base, {
    getLastOrder: getLastOrder,
    getOrders: getOrders,
    getOrderDetails: getOrderDetails
});
