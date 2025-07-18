'use strict'

var Template = require('dw/util/Template')
var HashMap = require('dw/util/HashMap')

var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for headless.carousel component.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function(context) {
    var model = new HashMap()

    model._typeID = context.component.typeID
    model.regions = PageRenderHelper.getRegionModelRegistry(context.component)

    return new Template('experience/components/headlessComponent').render(model).text
}
