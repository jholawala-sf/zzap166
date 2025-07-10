'use strict'

var Logger = require('dw/system/Logger')
var server = require('server')
var CustomObjectMgr = require('dw/object/CustomObjectMgr')
var Transaction = require('dw/system/Transaction')

var CUSTOM_OBJECT_TYPE = 'einsteinGeneratedComponent'

var log = Logger.getLogger(
  'plugin_einstein_pd',
  'plugin_einstein_pd.controllers.SavedComponents'
)

server.get('List', function (req, res, next) {
  try {
    var customObjectsIterator
    try {
      // If this throws "Type does not exist",
      // you need to go to business manager and import the
      // metadata type definition ../metadata/einstein_component_definition.xml
      customObjectsIterator =
        CustomObjectMgr.getAllCustomObjects(CUSTOM_OBJECT_TYPE)
    } catch (e) {
      var error = JSON.parse(e.message)
      res.setStatusCode(500)

      log.error(
        'Failed to call List custom object. Error: ' + JSON.stringify(error)
      )

      res.json({
        error: 'An unexpected error occurred while retrieving custom objects'
      })

      return next()
    }

    var customObjects = []

    log.info(
      'Successfully called List custom object. CUSTOM_OBJECT_TYPE: ' +
        CUSTOM_OBJECT_TYPE
    )

    // TODO: pagination
    while (customObjectsIterator.hasNext()) {
      var customObject
      try {
        customObject = customObjectsIterator.next()
      } catch (e) {
        var error = JSON.parse(e.message)
        res.setStatusCode(500)

        log.error(
          'Failed while processing List custom objects. Error: ' +
            JSON.stringify(error)
        )

        res.json({
          error: 'An unexpected error occurred while processing custom objects'
        })
        customObjectsIterator.close()
        return next()
      }
      customObjects.push({
        name: customObject.custom.name,
        html: customObject.custom.html,
        react: customObject.custom.react,
        id: customObject.custom.id,
        messages: customObject.custom.messages,
        sessionId: customObject.custom.sessionId,
        sessionExpiry: customObject.custom.sessionExpiry
      })
    }
    customObjectsIterator.close()

    // Send response
    res.json({
      customObjects: customObjects
    })
  } catch (e) {
    var error = JSON.parse(e.message)
    res.setStatusCode(500)

    log.error(
      'Failed to call List custom object. Error: ' + JSON.stringify(error)
    )

    res.json({
      error: 'An unexpected error occurred'
    })
  }
  return next()
})

server.post('UpdateOrCreate', function (req, res, next) {
  try {
    var id = req.httpParameterMap.id.stringValue
    var body = req.httpParameterMap.getRequestBodyAsString()
    var json

    try {
      json = JSON.parse(body)
    } catch (e) {
      var error = JSON.parse(e.message)
      res.setStatusCode(400)

      log.error(
        'Failed to call UpdateOrCreate custom object. Error: ' +
          JSON.stringify(error)
      )

      res.json({ error: 'Invalid JSON format in request body' })

      return next()
    }

    var customObject = CustomObjectMgr.getCustomObject(CUSTOM_OBJECT_TYPE, id)
    if (!customObject) {
      Transaction.wrap(function () {
        var newCustomObject = CustomObjectMgr.createCustomObject(
          CUSTOM_OBJECT_TYPE,
          id
        )

        newCustomObject.custom.html = json.html
        newCustomObject.custom.react = json.react
        newCustomObject.custom.name = json.name
        newCustomObject.custom.sessionId = json.sessionId
        newCustomObject.custom.sessionExpiry = json.sessionExpiry
        newCustomObject.custom.messages = JSON.stringify(json.messages) || '[]'
      })

      res.setStatusCode(201) // Created

      log.info(
        'Successfully called UpdateOrCreate custom object. CUSTOM_OBJECT_TYPE: ' +
          CUSTOM_OBJECT_TYPE +
          '; id: ' +
          id +
          ' created successfully'
      )

      res.json({ message: 'Custom object created successfully.' })

      return next()
    }

    Transaction.wrap(function () {
      customObject.custom.html = json.html
      customObject.custom.react = json.react
      customObject.custom.sessionId = json.sessionId
      customObject.custom.sessionExpiry = json.sessionExpiry
      customObject.custom.messages = JSON.stringify(json.messages) || '[]'
    })

    res.setStatusCode(200)

    log.info(
      'Successfully called UpdateOrCreate custom object. CUSTOM_OBJECT_TYPE: ' +
        CUSTOM_OBJECT_TYPE +
        '; id: ' +
        id +
        ' updated successfully'
    )

    res.json({
      message: 'Custom object updated successfully.'
    })
  } catch (e) {
    var error = JSON.parse(e.message)
    res.setStatusCode(500)

    log.error(
      'Failed to call UpdateOrCreate custom object. Error: ' +
        JSON.stringify(error)
    )

    res.json({ error: 'An unexpected error occurred' })
  }
  return next()
})

// :( SFRA server doesn't support DELETE method?
// use GET instead
server.get('Delete', function (req, res, next) {
  try {
    var id = req.httpParameterMap.id.stringValue

    var customObject = CustomObjectMgr.getCustomObject(CUSTOM_OBJECT_TYPE, id)
    if (!customObject) {
      res.setStatusCode(404)

      log.error(
        'Failed to call UpdateOrCreate custom object. CUSTOM_OBJECT_TYPE ' +
          CUSTOM_OBJECT_TYPE +
          +'; id: ' +
          id +
          ' not found'
      )

      res.json({ error: 'Custom object not found.' })
      return next()
    }

    Transaction.wrap(function () {
      CustomObjectMgr.remove(customObject)
    })

    res.setStatusCode(200)

    log.info(
      'Successfully called Delete custom object. CUSTOM_OBJECT_TYPE: ' +
        CUSTOM_OBJECT_TYPE +
        '; id: ' +
        id +
        ' deleted successfully'
    )

    res.json({
      message: 'Custom object deleted successfully.'
    })
  } catch (e) {
    var error = JSON.parse(e.message)
    res.setStatusCode(500)

    log.error(
      'Failed to call Delete custom object. Error: ' + JSON.stringify(error)
    )

    res.json({ error: 'An unexpected error occurred' })
  }
  return next()
})

// Export the server module
module.exports = server.exports()
