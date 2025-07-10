/**
 * Extracts request body from req object and returns the object as JSON.
 * @param {Object} req - request object
 * @returns JSON object containing request body.
 */
function getRequestBody(req) {
  var requestBody = {}
  var httpParameterMap = req.httpParameterMap
    ? req.httpParameterMap
    : request.httpParameterMap
  requestBody = JSON.parse(httpParameterMap.getRequestBodyAsString() || '{}')
  return requestBody
}

/**
 * Test if string represents a valid JSON object.
 * @param {String} str string to test.
 * @returns true if string is valid JSON; false otherwise.
 */
function isJSONString(str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

module.exports = {
  getRequestBody: getRequestBody,
  isJSONString: isJSONString
}
