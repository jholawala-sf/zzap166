'use strict'

var Template = require('dw/util/Template')
var HashMap = require('dw/util/HashMap')

/**
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
  var model = new HashMap()

  model.html = context.content.code.code.html
  model.react = context.content.code.code.react
  model.mode = context.content.code.mode
  model.componentID = context.component.ID

  return new Template('experience/components/headless/einsteinAssisted').render(
    model
  ).text
}

module.exports.serialize = function (context) {
  return {}
}
