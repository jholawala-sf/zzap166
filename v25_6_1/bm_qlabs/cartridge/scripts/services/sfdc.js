var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/**
 * Return a service to make client credentials flow auth requests
 *
 * @return {dw.svc.HTTPService}
 */
function getOAuthService(serviceId) {
    return LocalServiceRegistry.createService(serviceId, {
        parseResponse: function (svc, client) {
            return JSON.parse(client.text)
        }
    });
}

module.exports = {
    getOAuthService: getOAuthService
}
