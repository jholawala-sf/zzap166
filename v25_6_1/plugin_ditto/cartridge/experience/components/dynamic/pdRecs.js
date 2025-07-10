const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
const productHelper = require('*/cartridge/scripts/helpers/productHelpers.js');

/**
 * Render logic for the storefront.popularCategories.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { component, content: { product } } = context;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    const params = { pid: product.ID };
    const productHelperResult = productHelper.showProductPage(params, request.pageMetaData);
    const productType = productHelperResult.product.productType;

    let template;
    if (!productHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
        template = new Template('error/notFound');
        template.setStatusCode(404);
        return template.render().text;
    }

    model.product = productHelperResult.product;
    model.bgCol = context.content.bgCol.color;

    return new Template('experience/dynamic/product/pdRecs').render(model).text;
};
