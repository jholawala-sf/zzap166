'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = 'lightning-out-' + context.component.getID();
    model.appName = content.app_name;
    model.cmptName = content.cmpt_name;
    model.communityUrl = content.community_url;
    model.loadJsUrl = content.community_url + '/lightning/lightning.out.js';

    return new Template('experience/components/assets/lightningOut').render(model).text;
};