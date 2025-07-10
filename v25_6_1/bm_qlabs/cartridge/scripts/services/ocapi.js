var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var OCAPI_VERSION = 'v24_5'


/**
 * Performs AM Authentication using the client in the ocapi.auth service
 *
 * NOTE: this is NOT a BM GRANT
 *
 * @return {dw.svc.HTTPService}
 */
function getOCAPIAuthService() {
    return LocalServiceRegistry.createService('ocapi.auth', {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} args
         * @return {*}
         */
        createRequest: function (svc) {
            svc.setURL('https://account.demandware.com/dwsso/oauth2/access_token')
            svc.setRequestMethod('POST')
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded')
            return "grant_type=client_credentials"
        },

        /**
         *
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} client
         * @return {object}
         */
        parseResponse: function (svc, client) {
            return JSON.parse(client.text)
        }
    })
}

/**
 * Return a service to make OCAPI requests using the given access token
 * @param {string} accessToken
 * @return {dw.svc.HTTPService}
 */
function getOCAPIService(accessToken) {

    return LocalServiceRegistry.createService('ocapi.internal', {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} args
         * @return {*}
         */
        createRequest: function (svc, args) {
            var host = dw.system.System.getInstanceHostname()
            var url = `https://${host}/s/-/dw/data/${OCAPI_VERSION}/${args.path}`
            svc.setURL(url)
            svc.addHeader('Authorization', 'Bearer ' + accessToken);
            svc.setRequestMethod(args.method)
            if (args.request) {
                return JSON.stringify(args.request);
            }
        },

        /**
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} args
         * @return {object
         */
        parseResponse: function (svc, client) {
            return JSON.parse(client.text);
        },
    });
}

module.exports = {
    getOCAPIAuthService: getOCAPIAuthService,
    getOCAPIService: getOCAPIService
}
