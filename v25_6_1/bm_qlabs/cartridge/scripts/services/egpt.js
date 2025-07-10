var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

/**
 * Return a service to make EGPT API calls
 *
 * @return {dw.svc.HTTPService}
 */
function getEGPTService() {
    return LocalServiceRegistry.createService("EinsteinGPT", {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} args
         * @return {*}
         */
        createRequest: function (svc, args) {
            var credential = svc.getConfiguration().getCredential();

            svc.setURL(credential.URL + args.endpoint);

            svc.addHeader("Authorization", "Bearer " + args.token);
            svc.addHeader("Content-Type", "application/json");

            svc.setRequestMethod(args.method);
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

        filterLogMessage(msg) {
            return msg;
        },
        mockCall: function () {},
    });
}

/**
 * Return a service to make EGPT API calls using the system service
 * provided by the eGPT feature toggle
 *
 * @return {dw.svc.HTTPService}
 */
function getEGPTSystemService() {
    return LocalServiceRegistry.createService("Salesforce.Internal.PageDesignerEgpt", {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} args
         * @return {*}
         */
        createRequest: function (svc, args) {
            svc.setURL(svc.URL + args.endpoint);
            svc.addHeader("Content-Type", "application/json");
            svc.setRequestMethod(args.method);

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

        filterLogMessage(msg) {
            return msg;
        },
        mockCall: function () {},
    });
}
module.exports = {
    getEGPTService: getEGPTService,
    getEGPTSystemService: getEGPTSystemService,
};
