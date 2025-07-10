var PageMgr = require('dw/experience/PageMgr');
var CatalogMgr = require('dw/catalog/CatalogMgr');

/**
 *  Serialized one or more page designer pages into JSON
 */
function serialize() {
    // construct JSON Array by hand, as PD streams on response which we need to do as well.
    response.writer.print('[');
    if (request.httpParameterMap.pageIds.submitted) {
        var pageIds = request.httpParameterMap.pageIds.stringValue.split(',');
        pageIds.forEach((pageId, index, all) => {
            response.writer.print(PageMgr.serializePage(pageId, null));
            if (index !== all.length - 1) {
                response.writer.print(',');
            }
        });
    }

    if (request.httpParameterMap.aspect.submitted && request.httpParameterMap.category.submitted) {
        var category = CatalogMgr.getCategory(request.httpParameterMap.category.stringValue);
        var page = PageMgr.getPage(category, true, request.httpParameterMap.aspect.stringValue);
        if (page) {
            response.writer.print(PageMgr.serializePage(page.ID, null));
        }
    }

    response.addHttpHeader('Content-Type', 'application/json');
    response.writer.print(']');
}

serialize.public = true;
exports.Serialize = serialize;
