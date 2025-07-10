const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');
const ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');

/**
 * Render logic for the product tile.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

    if (content.image) {
        const { focalPointX, focalPointY } = ImageTransformation.getScaledImage(content.image);

        model.image = {
            src: {
                mobile: ImageTransformation.url(content.image.file, { device: 'mobile' }),
                desktop: ImageTransformation.url(content.image.file, { device: 'desktop' })
            },
            alt: content.image.file.getAlt(),
            focalPointX: focalPointX,
            focalPointY: focalPointY
        };
    }

    model.category = content.category;
    if (content.titleOverride) {
        model.title = content.titleOverride.content;
    } else {
        model.title = model.category.displayName || '';
    }

    model.link = URLUtils.url('Search-Show', 'cgid', content.category.ID);
    model.linkText = content.linkText;

    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/assets/categoryTile').render(model).text;
};
