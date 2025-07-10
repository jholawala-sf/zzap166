// Mock product info endpoint: https://q-reflector-production.mobify-storefront.com/product/:productId

const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry')

function getProductInfoService() {
    return LocalServiceRegistry.createService('product.info', {
        createRequest(svc) {
            svc.setURL(svc.URL)
            svc.setRequestMethod('GET')
        },
        parseResponse(svc, client) {
            return JSON.parse(client.text)
        },
        filterLogMessage(msg) {
            return msg
        }
    })
}

exports.getProductInfoService = getProductInfoService
