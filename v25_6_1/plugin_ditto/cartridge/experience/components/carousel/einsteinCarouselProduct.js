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
    const product = content.product;
    const wrapperClasses = ['einstein-carousel-product'];

    if (!content.isFullWidth) {
        wrapperClasses.push('container');
    }

    let type;
    if (product.variationGroup || product.bundle || product.productSet) {
        if (product.productSet) {
            type = 'set';
        } else if (product.bundle) {
            type = 'bundle';
        } else if (product.variationGroup) {
            type = 'vgroup';
        }

        model.alternativeGroupId = product.ID;
    }

    const anchor = [{
        id: product.variant || product.variationGroup ? product.variationModel.master.ID : product.ID,
        sku: product.variant || product.variationGroup ? product.ID : '',
        type: type,
        alt_id: product.variationGroup || product.bundle || product.productSet ? product.ID : ''
    }];

    model.recommender = content.recommender.recommender;
    model.anchor = JSON.stringify(anchor);
    model.loadUrl = URLUtils.abs('Tile-RecommendationAjaxLoad');

    model.carouselConfig = PageRenderHelper.getCarouselConfig(content.breakpoints);
    model.wrapperClasses = wrapperClasses.join(' ');

    return new Template('experience/components/carousel/einsteinCarouselProduct').render(model).text;
};
