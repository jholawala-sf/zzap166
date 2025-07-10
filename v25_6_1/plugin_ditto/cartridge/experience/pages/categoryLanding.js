const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for the dynamiclayout.
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @returns {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { page } = context;

    model.page = page;

    model.regions = PageRenderHelper.getRegionModelRegistry(page);
    model.isInEditMode = PageRenderHelper.isInEditMode();

    if (PageRenderHelper.isInEditMode()) {
        dw.system.HookMgr.callHook('app.experience.editmode', 'editmode');
    }

    PageRenderHelper.decorateModel(model, context);

    return new Template('experience/pages/category-landing').render(model).text;
};
