const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.dynamic_row.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;
    const wrapperClasses = ['einstein-carousel-category'];

    if (!content.isFullWidth) {
        wrapperClasses.push('container');
    }

    const anchor = [{ id: content.category.ID }];

    model.recommender = content.recommender.recommender;
    model.anchor = JSON.stringify(anchor);
    model.loadUrl = URLUtils.abs('Tile-RecommendationAjaxLoad');

    model.carouselConfig = PageRenderHelper.getCarouselConfig(content.breakpoints);
    model.wrapperClasses = wrapperClasses.join(' ');

    return new Template('experience/components/carousel/einsteinCarouselCategory').render(model).text;
};
