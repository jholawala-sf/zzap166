const previewHelpers = require('*/cartridge/scripts/composable-preview/helpers')

/*
 * Provide optional composable launch and storefront toolkit preview functionality from BM
 */
const isComposableNative = dw.system.Site.current.getCustomPreferenceValue('composableNative')
const composableURL = dw.system.Site.current.getCustomPreferenceValue('composableURL')

// support SFRA-style controllers chain, otherwise assume we are fully headless and implement the controller
try {
    const server = require('server');
    server.extend(module.superModule);

    if (isComposableNative) {
        server.replace('Start', function(req, res, next) {
            var isInToolkit = req.querystring.__sftkCacheBuster;
            if (isComposableNative && composableURL && isInToolkit) {
                if (session.privacy.composablePreviewUSID) {
                    // set context proactively
                    previewHelpers.copyRequestContextToShopperContext(
                        session.privacy.composablePreviewUSID,
                        session.privacy.composablePreviewUsername
                    )
                    // TODO handle error on page
                }

                // storefront toolkit launch
                res.render('toolkit/preview', {
                    composableURL: composableURL,
                    setContextEndpoint: dw.web.URLUtils.abs('ComposableToolkit-SetContext').toString()
                })
            } else if (isComposableNative && composableURL) {
                res.redirect(composableURL)
            }
            next()
        })
    }

    module.exports = server.exports();
} catch(e) {
    // SFRA not present. Implement the controller directly
    // SiteGenesis Users will need to remove this cartridge from sites
    // they don't want to enable this functionality on
    // eslint-disable-next-line no-inner-declarations
    function Start() {
        var isInToolkit = request.httpParameterMap.__sftkCacheBuster.isSubmitted()
        if (isComposableNative && composableURL && isInToolkit) {
            if (session.privacy.composablePreviewUSID) {
                // set context proactively
                previewHelpers.copyRequestContextToShopperContext(
                  session.privacy.composablePreviewUSID,
                  session.privacy.composablePreviewUsername
                )
                // TODO handle error on page
            }

            dw.template.ISML.renderTemplate('toolkit/preview', {
                composableURL: composableURL,
                setContextEndpoint: dw.web.URLUtils.abs('ComposableToolkit-SetContext').toString()
            })
        } else if (isComposableNative && composableURL) {
            response.redirect(composableURL)
        }
    }

    Start.public = true
    module.exports.Start = Start
}

