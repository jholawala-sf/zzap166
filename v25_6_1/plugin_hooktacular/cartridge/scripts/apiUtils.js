/**
 * @typedef {object} RFC7807Error
 * @property {string} type
 * @property {string} title
 * @property {string} [detail]
 * @property {string} [instance]
 */

/**
 * @param {number} statusCode the http status code
 * @param {RFC7807Error} error the errordetails to expose
 */
exports.createError = function createError(statusCode, error) {
    response.setStatus(statusCode);
    response.setContentType('application/problem+json');
    response.getWriter().println(JSON.stringify(error));
};

/**
 * writes a stringified object to the response object
 * @param {number} statusCode the http status code
 * @param {Object} object the object to send out to the client
 */
exports.createResponse = function createResponse(statusCode, object) {
    response.setStatus(statusCode);
    response.setContentType('application/json');
    response.getWriter().println(JSON.stringify(object));
};
