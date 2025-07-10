
/**
 * Just an example AMAuth Admin API
 */
exports.getSomething = function () {
    var siteId = dw.system.Site.current.ID
    return dw.system.RESTResponseMgr.createSuccess({
        something: 'or nothing',
        siteId: siteId
    }).render()
};

exports.getSomething.public = true;
