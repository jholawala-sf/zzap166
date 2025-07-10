'use strict';

/* API Modules */
const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/* Script Modules */
const ScapiServiceConfig = require('*/cartridge/scripts/services/scapiServiceConfig');

/**
 * Returns a newly initialized service related to the given {serviceID}
 * If the service does not exist, this method will throw an error
 * @param {string} serviceId - the service id
 * @returns {Object} service object
 */
module.exports.getScapiService = function (serviceId) {
    return LocalServiceRegistry.createService(serviceId, ScapiServiceConfig.ScapiConfig);
};
