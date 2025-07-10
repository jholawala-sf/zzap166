const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for the product list page.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { page } = context;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(page);
    model.decorator = PageRenderHelper.determineDecorator(context);


    if (PageRenderHelper.isInEditMode()) {
        dw.system.HookMgr.callHook('app.experience.editmode', 'editmode');
    }

    PageRenderHelper.decorateModel(model, context);

    // render the page
    return new Template('experience/pages/productListing').render(model).text;
};
