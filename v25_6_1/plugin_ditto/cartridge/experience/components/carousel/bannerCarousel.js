const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

/**
 * Render logic for the layouts.dynamic_row.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { component, content } = context;

    const wrapperClasses = ['banner-carousel-wrapper'];
    const slickConfig = { rows: 0 };

    if (!content.isFullWidth) {
        wrapperClasses.push('container');
    }

    slickConfig.infiniteScroll = false;
    if (content.infiniteScroll) {
        slickConfig.infiniteScroll = content.infiniteScroll;
    }

    slickConfig.autoplay = false;
    if (content.autoplay) {
        slickConfig.autoplay = content.autoplay;
    }

    slickConfig.autoplaySpeed = 5;
    if (content.autoplaySpeed) {
        slickConfig.autoplaySpeed = content.autoplaySpeed * 1000;
    }

    slickConfig.arrows = false;
    if (content.arrows) {
        slickConfig.arrows = content.arrows;
    }

    slickConfig.dots = false;
    if (content.dots) {
        slickConfig.dots = content.dots;
    }

    model.slickConfig = JSON.stringify(slickConfig);
    model.wrapperClasses = wrapperClasses.join(' ');

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/carousel/bannerCarousel').render(model).text;
};
