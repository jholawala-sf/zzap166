const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');

/**
 * Render logic for the product tile.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const content = context.content;

    const product = content.product;

    if (product) {
        var images = product.getImages('large');
        var productImage = images.iterator().next();
        if (productImage) {
            model.image = {
                src: productImage.getAbsURL(),
                alt: productImage.getAlt()
            };
        }
    }

    model.product = product;
    model.swatches = content.swatches;
    model.ratings = content.ratings;
    model.quickView = content.quickView;

    return new Template('experience/components/assets/video').render(model).text;
};
