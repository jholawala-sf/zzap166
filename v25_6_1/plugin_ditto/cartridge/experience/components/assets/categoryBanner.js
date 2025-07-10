const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');

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

    if (content.heading) {
        model.heading = content.heading;
    }

    model.headingStyles = '';
    if (content.headingColor) {
        model.headingStyles = 'color: ' + content.headingColor.color;
    }

    if (content.subheading) {
        model.subheading = content.subheading;
    }

    model.subheadingStyles = '';
    if (content.subheadingColor) {
        model.subheadingStyles = 'color: ' + content.subheadingColor.color;
    }

    if (content.buttonType) {
        switch (content.buttonType) {
            case 'Primary':
                model.buttonType = 'btn btn-primary';
                break;
            case 'Primary - Outline':
                model.buttonType = 'btn btn-outline-primary';
                break;
            case 'Secondary':
                model.buttonType = 'btn btn-secondary';
                break;
            case 'Secondary - Outline':
                model.buttonType = 'btn btn-outline-secondary';
                break;
            default:
                model.buttonType = 'btn';
        }
    }

    if (content.buttonText) {
        model.buttonText = content.buttonText;
    }
    if (content.buttonLink) {
        model.buttonLink = content.buttonLink;
    }

    if (content.overlayPosition) {
        model.overlayPosition = PageRenderHelper.getLayoutPosition(content.overlayPosition);
    }

    if (content.overlayAlignment) {
        model.overlayAlignment = PageRenderHelper.getAlignment(content.overlayAlignment);
    }

    return new Template('experience/components/assets/categoryBanner').render(model).text;
};
