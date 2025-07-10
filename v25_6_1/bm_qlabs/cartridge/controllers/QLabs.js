const ISML = require("dw/template/ISML");
const MRT = require("*/cartridge/scripts/services/mrt");
const AgentApi = require("*/cartridge/scripts/services/agentapi");
const CONFIG = require("*/cartridge/config/qlabsConfig");
const EGPT = require("*/cartridge/scripts/services/egpt");
const SFDC = require("*/cartridge/scripts/services/sfdc");
const Verification = require("*/cartridge/scripts/verification");
const CustomObjectMgr = require("dw/object/CustomObjectMgr");

/**
 * Constants needed for frontend
 */
function Start() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    // look for composable storefront deployment
    var composableConfiguration = null;
    try {
        const object = dw.object.CustomObjectMgr.getCustomObject(
            "B2CToolsFeature",
            "Managed Runtime Composable Storefront",
        );
        if (object) {
            composableConfiguration = JSON.parse(object.custom.vars);
        }
    } catch (e) {
        // ignore if we don't have the object or b2c-tools has not been used
    }

    ISML.renderTemplate("labs/index", {
        clientSettings: Object.assign({}, CONFIG, {
            composableConfiguration: composableConfiguration,
        }),
        isDevMode: CONFIG.devMode,
    });
}

Start.public = true;
module.exports.Start = Start;

/**
 * Constants needed for frontend
 */
function SLDS() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    ISML.renderTemplate("labs/slds", {});
}
SLDS.public = true;
module.exports.SLDS = SLDS;

/**
 * Provide a misc API not available in OCAPI
 * @constructor
 */
function Misc() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    response.setContentType("application/json");

    const endpoint = request.httpParameterMap.get("_endpoint").stringValue;
    const body = JSON.parse(request.httpParameterMap.getRequestBodyAsString());
    var result = {};
    switch (endpoint) {
        case "getStorefrontLink":
            var pid = body.pid;
            var siteId = body.siteId;
            var locale = body.locale;
            result = {
                url: dw.web.URLUtils.https(
                    new dw.web.URLAction("Product-Show", siteId, locale),
                    new dw.web.URLParameter("pid", pid),
                ).toString(),
            };
            break;
        case "zipFile":
            var filename = body.filename;
            var file = new dw.io.File(filename);
            var zipFile = new dw.io.File(filename + ".zip");
            file.zip(zipFile);
            result = {
                status: "ok",
            };
            break;
        case "getShippingMethods":
            const allShippingMethods =
                dw.order.ShippingMgr.getAllShippingMethods()
                    .toArray()
                    .map(function (sm) {
                        return {
                            ID: sm.ID,
                            displayName: sm.displayName,
                            description: sm.description,
                        };
                    });
            result = {
                shippingMethods: allShippingMethods,
            };
            break;
    }
    response.getWriter().println(JSON.stringify(result, null, 4));
}

Misc.public = true;
module.exports.Misc = Misc;

/**
 * Proxies client requests through the MRT Service
 */
function MRTRequest() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    response.setContentType("application/json");

    const method = request.httpParameterMap.get("_method").stringValue;
    const endpoint = request.httpParameterMap.get("_endpoint").stringValue;
    const svc = MRT.getMRTService();
    if (!empty(request.httpParameterMap.requestBodyAsString)) {
        const _req = JSON.parse(request.httpParameterMap.requestBodyAsString);

        var result = svc.call({
            method: method,
            endpoint: endpoint,
            request: _req,
        });
    } else {
        result = svc.call({
            method: method,
            endpoint: endpoint,
        });
    }

    if (!result.ok) {
        response.setStatus(result.error);
        var errorMessage = result.errorMessage;
        try {
            errorMessage = JSON.parse(result.errorMessage).error.message;
        } catch (e) {
            // do nothing
        }
        response.getWriter().println(
            JSON.stringify(
                {
                    error: errorMessage,
                },
                null,
                4,
            ),
        );
        return;
    }
    const body = JSON.parse(result.object);
    response.getWriter().println(JSON.stringify(body, null, 4));
}

MRTRequest.public = true;
module.exports.MRTRequest = MRTRequest;

const AUTH_SERVICE_ID = "EinsteinGPT.Auth";

function getAccessToken(authServiceId, invalidate) {
    if (!invalidate) {
        // use cached token in bm session
        var accessToken = session.privacy[authServiceId + -"token"];
    }

    if (accessToken) {
        return accessToken;
    }

    const svc = SFDC.getOAuthService(authServiceId);
    svc.setThrowOnError();
    const result = svc.call({
        grant_type: "client_credentials",
    });
    accessToken = result.object.access_token;
    session.privacy[authServiceId + -"token"] = accessToken;
    return accessToken;
}

