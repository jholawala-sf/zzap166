const RESTResponseMgr = require('dw/system/RESTResponseMgr');
const Site = require('dw/system/Site');
const CustomObjectMgr = require('dw/object/CustomObjectMgr');
const Verification = require("*/cartridge/scripts/verification");

/**
 * Get All Agents
 */
exports.getAgents = function () {
    var apiResponse = RESTResponseMgr.createEmptySuccess(204);
    try {
        // load custom objects of type QLabsDataStore
        const agentsObjs = CustomObjectMgr.queryCustomObjects(
            "QLabsDataStore",
            "custom.typeId = {0}",
            "lastModified",
            "agents",
        );

        const storefrontAgents = [];

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
                            id: agent.custom.id,
                        },
                        data,
                    ),
                );
            }
        }
        apiResponse = RESTResponseMgr.createSuccess({
            agents: storefrontAgents,
        });
    } catch (e) {
        apiResponse = RESTResponseMgr.createError(500, 'server-error', e.name || 'Server Error', e.message);
    }
    return apiResponse.render();
};

exports.getAgents.public = true;

/**
 * Get an authentication JWT for the user
 */
exports.getUserVerification = function () {
    var apiResponse = RESTResponseMgr.createEmptySuccess(204);
    try {
        var jwt = Verification.generateJWTStorefront();
        apiResponse = RESTResponseMgr.createSuccess({
            jwt: jwt,
        });
    } catch (e) {
        apiResponse = RESTResponseMgr.createError(500, 'server-error', e.name || 'Server Error', e.message);
    }
    return apiResponse.render();
};

exports.getUserVerification.public = true;
