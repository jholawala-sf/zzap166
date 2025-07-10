'use strict';

const index = module.superModule;

index.customAttributes = require('*/cartridge/models/product/decorators/customAttributes');
index.productSetPrice = require('*/cartridge/models/product/decorators/productSetPrice');
index.recommendations = require('*/cartridge/models/product/decorators/recommendations');

module.exports = index;
