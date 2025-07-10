'use strict'

var Logger = require('dw/system/Logger')
var server = require('server')
var chatSessionsService = require('*/cartridge/scripts/services/chatSessionsService')
var utils = require('*/cartridge/scripts/helpers/pageDesignerUtils')

var log = Logger.getLogger(
  'plugin_einstein_pd',
  'plugin_einstein_pd.controllers.ChatSessions'
)

/**
 * Create a chat session based on the provider's parameters.
 * @param {middleware} - server.middleware.https
 */
server.post(
  'CreateSession',
  server.middleware.https,
  function (req, res, next) {
    try {
      var requestBody = utils.getRequestBody(req)
      var createChatSessionResult = chatSessionsService.createChatSession({
        requestBody: requestBody
      })

      log.info('Successfully called EGPT CreateSession API. ')

      res.json(createChatSessionResult)
    } catch (e) {
      var error = JSON.parse(e.message)
      var errorCode = error.type === 'Service' ? error.errorCode : error.status
      response.setStatus(errorCode ? errorCode : 400)

      log.error(
        'Failed to call EGPT CreateSession API. ' +
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
 * Get details about an existing chat session.
 * @param {middleware} - server.middleware.https
 */
server.get('GetSession', server.middleware.https, function (req, res, next) {
  try {
    var sessionId = req.querystring.sessionId
    var getChatSessionResult = chatSessionsService.getChatSession({
      sessionId: sessionId
    })

    log.info('Successfully called EGPT GetSession API. sessionId:' + sessionId)

    res.json(getChatSessionResult)
  } catch (e) {
    var error = JSON.parse(e.message)
    var errorCode = error.type === 'Service' ? error.errorCode : error.status
    response.setStatus(errorCode ? errorCode : 400)

    log.error(
      'Failed to call EGPT GetSession API. ' +
        errorCode +
        'Error: ' +
        JSON.stringify(error) +
        '; sessionId:' +
        sessionId
    )

    res.json(e)
  }
  return next()
})

/**
 * End an existing chat session.
 * @param {middleware} - server.middleware.https
 */
server.get('EndSession', server.middleware.https, function (req, res, next) {
  try {
    var sessionId = req.querystring.sessionId
    var endChatSessionResult = chatSessionsService.endChatSession({
      sessionId: sessionId
    })

    log.info('Successfully called EGPT EndSession API. sessionId: ' + sessionId)

    res.json(endChatSessionResult)
  } catch (e) {
    var error = JSON.parse(e.message)
    var errorCode = error.type === 'Service' ? error.errorCode : error.status
    response.setStatus(errorCode ? errorCode : 400)

    log.error(
      'Failed to call EGPT EndSession API. ' +
        errorCode +
        'Error: ' +
        JSON.stringify(error) +
        '; sessionId: ' +
        sessionId
    )

    res.json(e)
  }
  return next()
})

module.exports = server.exports()
