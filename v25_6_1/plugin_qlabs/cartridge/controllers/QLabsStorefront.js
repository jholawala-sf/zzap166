const server = require("server");

const AgentApi = require("*/cartridge/scripts/services/agentapi");
const CustomObjectMgr = require("dw/object/CustomObjectMgr");
const Site = require("dw/system/Site");
const Verification = require("*/cartridge/scripts/verification");

server.get("Configuration", function (req, res, next) {
    // load custom objects of type QLabsDataStore
    const agentsObjs = CustomObjectMgr.queryCustomObjects(
        "QLabsDataStore",
        "custom.typeId = {0}",
        "lastModified",
        "agents",
    );

    const storefrontAgents = [];

    // TODO we should not be returning secret values
    while (agentsObjs.hasNext()) {
        var agent = agentsObjs.next();
        var data = JSON.parse(agent.custom.data);
        if (
            ((typeof data.siteId === "string" &&
                data.siteId === Site.current.ID) ||
                (typeof data.siteId === "object" &&
                    data.siteId.includes(Site.current.ID))) &&
            data.deployStorefront
        ) {
            storefrontAgents.push(
                Object.assign(
                    {},
                    {
                        __id: agent.custom.id,
                        __typeId: agent.custom.typeId,
                    },
                    data,
                ),
            );
        }
    }

    const featureObjs = CustomObjectMgr.queryCustomObjects(
        "QLabsDataStore",
        "custom.typeId = {0}",
        "lastModified",
        "features",
    );
    const storefrontFeatures = [];

    while (featureObjs.hasNext()) {
        var feature = featureObjs.next();
        var data = JSON.parse(feature.custom.data);
        if (
            ((typeof data.siteId === "string" &&
                data.siteId === Site.current.ID) ||
                (typeof data.siteId === "object" &&
                    data.siteId.includes(Site.current.ID))) &&
            data.deployStorefront
        ) {
            storefrontFeatures.push(
                Object.assign(
                    {},
                    {
                        __id: feature.custom.id,
                        __typeId: feature.custom.typeId,
                    },
                    data,
                ),
            );
        }
    }


    res.json({
        siteId: Site.current.ID,
        agents: storefrontAgents,
        features: storefrontFeatures,
    });
    next();
});

server.get("UserVerification", function (req, res, next) {
    var jwt = Verification.generateJWTStorefront();
    res.json({
        jwt: jwt,
    });
    next();
});

server.post("AgentApiRequest", function (req, res, next) {
    response.setContentType("application/json");

    const method = request.httpHeaders.get("x-original-method");
    const endpoint = request.httpHeaders.get("x-endpoint");

    // TODO we need to get specifics off this
    const agentId = request.httpHeaders.get("x-agent-id");

    const agentObj = CustomObjectMgr.getCustomObject("QLabsDataStore", agentId);

    if (!agentObj) {
        response.setStatus(404);
        res.json({
            error: "Agent not found",
        });
        next();
    }

    const agent = JSON.parse(agentObj.custom.data);
    var siteId = Site.current.ID;

    if (
        !(
            ((typeof agent.siteId === "string" && agent.siteId === siteId) ||
                (typeof agent.siteId === "object" &&
                    agent.siteId.includes(siteId))) &&
            agent.deployStorefront
        )
    ) {
        response.setStatus(403);
        res.json({
            error: "Agent not found",
        });
        next();
    }

    const cacheKey = agent.name + "-" + session.sessionID;
    const cache = dw.system.CacheMgr.getCache("agentApiSessions");

    try {
        var retries = 1;
        // TODO get out of privacy cache; it might be too big
        var accessToken;

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
            dw.system.Logger.debug(
                "Using cached access token for agent " + agent.name,
            );
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

                if (agent.enableSLASShopper) {
                    // TODO eventually hybrid auth mode should make this easier as
                    // it does the session bridge automatically
                    // for now this is a simple hack (TODO it also doesn't session bridge)
                    var slasToken = cache.get(cacheKey + "-slasToken");

                    if (!slasToken) {
                        const slasSvc = AgentApi.getSLASService();
                        const channelId = dw.system.Site.current.ID;

                        const slasResult = slasSvc.call({
                            grant_type: "client_credentials",
                            channel_id: channelId
                        });

                        if (!slasResult.ok) {
                            throw new Error("Error calling SLAS service: " + JSON.stringify(result.errorMessage))
                        }

                        slasToken = slasResult.object.access_token;
                        cache.put(cacheKey + "-slasToken", slasToken);
                    }

                    _req.variables.push({
                        name: "slasToken",
                        value: slasToken,
                        type: "Text",
                    });
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
            res.json({
                error: errorMessage,
            });
            next();
            return;
        }
    } catch (e) {
        cache.invalidate(cacheKey);
        response.setStatus(500);
        res.json({
            error: e.message,
        });
        next();
        return;
    }
    res.json(result.object);
    next();
});

server.get("AgentTest", function (req, res, next) {
    res.render("qlabs/agenttest");
    next();
});

server.get("ContentAsset", function (req, res, next) {
    const ContentMgr = require('dw/content/ContentMgr');
    var cid = req.querystring.cid;

    if (!cid) {
        res.setStatusCode(400);
        res.json({
            error: true,
            message: 'Content ID is required'
        });
        return next();
    }

    var content = ContentMgr.getContent(cid);
    if (!content) {
        res.setStatusCode(404);
        res.json({
            error: true,
            message: 'Content not found'
        });
        return next();
    }

    res.json({
        content: content.custom.body.markup || '',
        id: cid
    });
    next();
});

server.get("GetMiawFields", function (req, res, next) {
    const miawHelpers = require('*/cartridge/scripts/helpers/miawHelpers');
    const visible = req.querystring.visible || false;
    const hidden = req.querystring.hidden || false;
    const result = {};

    if (String(visible) === 'true') {
        result.visiblePrechatFields = miawHelpers.getVisiblePrechatFields(req.currentCustomer.raw);
    }
    if (String(hidden) === 'true') {
        result.hiddenPrechatFields = miawHelpers.getHiddenPrechatFields();
    }

    res.json(result);
    next();
});

// This is a test endpoint to simulate an SSE stream (which doesn't actually *stream* in controllers)
server.get('SSETest', function (req, res, next) {
    res.setStatusCode(200);
    res.setContentType('text/event-stream');
    response.setBuffered(false);
    res.print(`event: PROGRESS_INDICATOR
id: 1747859972614-REQ
data: {"timestamp":1747859976552,"originEventId":"1747859972614-REQ","traceId":"92a63d595de6a6d35574ad7399d70022","offset" :0,"message":{"type":"ProgressIndicator","id":"7c11825f-3e56-4a8c-80e0-6309b0569a84","metrics":{},"indicatorType":"ACTION" ,"message":"Searching for product recommendations..."}}

event: INFORM
id: 1747859972614-REQ
data: {"timestamp":1747859987784,"originEventId":"1747859972614-REQ","traceId":"92a63d595de6a6d35574ad7399d70022","offset" :0,"message":{"type":"Inform","id":"277e89c7-fd68-4de1-8eea-d264934056cf","metrics":{}}}

event: END_OF_TURN
id: 1747859972614-REQ
data: {"timestamp":1747859987788,"originEventId":"1747859972614-REQ","traceId":"92a63d595de6a6d35574ad7399d70022","offset":0,"message":{"type":"EndOfTurn","id":"fdf5b4f2-abe6-4e9e-b8a3-82e7ac947b54","metrics":{}}}\n\n`);
    next();
});

module.exports = server.exports();
