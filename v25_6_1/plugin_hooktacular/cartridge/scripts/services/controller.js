const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const URLUtils = require('dw/web/URLUtils');
const Logger = require('dw/system/Logger');

module.exports.getService = function getService() {
    return LocalServiceRegistry.createService('controller.internal', {
        createRequest: function (service, args) {
            var url = URLUtils.abs(args.controller);
            if (args.params) {
                Object.keys(args.params).forEach(key => url.append(key, args.params[key]));
            }

            service.setURL(url.toString());
            service.setRequestMethod(args.requestMethod || 'GET');

            if (args.headers) {
                Object.keys(args.headers).forEach((header) => {
                    service.addHeader(header, args.headers[header]);
                });
            }

            service.addHeader('Cookie', 'dwsid=' + args.dwsid);
            return args.body;
        },
        parseResponse: function (service, result) {
            var returns = result.text;
            try {
                returns = JSON.parse(result.text);
            } catch (e) {
                Logger.error('Could not parse http conroller service response; {0}', e);
            }

            return returns;
        }
    });
};
