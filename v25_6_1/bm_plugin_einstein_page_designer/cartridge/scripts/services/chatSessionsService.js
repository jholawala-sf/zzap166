var Fetch = require('*/cartridge/scripts/services/httpFetch')
var config = require('*/cartridge/scripts/config/pageDesignerConfig')

var SERVICE = config.EGPT_SERVICE

/**
 * Create a chat session based on the provider's parameters.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {Object} parameters.requestBody -  an object containing requestBody for create chat session API.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/createChatSession
 * @returns {Object} response object from create chat session API.
 */
var createChatSession = function (parameters) {
  var createChatSessionPath = '/chat/sessions'

  var createChatSessionOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: parameters.requestBody
  }

  var createChatSessionResult = Fetch.fetch(
    SERVICE,
    createChatSessionPath,
    createChatSessionOptions
  )

  if (!createChatSessionResult.ok) {
    Fetch.throwHttpError(
      createChatSessionResult,
      'Failed to create chat session!'
    )
  }

  return createChatSessionResult
}

/**
 * Create a chat session for given sessionId.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {string} parameters.sessionId - required; Id associated with session to retreive.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/getChatSession
 * @returns {Object} response object from get chat session API.
 */
var getChatSession = function (parameters) {
  if (!parameters.sessionId) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'sessionId param is required')
  }

  var getChatSessionPath = `/chat/session/${parameters.sessionId}`

  var getChatSessionOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var getChatSessionResult = Fetch.fetch(
    SERVICE,
    getChatSessionPath,
    getChatSessionOptions
  )

  if (!getChatSessionResult.ok) {
    Fetch.throwHttpError(getChatSessionResult, 'Failed to get chat session!')
  }

  return getChatSessionResult
}

/**
 * End an existing chat session for given sessionId.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {string} parameters.sessionId - required; Id associated with session to end.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/deleteChatSession
 * @returns {Object} response object from end chat session API.
 */
var endChatSession = function (parameters) {
  if (!parameters.sessionId) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'sessionId param is required')
  }

  var endChatSessionPath = `/chat/session/${parameters.sessionId}`

  var endChatSessionOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var endChatSessionResult = Fetch.fetch(
    SERVICE,
    endChatSessionPath,
    endChatSessionOptions
  )

  if (!endChatSessionResult.ok) {
    Fetch.throwHttpError(endChatSessionResult, 'Failed to get chat session!')
  }

  return endChatSessionResult
}

module.exports = {
  createChatSession: createChatSession,
  getChatSession: getChatSession,
  endChatSession: endChatSession
}
