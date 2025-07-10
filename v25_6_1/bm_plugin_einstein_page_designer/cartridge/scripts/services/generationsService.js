var Fetch = require('*/cartridge/scripts/services/httpFetch')
var UUIDUtils = require('dw/util/UUIDUtils')
var config = require('*/cartridge/scripts/config/pageDesignerConfig')

var SERVICE = config.EGPT_SERVICE

/**
 * Register feedback for a generation.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {Object} parameters.requestBody -  an object containing requestBody for create chat session API.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/feedback
 * @returns {Object} response object from register feedback API.
 */
var registerFeedbackForGeneration = function (parameters) {
  var registerFeedbackForGenerationPath = '/feedback'

  parameters.requestBody['id'] =
    parameters.requestBody['id'] || UUIDUtils.createUUID()

  if (!parameters.requestBody['generation_id']) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'generation_id is required in request body.')
  }

  var registerFeedbackForGenerationOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: parameters.requestBody
  }

  var registerFeedbackForGenerationResult = Fetch.fetch(
    SERVICE,
    registerFeedbackForGenerationPath,
    registerFeedbackForGenerationOptions
  )

  if (!registerFeedbackForGenerationResult.ok) {
    Fetch.throwHttpError(
      registerFeedbackForGenerationResult,
      'Failed to register feedback!'
    )
  }

  return registerFeedbackForGenerationResult
}

/**
 * Generate a chat response based on the provided prompt, previous chat messages, and session parameters.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {Object} parameters.requestBody -  an object containing requestBody for generate response for chat session API.
 * @param {string} parameters.sessionId - required; Id associated with chat session.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/chatGenerations
 * @returns {Object} response object from generations for chat sessions API.
 */
var generateResponseForChatSession = function (parameters) {
  if (!parameters.sessionId) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'sessionId param is required')
  }

  var generateResponseForChatSessionPath = `/chat/session/${parameters.sessionId}/messages`

  if (!parameters.requestBody['user_message']) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'user_message is required in request body.')
  }

  var generateResponseForChatSessionOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: parameters.requestBody
  }

  var generateResponseForChatSessionResult = Fetch.fetch(
    SERVICE,
    generateResponseForChatSessionPath,
    generateResponseForChatSessionOptions
  )

  if (!generateResponseForChatSessionResult.ok) {
    Fetch.throwHttpError(
      generateResponseForChatSessionResult,
      'Failed to generate response for chat session!'
    )
  }

  return generateResponseForChatSessionResult
}

/**
 * Generate a response based on the list of messages with different roles and model parameters.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {Object} parameters.requestBody -  an object containing requestBody for generate response for messages list API.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/chatMessages
 * @returns {Object} response object from generations for messages list API.
 */
var generateResponseForMessagesList = function (parameters) {
  var generateResponseForMessagesListPath = '/chat/generations'

  if (!parameters.requestBody['messages']) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'messages[] is required in request body.')
  }

  var generateResponseForMessagesListOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: parameters.requestBody
  }

  var generateResponseForMessagesListResult = Fetch.fetch(
    SERVICE,
    generateResponseForMessagesListPath,
    generateResponseForMessagesListOptions
  )

  if (!generateResponseForMessagesListResult.ok) {
    Fetch.throwHttpError(
      generateResponseForMessagesListResult,
      'Failed to generate response for messages list!'
    )
  }

  return generateResponseForMessagesListResult
}

/**
 * Generate a response based on the list of messages with different roles and model parameters.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {Object} parameters.requestBody -  an object containing requestBody for generate response for prompt API.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/generations
 * @returns {Object} response object from generations for prompt API.
 */
var generateResponseForPrompt = function (parameters) {
  var generateResponseForPromptPath = '/generations'

  if (!parameters.requestBody['prompt']) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'prompt is required in request body.')
  }

  var generateResponseForPromptOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: parameters.requestBody
  }

  var generateResponseForPromptResult = Fetch.fetch(
    SERVICE,
    generateResponseForPromptPath,
    generateResponseForPromptOptions
  )

  if (!generateResponseForPromptResult.ok) {
    Fetch.throwHttpError(
      generateResponseForPromptResult,
      'Failed to generate response for prompt!'
    )
  }

  return generateResponseForPromptResult
}

/**
 * Generate a response to an external request based on the provided prompt and model parameters.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {Object} parameters.requestBody -  an object containing requestBody for generate response for plugin API.
 * @param {Object} parameters.pluginName -  an object containing requestBody for generate response for plugin API.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/pluginGenerations
 * @returns {Object} response object from generations for plugin API.
 */
var generateResponseForPlugin = function (parameters) {
  if (!parameters.pluginName) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'pluginName param is required')
  }

  var generateResponseForPluginPath = `/plugins/${parameters.pluginName}/generations`

  if (!parameters.consumerPath) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'X-SFDC-Consumer-Path header is required.')
  }

  var generateResponseForPluginOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-SFDC-Consumer-Path': parameters.consumerPath
    },
    body: parameters.requestBody
  }

  var generateResponseForPluginResult = Fetch.fetch(
    SERVICE,
    generateResponseForPluginPath,
    generateResponseForPluginOptions
  )

  if (!generateResponseForPluginResult.ok) {
    Fetch.throwHttpError(
      generateResponseForPluginResult,
      'Failed to generate response for plugin!'
    )
  }

  return generateResponseForPluginResult
}

module.exports = {
  registerFeedbackForGeneration: registerFeedbackForGeneration,
  generateResponseForChatSession: generateResponseForChatSession,
  generateResponseForMessagesList: generateResponseForMessagesList,
  generateResponseForPrompt: generateResponseForPrompt,
  generateResponseForPlugin: generateResponseForPlugin
}
