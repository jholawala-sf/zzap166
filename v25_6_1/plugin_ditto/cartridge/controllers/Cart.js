const server = require('server');

server.extend(module.superModule);

server.append('Show', function (req, res, next) {
    const BasketMgr = require('dw/order/BasketMgr');
    const purchaseOrderHelpers = require('*/cartridge/scripts/helpers/purchaseOrderHelpers');

    // append purchase order details to the view data
    const currentBasket = BasketMgr.getCurrentBasket();
    const viewData = res.getViewData();
    viewData.purchaseOrderDetails = purchaseOrderHelpers.getPurchaseOrderConfig(currentBasket);
    res.setViewData(viewData);
    next();
});

server.get('AddDocumentation', function (req, res, next) {
    var PageMgr = require('dw/experience/PageMgr');
    var BasketMgr = require('dw/order/BasketMgr');
    var ProductMgr = require('dw/catalog/ProductMgr');
    var collections = require('*/cartridge/scripts/util/collections');

    var currentBasket = BasketMgr.getCurrentBasket();
    var uuid = req.querystring.uuid;
    var productLineItems = currentBasket.allProductLineItems;
    var requestLineItem = collections.find(productLineItems, function (item) {
        return item.UUID === uuid;
    });
    var product = ProductMgr.getProduct(requestLineItem.productID);
    var pageId = product.custom.documentationWorkflowPage;

    var page = PageMgr.getPage(pageId);

    if (page != null && page.isVisible()) {
        res.page(page.ID, {});
    }
    next();
});

server.post('AddDocumentationSubmit', function (req, res, next) {
    var BasketMgr = require('dw/order/BasketMgr');
    var Transaction = require('dw/system/Transaction');
    var File = require('dw/io/File');
    var collections = require('*/cartridge/scripts/util/collections');

    var currentBasket = BasketMgr.getCurrentBasket();
    var uuid = req.form.lineItemUUID;
    var productLineItems = currentBasket.allProductLineItems;
    var requestLineItem = collections.find(productLineItems, function (item) {
        return item.UUID === uuid;
    });

    var documentationOption = req.form['documentation-option'];

    var files = request.httpParameterMap.processMultipart(function (field, ct, oname) {
        if (field === 'documentation-file-' + documentationOption) {
            var dir = new File(File.IMPEX + '/documentation-uploads');
            if (!dir.isDirectory()) {
                throw new Error('Directory not found or is not a directory: ' + dir);
            }
            var fileUUID = dw.util.UUIDUtils.createUUID();
            var targetFile = new File(dir, fileUUID + '-' + oname);
            return targetFile;
        }
    });
    Transaction.wrap(function () {
        requestLineItem.custom.documentationSelection = documentationOption;
        if (files && !files.empty) {
            var file = files.entrySet()
                .toArray()[0].value;
            requestLineItem.custom.documentationFile = file.fullPath;
            requestLineItem.custom.documentationDownloadLink = dw.web.URLUtils.abs(
                new dw.web.URLAction('Documentation-Download', 'Sites-Site'),
                new dw.web.URLParameter('filename', file.fullPath)
            );
        }
    });

    res.redirect(dw.web.URLUtils.url('Cart-Show'));
    next();
});

module.exports = server.exports();
