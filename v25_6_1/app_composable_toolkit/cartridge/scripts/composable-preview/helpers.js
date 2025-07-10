var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry')
var StringUtils = require('dw/util/StringUtils')

/**
 * Get a service to call SCAPI shopper APIs
 *
 * TODO: DRY this is the same implementation as app_q_pwa_support; but we duplicate
 * here to this cartridge can be used independently
 * @return {dw.svc.HTTPService}
 */
function getSCAPIService() {
    return LocalServiceRegistry.createService('scapi.shopper', {
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {object} params
         */
        createRequest(svc, params) {
            svc.setAuthentication('NONE')
            svc.setURL(svc.URL + params.endpoint + '?' + params.query)
            svc.addHeader('Authorization', `Bearer ${params.token}`)
            svc.setRequestMethod(params.method)

            if (params.body) {
                return JSON.stringify(params.body)
            }
        },
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} client
         * @return {object}
         */
        parseResponse: function (svc, client) {
            return JSON.parse(client.text)
        },
        filterLogMessage(msg) {
            return msg
        },
        mockCall: function () {}
    })
}

/**
 * Return a service to make SLAS calls
 * @return {dw.svc.HTTPService}
 */
function getSLASService(endpoint) {
    return LocalServiceRegistry.createService('scapi.slas.private', {
        createRequest(service, params) {
            // NOTE: for historical reasons scapi.slas.private service includes
            // the oauth2/token in the URL as that was its original use case.
            // Rather than refactor the service data we simply just replace it with our desired
            // endpoint: either oauth2/introspect or oauth2/trusted-system/token
            const baseUrl = service.getURL()
            service.addHeader('Content-Type', 'application/x-www-form-urlencoded')

            service.setURL(baseUrl.replace('oauth2/token', endpoint))
            return Object.keys(params)
                .map(function (key) {
                    return key + '=' + params[key]
                })
                .join('&')
        },
        /**
         * @param {dw.svc.HTTPService} svc
         * @param {dw.net.HTTPClient} client
         * @return {object}
         */
        parseResponse: function (svc, client) {
            return JSON.parse(client.text)
        },
        filterLogMessage(msg) {
            return msg
        },
        mockCall: function () {}
    })
}

/**
 * @typedef {Object} JWTInspectionResult
 * @property {boolean} valid
 * @property {string} [error]
 * @property {string} [usid]
 * @property {string} [isGuest]
 * @property {string} [customerId]
 */

/**
 * Validate a JWT with SLAS and return details of the user
 *
 * @param {string} jwt
 * @return {JWTInspectionResult}
 */
exports.inspectJWT = function inspectJWT(jwt) {
    // introspect service will validate the JWT
    const svc = getSLASService('oauth2/introspect')
    const result = svc.call({
        token: jwt
    })

    if (!result.ok) {
        return {
            valid: false,
            error: 'Invalid JWT'
        }
    }

    // jwt validates, parse jwt as a JSON Web Token
    try {
        const jwtParts = jwt.split('.')
        const jwtObject = JSON.parse(StringUtils.decodeBase64(jwtParts[1]))

        const isb = jwtObject.isb
        const sub = jwtObject.sub
        const isbParts = isb.split('::')
        const isGuest = isbParts[1] === 'upn:Guest'
        const customerId = isGuest
            ? isbParts[3].replace('gcid:', '')
            : isbParts[4].replace('rcid:', '')
        // SUB format
        // cc-slas::zzrf_001::scid:c9c45bfd-0ed3-4aa2-xxxx-40f88962b836::usid:b4865233-de92-4039-xxxx-aa2dfc8c1ea5
        const usid = sub.split('::')[3].replace('usid:', '')

        return {
            valid: true,
            usid: usid,
            customerId: customerId,
            isGuest: isGuest
        }
    } catch (e) {
        return {
            valid: false,
            error: e.message
        }
    }
}

/**
 * Sets the shopper context of the given USID to the ECOM session context of the current request.
 *
 * The USID provided should come from a validated JWT (i.e. use inspectJWT above)
 *
 * @param {string} usid
 * @param {string} [username]
 */
exports.copyRequestContextToShopperContext = function copyRequestContextToShopperContext(
    usid,
    username
) {
    const tsobSvc = getSLASService('oauth2/trusted-system/token')

    const result = tsobSvc.call({
        grant_type: 'client_credentials',
        login_id: username ? username : 'guest',
        idp_origin: 'ecom',
        channel_id: dw.system.Site.current.ID,
        usid: usid,
        hint: 'ts_ext_on_behalf_of'
    })

    if (!result.ok) {
        return {
            result: false,
            error: 'Error getting TSOB token'
        }
    }

    const accessToken = result.object.access_token
    const url = tsobSvc.getURL()
    // parse out the organization id from our service
    const orgId = url.split('/')[7]

    // current request context
    const customerGroups = customer.customerGroups.toArray().map(function (group) {
        return group.ID
    })
    var currentDateTime = dw.system.Site.current.calendar.getTime().toISOString()
    // fractional seconds not supported
    currentDateTime = currentDateTime.substring(0, currentDateTime.indexOf('.')) + 'Z'
    const currentSourceCode = session.sourceCodeInfo ? session.sourceCodeInfo.code : undefined

    const scapiSvc = getSCAPIService()
    const scapiResult = scapiSvc.call({
        endpoint: `shopper/shopper-context/v1/organizations/${orgId}/shopper-context/${usid}`,
        method: 'PUT',
        token: accessToken,
        query: `siteId=${dw.system.Site.current.ID}`,
        body: {
            customerGroupIds: customerGroups,
            effectiveDateTime: currentDateTime,
            sourceCode: currentSourceCode
        }
    })

    if (!scapiResult.ok) {
        return {
            result: false,
            error: 'Error setting shopper context'
        }
    }

    return {
        result: true
    }
}
