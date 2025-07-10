const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');

/**
 * Render logic for the html editor.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

    model.html = content.html.content;

    return new Template('experience/components/assets/html').render(model).text;
};
