'use strict'

var Logger = require('dw/system/Logger')
var server = require('server')
var generationsService = require('*/cartridge/scripts/services/generationsService')
var utils = require('*/cartridge/scripts/helpers/pageDesignerUtils')
var CaseInsensitiveMap = require('*/cartridge/scripts/models/CaseInsensitiveMap')

var log = Logger.getLogger(
  'plugin_einstein_pd',
  'plugin_einstein_pd.controllers.Generations'
)

/** global request */

/**
 * Register feedback for a generation.
 * @param {middleware} - server.middleware.https
 */
server.post(
  'RegisterFeedback',
  server.middleware.https,
  function (req, res, next) {
    try {
      var requestBody = utils.getRequestBody(req)
      var registerFeedbackForGenerationResult =
        generationsService.registerFeedbackForGeneration({
          requestBody: requestBody
        })

      log.info('Successfully called EGPT RegisterFeedback API.')

      res.json(registerFeedbackForGenerationResult)
    } catch (e) {
      var error = JSON.parse(e.message)
      var errorCode = error.type === 'Service' ? error.errorCode : error.status
      response.setStatus(errorCode ? errorCode : 400)

      log.error(
        'Failed to call EGPT RegisterFeedback API. ' +
          errorCode +
          'Error: ' +
          JSON.stringify(error)
      )

      res.json(e)
    }
    return next()
  }
)

/**
 * Generate a chat response based on the provided prompt, previous chat messages, and session parameters.
 * @param {middleware} - server.middleware.https
 */
server.post(
  'ChatGenerations',
  server.middleware.https,
  function (req, res, next) {
    try {
      var sessionId = req.querystring.sessionId
      var requestBody = utils.getRequestBody(req)
      var generateResponseForChatSessionResult =
        generationsService.generateResponseForChatSession({
          requestBody: requestBody,
          sessionId: sessionId
        })

      log.info(
        'Successfully called EGPT ChatGenerations API. sessionId: ' + sessionId
      )

      res.json(generateResponseForChatSessionResult)
    } catch (e) {
      var error = JSON.parse(e.message)
      var errorCode = error.type === 'Service' ? error.errorCode : error.status
      response.setStatus(errorCode ? errorCode : 400)

      log.error(
        'Failed to call EGPT ChatGenerations API.' +
          errorCode +
          ' Error: ' +
          JSON.stringify(error) +
          '; sessionId: ' +
          sessionId
      )

      res.json(e)
    }
    return next()
  }
)

/**
 * Generate a response based on the list of messages with different roles and model parameters.
 * @param {middleware} - server.middleware.https
 */
server.post('ChatMessages', server.middleware.https, function (req, res, next) {
  try {
    var requestBody = utils.getRequestBody(req)
    var generateResponseForMessagesListResult =
      generationsService.generateResponseForMessagesList({
        requestBody: requestBody
      })

    log.info('Successfully called EGPT ChatMessages API.')

    res.json(generateResponseForMessagesListResult)
  } catch (e) {
    var error = JSON.parse(e.message)
    var errorCode = error.type === 'Service' ? error.errorCode : error.status
    response.setStatus(errorCode ? errorCode : 400)

    log.error(
      'Failed to call EGPT ChatMessages API.' +
        errorCode +
        ' Error: ' +
        JSON.stringify(error)
    )

    res.json(e)
  }
  return next()
})

/**
 * Generate a response based on the provided prompt and model parameters.
 * @param {middleware} - server.middleware.https
 */
server.post(
  'GenerateResponse',
  server.middleware.https,
  function (req, res, next) {
    try {
      var requestBody = utils.getRequestBody(req)
      var generateResponseForPromptResult =
        generationsService.generateResponseForPrompt({
          requestBody: requestBody
        })

      log.info('Successfully called EGPT GenerateResponse API.')

      res.json(generateResponseForPromptResult)
    } catch (e) {
      var error = JSON.parse(e.message)
      var errorCode = error.type === 'Service' ? error.errorCode : error.status
      response.setStatus(errorCode ? errorCode : 400)

      log.error(
        'Failed to call EGPT GenerateResponse API. ' +
          errorCode +
          ' Error: ' +
          JSON.stringify(error)
      )

      res.json(e)
    }
    return next()
  }
)

/**
 * Generate a response based on the provided prompt and model parameters.
 * @param {middleware} - server.middleware.https
 */
server.post(
  'PluginResponse',
  server.middleware.https,
  function (req, res, next) {
    try {
      var pluginName = req.querystring.pluginName
      var requestBody = utils.getRequestBody(req)

      var reqHeaders = CaseInsensitiveMap.getCaseInsensitiveMap(
        request.getHttpHeaders()
      )
      var consumerPath = reqHeaders.get('x-sfdc-consumer-path')

      var generateResponseForPluginResult =
        generationsService.generateResponseForPlugin({
          requestBody: requestBody,
          pluginName: pluginName,
          consumerPath: consumerPath
        })

      log.info(
        'Successfully called EGPT PluginResponse API; pluginName: ' +
          pluginName +
          '; consumerPath:' +
          consumerPath
      )

      res.json(generateResponseForPluginResult)
    } catch (e) {
      var error = JSON.parse(e.message)
      var errorCode = error.type === 'Service' ? error.errorCode : error.status
      response.setStatus(errorCode ? errorCode : 400)

      log.error(
        'Failed to call EGPT PluginResponse API. ' +
          errorCode +
          ' Error: ' +
          JSON.stringify(error) +
          '; pluginName: ' +
          pluginName +
          '; consumerPath:' +
          consumerPath
      )

      res.json(e)
    }
    return next()
  }
)

module.exports = server.exports()
