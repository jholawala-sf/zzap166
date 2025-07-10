var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
var URLUtils = require('dw/web/URLUtils');

/**
 *  Returns the host for the current instance using URLUtils, which can als work in job context
 *  @returns {string} the instance hostname
 */
function getCurrentInstanceHost() {
    var defaultUrl = URLUtils.abs('Default-Start').toString();
    var host = '';
    if (defaultUrl.indexOf('//') > -1) {
        host = defaultUrl.split('/')[2];
    } else {
        host = defaultUrl.split('/')[0];
    }
    return host;
}

module.exports.getService = function getService() {
    return LocalServiceRegistry.createService('ocapi.internal', {
        createRequest: function (service, args) {
            var baseURL;
            var locale = request.locale.replace('_', '-');

            if (!service.getConfiguration().getCredential().URL) {
                var host = getCurrentInstanceHost();
                baseURL = 'https://' + host + '/';
            } else {
                baseURL = service.getConfiguration().getCredential().URL;
            }

            if (args.token) {
                service.addHeader('Authorization', 'Bearer ' + args.token);
            }

            service.addHeader('x-dw-client-id', service.getConfiguration().getCredential().user);

            var url;
            if (args.requestPath.indexOf('?') === -1) {
                url = baseURL + args.requestPath + '?locale=' + locale;
            } else {
                url = baseURL + args.requestPath + '&locale=' + locale;
            }

            service.setURL(url);
            service.setRequestMethod(args.requestMethod);

            return args.body;
        },
        parseResponse: function (service, result) {
            var returns = result.text;
            try {
                returns = JSON.parse(result.text);
                returns.getResponseHeaders = function () { return service.client.allResponseHeaders; };
            } catch (e) {
                // nothing
            }
            return returns || result;
        }
    });
};

module.exports.getAuthToken = function getService() {
    return LocalServiceRegistry.createService('ocapi.auth', {
        createRequest: function (service) {
            var cred = service.getConfiguration().getCredential();
            var host = getCurrentInstanceHost();
            var StringUtils = require('dw/util/StringUtils');
            var baseURL = 'https://' + host + service.getConfiguration().getCredential().URL + '?client_id=' + cred.user;
            var basicAuth = cred.custom.bmAuthUser + ':' + cred.custom.bmAuthAccessKey + ':' + cred.password;
            service.setURL(baseURL);
            service.addHeader('Content-Type', 'application/x-www-form-urlencoded');
            service.addHeader('Authorization', 'BASIC ' + StringUtils.encodeBase64(basicAuth));
            service.setRequestMethod('POST');
            var data = 'grant_type=urn%3Ademandware%3Aparams%3Aoauth%3Agrant-type%3Aclient-id%3Adwsid%3Adwsecuretoken&client_id=' + cred.user;

            return data;
        },
        parseResponse: function (service, result) {
            return result;
        }
    });
};
