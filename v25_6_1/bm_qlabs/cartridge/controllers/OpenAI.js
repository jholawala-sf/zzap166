var getOpenAIService = require("*/cartridge/scripts/services/openai");

/**
 * Requests using the OpenAI API. Client side specifies parameters
 *
 * This is now deprecated in favor of EGPT
 * @constructor
 */
function OpenAIRequest() {
    // should only be accessible in BM context
    if (!session.userAuthenticated) {
        response.setStatus(403);
        return;
    }
    response.setContentType("application/json");

    if (!empty(request.httpParameterMap.requestBodyAsString)) {
        const method = request.httpParameterMap.get("_method").stringValue;
        const endpoint = request.httpParameterMap.get("_endpoint").stringValue;
        const _req = JSON.parse(request.httpParameterMap.requestBodyAsString);

        const svc = getOpenAIService();
        const result = svc.call({
            method: method,
            endpoint: endpoint,
            request: _req,
        });

        if (!result.ok) {
            response.setStatus(result.error);
            var errorMessage = result.errorMessage;
            try {
                response
                    .getWriter()
                    .println(
                        JSON.stringify(JSON.parse(result.errorMessage), null, 2)
                    );
            } catch (e) {
                response
                    .getWriter()
                    .println(JSON.stringify({ error: { message: errorMessage } }));
            }
            return;
        }
        const body = JSON.parse(result.object);
        response.getWriter().println(JSON.stringify(body, null, 4));
    } else {
        response.getWriter().println(
            JSON.stringify(
                {
                    error: "No request body",
                },
                null,
                4
            )
        );
        response.setStatus(500);
    }
}

OpenAIRequest.public = true;
module.exports.OpenAIRequest = OpenAIRequest;
