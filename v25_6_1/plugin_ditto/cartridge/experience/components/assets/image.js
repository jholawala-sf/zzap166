const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the banner
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

    if (content.link) {
        model.link = content.link;
    }

    if (content.content) {
        model.content = content.content.content;
    }

    if (content.overlayPosition) {
        switch (content.overlayPosition) {
            case 'Top Left':
                model.overlayPosition = 'justify-content-start align-items-start';
                break;
            case 'Top Center':
                model.overlayPosition = 'justify-content-center align-items-start';
                break;
            case 'Top Right':
                model.overlayPosition = 'justify-content-end align-items-start';
                break;
            case 'Middle Left':
                model.overlayPosition = 'justify-content-start align-items-center';
                break;
            case 'Middle Center':
                model.overlayPosition = 'justify-content-center align-items-center';
                break;
            case 'Middle Right':
                model.overlayPosition = 'justify-content-end align-items-center';
                break;
            case 'Bottom Left':
                model.overlayPosition = 'justify-content-start align-items-end';
                break;
            case 'Bottom Center':
                model.overlayPosition = 'justify-content-centerstart align-items-end';
                break;
            case 'Bottom Right':
                model.overlayPosition = 'justify-content-end align-items-end';
                break;
            default:
                model.overlayPosition = '';
        }
    }

    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/assets/image').render(model).text;
};
