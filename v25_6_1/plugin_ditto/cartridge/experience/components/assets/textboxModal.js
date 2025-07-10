'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the storefront.editorialRichText component
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    var modalId = Math.floor(Math.random() * 16777215).toString(16);

    if (content.richText) {
        model.richText = content.richText;
    }
    if (content.modalLinkText && content.modalLinkContent) {
        model.modalLinkText = content.modalLinkText;
        model.modalLinkContent = content.modalLinkContent;
        model.modalId = modalId;
    }
    if (content.customCss) {
        model.customCss = content.customCss;
    }

    return new Template('experience/components/assets/textboxModal').render(model).text;
};
