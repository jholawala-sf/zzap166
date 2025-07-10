'use strict'

var Logger = require('dw/system/Logger')
var server = require('server')
var embeddingsService = require('*/cartridge/scripts/services/embeddingsService')
var utils = require('*/cartridge/scripts/helpers/pageDesignerUtils')

var log = Logger.getLogger(
  'plugin_einstein_pd',
  'plugin_einstein_pd.controllers.Embeddings'
)

/**
 * Create an embedding vector representing the input text.
 * @param {middleware} - server.middleware.https
 */
server.post(
  'CreateEmbedding',
  server.middleware.https,
  function (req, res, next) {
    try {
      var requestBody = utils.getRequestBody(req)
      var createEmbeddingResult = embeddingsService.createEmbedding({
        requestBody: requestBody
      })

      log.info('Successfully called EGPT CreateEmbedding API. ')

      res.json(createEmbeddingResult)
    } catch (e) {
      var error = JSON.parse(e.message)
      var errorCode = error.type === 'Service' ? error.errorCode : error.status
      response.setStatus(errorCode ? errorCode : 400)

      log.error(
        'Failed to call EGPT CreateEmbedding API.' +
          errorCode +
          ' Error: ' +
          JSON.stringify(error)
      )

      res.json(e)
    }
    return next()
  }
)

module.exports = server.exports()
