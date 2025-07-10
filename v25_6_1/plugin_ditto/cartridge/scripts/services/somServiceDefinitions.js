'use strict';

const base = module.superModule;
const serviceHelpers = require('*/cartridge/scripts/helpers/dittoServiceHelpers');

const filterLogMessage = (data) => {
    try {
        var logObj = JSON.parse(data);
        var result = serviceHelpers.iterate(logObj);
        return result ? JSON.stringify(result) : data;
    } catch (ex) {
        return serviceHelpers.prepareFormLogData(data);
    }
};

const compositeDefinition = base.definitions.composite;
compositeDefinition.filterLogMessage = filterLogMessage;

const makeApiDefinition = base.definitions.api;
makeApiDefinition.filterLogMessage = filterLogMessage;

module.exports = Object.assign({}, base, {
    definitions: {
        composite: compositeDefinition,
        api: makeApiDefinition
    }
});
