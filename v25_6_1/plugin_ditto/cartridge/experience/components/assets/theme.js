const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for the banner
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

    var contentKeys = content.keySet();
    var it = contentKeys.iterator();
    while(it.hasNext()) {
        var k = it.next();
        model[k] = content.get(k);
    }

    model.editMode = PageRenderHelper.isInEditMode();

    return new Template('experience/components/assets/theme').render(model).text;
};
