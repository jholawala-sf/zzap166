'use strict'

var Logger = require('dw/system/Logger')
var server = require('server')
var llmService = require('*/cartridge/scripts/services/llmService')

var log = Logger.getLogger(
  'plugin_einstein_pd',
  'plugin_einstein_pd.controllers.LLM'
)

/**
 * Get a list of models for a given provider.
 * @param {middleware} - server.middleware.https
 */
server.get('GetModels', server.middleware.https, function (req, res, next) {
  try {
    var getLLMModelsResult = llmService.getLLMModels()

    log.info('Successfully called EGPT GetModels API.')

    res.json(getLLMModelsResult)
  } catch (e) {
    var error = JSON.parse(e.message)
    var errorCode = error.type === 'Service' ? error.errorCode : error.status
    response.setStatus(errorCode ? errorCode : 400)

    log.error(
      'Failed to call EGPT GetModels API. ' +
        errorCode +
        ' Error: ' +
        JSON.stringify(error)
    )

    res.json(e)
  }
  return next()
})

/**
 * Get a list of models for a given provider.
 * @param {middleware} - server.middleware.https
 */
server.get('GetProviders', server.middleware.https, function (req, res, next) {
  try {
    var getLLMProvidersResult = llmService.getLLMProviders()

    log.info('Successfully called EGPT GetProviders API.')

    res.json(getLLMProvidersResult)
  } catch (e) {
    var error = JSON.parse(e.message)
    var errorCode = error.type === 'Service' ? error.errorCode : error.status
    response.setStatus(errorCode ? errorCode : 400)

    log.error(
      'Failed to call EGPT GetProviders API. ' +
        errorCode +
        'Error: ' +
        JSON.stringify(error)
    )

    res.json(e)
  }
  return next()
})

module.exports = server.exports()
