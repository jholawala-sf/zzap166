var server = require('server');
var helper = require('*/cartridge/scripts/helpers/hybridDeployHelper');
var config = require('*/cartridge/config/hybridDeployPreferences');

server.extend(module.superModule);

server.prepend('Show', function (req, res, next) {
    if (config.PWA_KIT_REDIRECT_HOME) {
        var redirectUrl = helper.getUrl('Home', req.locale.id);
        res.setRedirectStatus(301);
        res.redirect(redirectUrl);
    }
    const sfraVersion = dw.web.Resource.msg('global.version.number', 'version')

    next();
});

module.exports = server.exports();
