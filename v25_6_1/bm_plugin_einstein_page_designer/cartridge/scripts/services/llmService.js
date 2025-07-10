var Fetch = require('*/cartridge/scripts/services/httpFetch')
var config = require('*/cartridge/scripts/config/pageDesignerConfig')

var SERVICE = config.EGPT_SERVICE

/**
 * List the models for a given provider.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/models
 * @returns {Object} response object from get llm models API.
 */
var getLLMModels = function () {
  var getLLMModelsPath = '/models'

  var getLLMModelsOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var getLLMModelsResult = Fetch.fetch(
    SERVICE,
    getLLMModelsPath,
    getLLMModelsOptions
  )

  if (!getLLMModelsResult.ok) {
    Fetch.throwHttpError(getLLMModelsResult, 'Failed to get LLM Models!')
  }

  return getLLMModelsResult
}

/**
 * List the LLM providers supported by the gateway.
 * Visit docs for schema: https://git.soma.salesforce.com/pages/tech-enablement/einstein/docs/gateway/apis/rest/#operation/llmProviders
 * @returns {Object} response object from get llm providers API.
 */
var getLLMProviders = function () {
  var getLLMProvidersPath = '/llm-providers'

  var getLLMProvidersOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  var getLLMProvidersResult = Fetch.fetch(
    SERVICE,
    getLLMProvidersPath,
    getLLMProvidersOptions
  )

  if (!getLLMProvidersResult.ok) {
    Fetch.throwHttpError(getLLMProvidersResult, 'Failed to get LLM Providers!')
  }

  return getLLMProvidersResult
}

module.exports = {
  getLLMModels: getLLMModels,
  getLLMProviders: getLLMProviders
}
