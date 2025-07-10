'use strict';

const base = module.superModule || {};

var config = require('*/cartridge/scripts/config/SLASConfig');
var Fetch = require('*/cartridge/scripts/services/fetch');

/**
 * Service call to merge guest basket with registered user's basket on successful login.
 * @param {string} token - access_token for registered user
 * @return {Object} response object
 */
base.mergeBasket = base.mergeBasket || function mergeBasket(token) {
    var SERVICE = require('*/cartridge/scripts/config/scapiConfig').SERVICE_IDS.BASKETS;
    var url =
        'https://' +
        config.SHORTCODE +
        '.api.commercecloud.salesforce.com/checkout/shopper-baskets/v1/organizations/' +
        config.ORGID +
        config.SCAPI_BASKET_MERGE_ENDPOINT;

    var options = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        },
        queryParameters: {
            siteId: config.CHANNEL_ID,
            createDestinationBasket: true,
            productItemMergeMode: 'sum_quantities'
        }
    };

    var response = Fetch.fetch(SERVICE, url, options);

    if (!response.ok) {
        Fetch.throwHttpError(response, 'Cart merge error');
    }
    return response;
};

module.exports = base;
