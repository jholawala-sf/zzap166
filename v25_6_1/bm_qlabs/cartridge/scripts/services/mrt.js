var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

/**
 * Return a service to make MRT API calls
 * @param {string} accessToken
 * @return {dw.svc.HTTPService}
 */
function getMRTService() {
    return LocalServiceRegistry.createService('ManagedRuntime', {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} args
         * @return {*}
         */
        createRequest: function (svc, args) {
            var credential = svc.getConfiguration().getCredential();
            svc.setURL(credential.URL + args.endpoint);
            const apiKey = svc.getConfiguration().getCredential().password
            svc.addHeader('Authorization', 'Bearer ' + apiKey);
            svc.addHeader('Content-Type', 'application/json');
            svc.setRequestMethod(args.method);
            if (args.request) {
                return JSON.stringify(args.request);
            }
        },

        /**
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} client
         * @return {object}
         */
        parseResponse: function (svc, client) {
            return client.text
        },
        filterLogMessage(msg) {
            return msg;
        },
        mockCall: function () {
        }
    });
}

module.exports = {
    getMRTService: getMRTService
}
