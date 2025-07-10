"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

var PageRenderHelper = require("*/cartridge/experience/utilities/PageRenderHelper.js");
var Helpers = require("*/cartridge/experience/helpers.js");

/**
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();

    model._typeID = context.component.typeID;

    model.regions = PageRenderHelper.getRegionModelRegistry(context.component);
    model.agentDeployment = Helpers.convertObjectToSerializable(
        context.content.get("agent") || {}
    );
    model.agentContext = model.agentDeployment.agentContext || {};
    model.containerStyles = Helpers.convertObjectToSerializable(
        context.content.get("__containerStyles") || {}
    );

    return new Template("experience/components/agent").render(model).text;
};

module.exports.serialize = function () {};
