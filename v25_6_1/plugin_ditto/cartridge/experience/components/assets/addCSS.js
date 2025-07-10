'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'css-file-' + context.component.getID();
    model.cssFile = content.css_file;

    return new Template('experience/components/assets/addCSS').render(model).text;
};