/**
 * Proxies client requests to the EGPT Service handling authentication
 */
function EGPTRequest() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    response.setContentType("application/json");

    const method = request.httpHeaders.get("x-original-method");
    const endpoint = request.httpHeaders.get("x-endpoint");

    try {
        const svc = EGPT.getEGPTService();

        var retries = 1;
        var accessToken = getAccessToken(AUTH_SERVICE_ID);
        while (retries >= 0) {
            if (!empty(request.httpParameterMap.requestBodyAsString)) {
                const _req = JSON.parse(
                    request.httpParameterMap.requestBodyAsString,
                );

                var result = svc.call({
                    method: method,
                    endpoint: endpoint,
                    request: _req,
                    token: accessToken,
                });
            } else {
                result = svc.call({
                    method: method,
                    endpoint: endpoint,
                    token: accessToken,
                });
            }
            if (result.error === 401) {
                accessToken = getAccessToken(AUTH_SERVICE_ID, true);
                retries--;
                continue;
            }
            break;
        }

        if (!result.ok) {
            response.setStatus(result.error);
            var errorMessage = result.errorMessage;
            try {
                errorMessage = JSON.parse(result.errorMessage).error.message;
            } catch (e) {
                // do nothing
            }
            response.getWriter().println(
                JSON.stringify(
                    {
                        error: errorMessage,
                    },
                    null,
                    4,
                ),
            );
            return;
        }
    } catch (e) {
        response.setStatus(500);
        response.getWriter().println(
            JSON.stringify(
                {
                    error: e.message,
                },
                null,
                4,
            ),
        );
        return;
    }
    response.getWriter().println(JSON.stringify(result.object, null, 4));
}

EGPTRequest.public = true;
module.exports.EGPTRequest = EGPTRequest;

/**
 * Proxies client requests to the EGPT (system) Service handling authentication
 */
function EGPTSystemRequest() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    response.setContentType("application/json");

    const method = request.httpHeaders.get("x-original-method");
    const endpoint = request.httpHeaders.get("x-endpoint");

    try {
        const svc = EGPT.getEGPTSystemService();

        if (!empty(request.httpParameterMap.requestBodyAsString)) {
            const _req = JSON.parse(
                request.httpParameterMap.requestBodyAsString,
            );

            var result = svc.call({
                method: method,
                endpoint: endpoint,
                request: _req,
            });
        } else {
            result = svc.call({
                method: method,
                endpoint: endpoint,
            });
        }

        if (!result.ok) {
            response.setStatus(result.error);
            var errorMessage = result.errorMessage;
            try {
                errorMessage = JSON.parse(result.errorMessage).error.message;
            } catch (e) {
                // do nothing
            }
            response.getWriter().println(
                JSON.stringify(
                    {
                        error: errorMessage,
                    },
                    null,
                    4,
                ),
            );
            return;
        }
    } catch (e) {
        response.setStatus(500);
        response.getWriter().println(
            JSON.stringify(
                {
                    error: e.message,
                },
                null,
                4,
            ),
        );
        return;
    }
    response.getWriter().println(JSON.stringify(result.object, null, 4));
}

EGPTSystemRequest.public = true;
module.exports.EGPTSystemRequest = EGPTSystemRequest;

/**
 * Retrieves component info for the given component list
 */
function ComponentInfo() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    response.setContentType("application/json");

    const body = JSON.parse(request.httpParameterMap.requestBodyAsString);
    const componentIds = body.componentTypeIds;

    var result = {
        components: {},
    };
    for (var i = 0; i < componentIds.length; i++) {
        var componentId = componentIds[i];
        var componentPath = componentId.replace(/\./g, "/");
        try {
            var component = require(
                "*/cartridge/experience/components/" + componentPath + ".json",
            );
            result.components[componentId] = component;
        } catch (e) {
            // do nothing
        }
    }

    response.getWriter().println(JSON.stringify(result, null, 4));
}
ComponentInfo.public = true;
module.exports.ComponentInfo = ComponentInfo;

function Test() {
    var t = getTheData();
    return t;
}

Test.public = true;
module.exports.Test = Test;

function Keepalive() {
    response.setContentType("application/json");
    response.getWriter().println(JSON.stringify({ status: "ok" }));
}
Keepalive.public = true;
module.exports.Keepalive = Keepalive;

