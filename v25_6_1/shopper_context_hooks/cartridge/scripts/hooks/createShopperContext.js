'use strict';

/* global request */
var Status = require('dw/system/Status');
var { validateContext } = require('*/cartridge/scripts/helpers/utils');
var Logger = require('dw/system/Logger');
var log = Logger.getLogger(
    'shopper_context_hooks',
    'shopper_context_hooks.config'
);

exports.beforePUT = function (usid, siteId, shopperContext) {
    var clientId = request.clientId;
    try {
        if (!validateContext(clientId, shopperContext)) {
            const invalidContextMsg = 'Invalid context property found.';
            return new Status(Status.ERROR, 'FORBIDDEN', invalidContextMsg);
        }
    } catch (e) {
        log.error(e);
        return new Status(Status.ERROR, 'INTERNAL_ERROR', e.message);
    }

    return new Status(Status.OK);
};
