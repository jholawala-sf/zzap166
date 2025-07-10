var OrderMgr = require('dw/order/OrderMgr');

function NotFoundError(message) {
    this.name = 'OrderNotFoundError';
    this.message = message || 'Order not found';
    this.httpCode = 404;
}

exports.getOrder = function getOrder(orderNo, email, postalCode, actionParam, lines) {
    var order = OrderMgr.getOrder(orderNo);
    var action = actionParam || 'getOrder';
    // hide the fact we dont have an ordernumber
    if (!order) {
        throw new NotFoundError();
    }

    if (!email || !postalCode) {
        throw new NotFoundError();
    }

    if (!order.customer.anonymous || order.customerEmail !== email || order.billingAddress.postalCode !== postalCode) {
        throw new NotFoundError();
    }

    var ocapiService = require('*/cartridge/scripts/services/ocapi.js');
    var authResult = ocapiService.getAuthToken().call();
    var authResponseObj = JSON.parse(authResult.object.text);
    var token = authResponseObj.access_token;
    var orderService;
    if (action === 'getOrder') {
        orderService = ocapiService.getService().call({
            requestPath: '/s/' + dw.system.Site.current.ID + '/dw/shop/v21_3/orders/' + order.orderNo,
            requestMethod: 'GET',
            token: token
        });
    } else if (action === 'fullCancel') {
        orderService = ocapiService.getService().call({
            requestPath: '/s/' + dw.system.Site.current.ID + '/dw/shop/v21_3/orders/' + order.orderNo,
            requestMethod: 'PATCH',
            token: token,
            body: '{"status": "cancelled"}'
        });
    } else if (action === 'lineCancel') {
        if (!lines) {
            throw new Error({ httpCode: 400, name: 'INVALID_ARGUMENTS', message: 'Invalid Arguments' });
        }

        var fullLines = [];
        order.productLineItems.toArray().forEach(element => {
            if (lines.indexOf(element.UUID) > -1) {
                fullLines.push({
                    product_id: element.productID,
                    item_id: element.UUID,
                    c_lineStatus: '3'
                });
            }
        });

        var body = {
            product_items: fullLines
        };
        orderService = ocapiService.getService().call({
            requestPath: '/s/' + dw.system.Site.current.ID + '/dw/shop/v21_3/orders/' + order.orderNo,
            requestMethod: 'PATCH',
            token: token,
            body: JSON.stringify(body)
        });
    }

    var result = { order: orderService.errorMessage || JSON.parse(JSON.stringify(orderService.object)), apiResponseType: 'RESULT' };
    return result;
};

/**
 * This OCAPI CUSTOM OBJECT API endpoint is used to lookup a guest order
 * using the standard 3-factors (orderno, email, postalcode)
 *
 * @param {dw.util.Map} params the http parameters of the incoming request
 * @returns {Object} api response
 */
exports.get = function (params) {
    const orderNo = params.c_order && params.c_order[0];
    const email = params.c_email && params.c_email[0];
    const postalCode = params.c_postalCode && params.c_postalCode[0];
    const action = params.c_subAPI && params.c_subAPI[0];
    const lines = params.c_lines && params.c_lines[0] && params.c_lines[0].split(',');

    try {
        return exports.getOrder(orderNo, email, postalCode, action, lines);
    } catch (e) {
        const defaultError = { error: true, message: { code: 'UNAUTHORIZED_ACCESS', message: 'This order cannot be accessed' }, apiResponseType: 'AUTHORIZATION' };
        return defaultError;
    }
};

