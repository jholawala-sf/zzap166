'use strict';

const base = module.superModule || {};
const SLAS_CONFIG = require('*/cartridge/scripts/config/scapiConfig').SLAS_CONFIGS;

// make sure all required values have been set if plugin_slas/base does not exist
// if values exist in base, use the values from the plugin_slas config file
Object.keys(SLAS_CONFIG).forEach((key) => {
    if (!Object.hasOwnProperty.call(base, key) || base[key] == null) {
        base[key] = SLAS_CONFIG[key];
    }
});

const controllersToExclude = SLAS_CONFIG.CONTROLLERS_TO_EXCLUDE;
if (Object.hasOwnProperty.call(base, 'CONTROLLERS_TO_EXCLUDE') && base.CONTROLLERS_TO_EXCLUDE.length) {
    for (var i = 0; i < base.CONTROLLERS_TO_EXCLUDE.length; i++) {
        if (controllersToExclude.indexOf(base.CONTROLLERS_TO_EXCLUDE[i]) === -1) {
            controllersToExclude.push(base.CONTROLLERS_TO_EXCLUDE[i]);
        }
    }
}
base.CONTROLLERS_TO_EXCLUDE = controllersToExclude;

module.exports = base;
