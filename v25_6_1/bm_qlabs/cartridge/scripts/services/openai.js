/**
 * Creates the service to make requests to OpenAI
 *
 * @return {dw.svc.Service} - The service
 */
function getOpenAIService() {
    var { createService } = require('dw/svc/LocalServiceRegistry');

    return createService('OpenAI', {
        // eslint-disable-next-line consistent-return
        createRequest: function (svc, args) {
            var credential = svc.getConfiguration().getCredential();

            svc.setURL(credential.URL + args.endpoint);
            const apiKey = svc.getConfiguration().getCredential().password
            svc.addHeader('Authorization', 'Bearer ' + apiKey);
            svc.addHeader('Content-Type', 'application/json');
            svc.setRequestMethod(args.method);
            return JSON.stringify(args.request);
        },
        parseResponse: function (svc, client) {
            if (client.statusCode === 200) {
                return client.text;
            }

            return null;
        },
        filterLogMessage(msg) {
            return msg;
        },
        mockCall: function () {
        }
    });
}

module.exports = getOpenAIService
