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

    if (content.titleOverride) {
        model.title = content.titleOverride.content;
    } else {
        model.title = content.page.name || '';
    }

    if (content.descriptionOverride) {
        model.description = content.descriptionOverride.content;
    } else {
        model.description = content.page.description || '';
    }


    model.overlayPosition = PageRenderHelper.getLayoutPosition(content.overlayPosition);

    model.overlayStyles = '';

    if (content.overlayColor) {
        if (content.overlayOpacity) {
            const rgb = PageRenderHelper.hexToRgb(content.overlayColor.color);
            model.overlayStyles = 'background-color: rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ', 0.' + content.overlayOpacity.value + ');';
        } else {
            model.overlayStyles = 'background-color: ' + content.overlayColor.color + ';';
        }
    }

    model.link = URLUtils.url('Page-Show', 'cid', content.page.ID);
    model.linkText = content.linkText;

    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/assets/contentTile').render(model).text;
};
