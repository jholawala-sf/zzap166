const previewHelpers = require('*/cartridge/scripts/composable-preview/helpers')

/**
 * Set the shopper-context of the given SLAS JWT to the ECOM context of the current
 * request.
 *
 * This is safe as the context being set is controlled here on the server
 * and can only be what the request is authorized for (i.e. only storefront toolkit
 * sessions with an active BM user can set time, customer groups, etc). Use of this endpoint
 * outside of the toolkit use case will simply set the context of the current
 * storefront customer's session.
 *
 * Request should be a urlencoded POST with the encoded token in the jwt parameter.
 *
 * The USID of the token will be cached to proactively set the context on future
 * toolkit initiated requests and reduce the need to refresh the application under
 * preview.
 */
function SetContext() {
    const jwt = request.httpParameterMap.jwt.stringValue

    if (!jwt) {
        response.setStatus(400)
        return
    }

    // validate JWT and extract USID, org
    var result = previewHelpers.inspectJWT(jwt)

    if (!result.valid) {
        response.setStatus(400)
        response.getWriter().println(JSON.stringify({ error: result.error }))
        return
    }

    // cache USID
    session.privacy.composablePreviewUSID = result.usid
    session.privacy.composablePreviewUsername = result.username ? result.username : 'guest'

    // set context
    result = previewHelpers.copyRequestContextToShopperContext(
        result.usid,
        'guest'
    )

    if (!result.result) {
        response.setStatus(400)
        response.getWriter().println(JSON.stringify({ error: result.error }))
        return
    }

    response.setStatus(200)
    response.getWriter().println(JSON.stringify({ success: true }))
}

SetContext.public = true
exports.SetContext = SetContext
