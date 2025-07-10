var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');

module.exports.getService = function getService() {
    return LocalServiceRegistry.createService('freeurl.internal', {
        createRequest: function (service, args) {
            service.setURL(args.url);
            service.setRequestMethod(args.requestMethod || 'GET');

            return args.body;
        },
        parseResponse: function (service, result) {
            var returns = result.text;
            try {
                returns = JSON.parse(result.text);
            } catch (e) {
                // nothing
            }

            return returns;
        }
    });
};
