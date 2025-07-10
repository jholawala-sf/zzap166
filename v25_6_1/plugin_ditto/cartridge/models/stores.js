'use strict';

var base = module.superModule;

function stores(storesResultsObject, searchKey, searchRadius, actionUrl, apiKey, showMap) {
    base.call(this, storesResultsObject, searchKey, searchRadius, actionUrl, apiKey, showMap);
    this.radiusOptions = [15, 30, 50, 100, 300, 30000];
}

stores.prototype = Object.create(base.prototype);

module.exports = stores;
