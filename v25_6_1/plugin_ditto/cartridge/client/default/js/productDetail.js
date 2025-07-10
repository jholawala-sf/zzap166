'use strict';

var processInclude = require('base/util');

$(document).ready(function () {
    // Include base details
    processInclude(require('./product/detail'));
    processInclude(require('./product/pdpInstoreInventory'));

    // Gift Registry
    try {
        processInclude(require('giftregistry/product/giftRegistry'));
    } catch (ex) {
    // plugin not in use
    }

    // Commerce Payments
    try {
        processInclude(require('commercepayments/product/payments'));
    } catch (ex) {
    // plugin not in use
    }

    // Wishlists
    try {
        processInclude(require('wishlist/product/wishlist'));
    } catch (ex) {
    // plugin not in use
    }
});
