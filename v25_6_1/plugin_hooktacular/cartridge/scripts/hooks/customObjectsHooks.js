var toCamel = function (s) {
    // eslint-disable-next-line no-useless-escape
    return s.replace(/(\-[a-z])/g, function ($1) { return $1.toUpperCase().replace('-', ''); });
};

/**
 *  Custom Object Modify Get Hook
 * @param {Object} customObject - the database objec
 * @param {Object} doc - the document
 */
exports.modifyGETResponse = function (customObject, doc) {
    if (customObject.type === 'CustomApi') {
        /*
            Please be careful. The custom object API does not impose any security. So if you expose sensitive data, such
            as personal identifyable information or orders, please ensure secure access
            Using the customer global object should be safe as the customer was authenticated securely
        */
        var result = require('*/cartridge/scripts/apis/' + toCamel(customObject.custom.ID)).get(request.httpParameters);
        doc.c_result = result;
    }
};