function Info() {
    response.setContentType("application/json");
    response.getWriter().println(
        JSON.stringify({
            username: session.userName,
            siteId: dw.system.Site.current.ID,
        }),
    );
}
Info.public = true;
module.exports.Info = Info;

function UserVerification() {
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    var jwt = Verification.generateJWT();
    response.setContentType("application/json");
    response.getWriter().println(
        JSON.stringify({
            jwt: jwt,
        }),
    );
}
UserVerification.public = true;
module.exports.UserVerification = UserVerification;

/**
 * Provide a proxy API for the Agentforce Agent API
 * @constructor
 */
function AgentApiRequest() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    // content type MIGHT be event stream too
    response.setContentType("application/json");

    const method = request.httpHeaders.get("x-original-method");
    const endpoint = request.httpHeaders.get("x-endpoint");

    const agentId = request.httpHeaders.get("x-agent-id");
    const agentObj = CustomObjectMgr.getCustomObject("QLabsDataStore", agentId);

    if (!agentObj) {
        response.setStatus(404);
        response.getWriter().println(
            JSON.stringify(
                {
                    error: "Not Found",
                },
                null,
                4,
            ),
        );
        return;
    }

    const agent = JSON.parse(agentObj.custom.data);

    // custom caches are not ideal for this use case but a stop gap for now
    // spliting the token and storing in session might work
    const cacheKey = agent.name + "-" + session.sessionID;
    const cache = dw.system.CacheMgr.getCache("agentApiSessions");

    try {
        var retries = 1;

        // logins are per agent and b2c session
        var accessToken = cache.get(cacheKey);
        if (!accessToken) {
            const authSvc = AgentApi.getAuthService(
                agent.serviceName,
                agent.endpoint,
            );
            authSvc.setThrowOnError();
            var result = authSvc.call({
                // If we have these explicitly configured use them instead
                // of the service credential
                user: agent.consumerKey,
                password: agent.consumerSecret,
            });

            if (result.ok) {
                accessToken = result.object.access_token;
                cache.put(cacheKey, accessToken);
            } else {
                response.setStatus(result.error);
                response.getWriter().println(
                    JSON.stringify(
                        {
                            error: result.errorMessage,
                        },
                        null,
                        4,
                    ),
                );
                return;
            }
        } else {
            dw.system.Logger.debug("Using cached access token for agent " + agent.name);
        }

        const svc = AgentApi.getService(
            agent.serviceName,
            "https://api.salesforce.com",
            accessToken,
        );
        // response.setHttpHeader('X-SF-CC-access-token', accessToken);
        while (retries >= 0) {
            if (!empty(request.httpParameterMap.requestBodyAsString)) {
                const _req = JSON.parse(
                    request.httpParameterMap.requestBodyAsString,
                );

                // merge the variables array in _req with AgentApi.getDefaultContextVariables()
                if (!_req.variables) {
                    _req.variables = [];
                }
                _req.variables = _req.variables.concat(
                    AgentApi.getDefaultContextVariables(),
                );

                var slasTokenVariable = _req.variables.find(
                    (v) => v.name === "slasToken",
                );

                if (slasTokenVariable) {
                    // TODO
                    slasTokenVariable.value = session.sessionID;
                }

                var result = svc.call({
                    method: method,
                    endpoint: endpoint,
                    request: _req,
                    token: accessToken,
                });
            } else {
                result = svc.call({
                    method: method,
                    endpoint: endpoint,
                    token: accessToken,
                });
            }
            if (result.error === 401) {
                break;
            }
            break;
        }

        if (!result.ok) {
            cache.invalidate(cacheKey);
            response.setStatus(result.error);
            var errorMessage = result.errorMessage;
            try {
                errorMessage = JSON.parse(result.errorMessage).error.message;
            } catch (e) {
                // do nothing
            }
            response.getWriter().println(
                JSON.stringify(
                    {
                        error: errorMessage,
                    },
                    null,
                    4,
                ),
            );
            return;
        }
    } catch (e) {
        cache.invalidate(cacheKey);
        response.setStatus(500);
        response.getWriter().println(
            JSON.stringify(
                {
                    error: e.message,
                },
                null,
                4,
            ),
        );
        return;
    }
    if (result.object.contentType.toLowerCase().includes("text/event-stream")) {
        // SSE response
        response.setContentType("text/event-stream");
    }
    response.getWriter().println(result.object.body);
}

AgentApiRequest.public = true;
module.exports.AgentApiRequest = AgentApiRequest;
