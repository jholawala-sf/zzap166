const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.dynamic_row.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { component, content } = context;

    const wrapperClasses = [];

    if (!content.isFullWidth) {
        wrapperClasses.push('container');
    }

    model.carouselConfig = PageRenderHelper.getCarouselConfig(content.breakpoints);
    model.wrapperClasses = wrapperClasses.join(' ');

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/carousel/productCarousel').render(model).text;
};
