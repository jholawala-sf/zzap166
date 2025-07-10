var Fetch = require('*/cartridge/scripts/services/httpFetch')
var config = require('*/cartridge/scripts/config/pageDesignerConfig')

var SERVICE = config.EGPT_SERVICE

/**
 * Create an embedding vector representing the input text.
 * @param {Object} parameters -  an object containing request parameters.
 * @param {Object} parameters.requestBody -  an object containing requestBody for create embeddings API.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/embeddings
 * @returns {Object} response object from create embeddings API.
 */
var createEmbedding = function (parameters) {
  var createEmbeddingPath = '/embeddings'

  if (!parameters.requestBody['input']) {
    var error = {
      status: '400',
      errorText: 'Bad Request!'
    }
    Fetch.throwHttpError(error, 'input is required in request body.')
  }

  var createEmbeddingOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: parameters.requestBody
  }

  var createEmbeddingResult = Fetch.fetch(
    SERVICE,
    createEmbeddingPath,
    createEmbeddingOptions
  )

  if (!createEmbeddingResult.ok) {
    Fetch.throwHttpError(createEmbeddingResult, 'Failed to create embedding!')
  }

  return createEmbeddingResult
}

module.exports = {
  createEmbedding: createEmbedding
}
