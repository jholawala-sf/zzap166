const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the product tile.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

    model.product = content.product;
    model.swatches = content.swatches;
    model.ratings = content.ratings;
    model.quickView = content.quickView;

    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/assets/productTile').render(model).text;
};
