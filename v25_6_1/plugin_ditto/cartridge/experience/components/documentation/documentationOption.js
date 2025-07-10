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
    const { component, content } = context;
    model.id = content.id;
    model.name = content.name;
    model.isFile = !!content.isFilePicker;
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/documentation/documentationOption').render(model).text;
};
