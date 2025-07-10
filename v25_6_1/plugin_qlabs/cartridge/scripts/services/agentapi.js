var LocalServiceRegistry = require("dw/svc/LocalServiceRegistry");

/**
 * @param {string} accessToken
 * @return {dw.svc.HTTPService}
 */
function getService(serviceName, endpoint) {
    if (!serviceName) {
        serviceName = "agent.api";
    }
    return LocalServiceRegistry.createService(serviceName, {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} args
         * @return {*}
         */
        createRequest: function (svc, args) {
            var credential = svc.getConfiguration().getCredential();
            svc.setURL((endpoint || credential.URL) + args.endpoint);
            svc.addHeader("Authorization", "Bearer " + args.token);
            svc.addHeader("x-salesforce-region", "us-east-1");
            svc.addHeader("Content-Type", "application/json");
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
            // no parsing as it might be SSE
            return {
                contentType: client.getResponseHeader("content-type"),
                body: client.text,
            };
        },
        filterLogMessage(msg) {
            return msg;
        },
        mockCall: function () {},
    });
}

function getAuthService(serviceName, endpoint) {
    if (!serviceName) {
        serviceName = "agent.api";
    }
    return LocalServiceRegistry.createService(serviceName, {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} args
         * @return {*}
         */
        createRequest: function (svc, args) {
            var credential = svc.getConfiguration().getCredential();
            svc.setURL((endpoint || credential.URL) + "/services/oauth2/token");
            svc.addHeader("x-salesforce-region", "us-east-1");
            svc.addHeader("content-type", "application/x-www-form-urlencoded");
            svc.setAuthentication("BASIC");
            var user = args.user || credential.user;
            var password = args.password || credential.password;
            var basicAuth = dw.util.StringUtils.encodeBase64(
                user + ":" + password,
            );
            svc.addHeader("Authorization", "Basic " + basicAuth);
            svc.setRequestMethod("POST");
            return "grant_type=client_credentials";
        },

        /**
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} client
         * @return {object}
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

function getDefaultContextVariables() {
    var locale = request.locale
    if (locale === "default") {
        locale = "en_US";
    }

    const siteId = dw.system.Site.current.ID;
    return [
        {
            name: "$Context.EndUserLanguage",
            type: "Text",
            value: locale,
        },
        {
            name: "siteId",
            type: "Text",
            value: siteId,
        },
        {
            name: "sfccHost",
            type: "Text",
            value: dw.system.System.instanceHostname,
        },
        {
            name: "scapiShortCode",
            type: "Text",
            value: dw.system.System.getPreferences().getCustom().scapiShortCode,
        },
        {
            name: "scapiOrgId",
            type: "Text",
            value: dw.system.System.getPreferences().getCustom().scapiOrgId,
        },
    ];
}

/**
 * Return a service to make SLAS calls
 * @return {dw.svc.HTTPService}
 */
function getSLASService() {
    return LocalServiceRegistry.createService('scapi.slas.private', {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} client
         * @return {object}
         */
        parseResponse: function (svc, client) {
            return JSON.parse(client.text)
        },
        filterLogMessage(msg) {
            return msg
        },
        mockCall: function () {}
    })
}



module.exports = {
    getDefaultContextVariables: getDefaultContextVariables,
    getService: getService,
    getAuthService: getAuthService,
    getSLASService: getSLASService,
};
