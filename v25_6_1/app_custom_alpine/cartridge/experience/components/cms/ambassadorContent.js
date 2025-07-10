const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation');

/**
 * Render logic for the cms.ambassadorTile.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;
    const ambassador = content.cmsItem.attributes;

    if (content.cmsItem) {
        model.name = ambassador.title;
        model.activity = ambassador.activity;
        model.hometown = ambassador.hometown;
        model.resides = ambassador.resides;
        model.about = ambassador.about;
        model.career = ambassador.career;

        if (ambassador.primaryImage) {
            model.image = {
                src: {
                    mobile: ImageTransformation.url(ambassador.primaryImage, { device: 'mobile' }),
                    desktop: ImageTransformation.url(ambassador.primaryImage, { device: 'desktop' })
                },
                alt: ambassador.title,
                focalPointX: '50%',
                focalPointY: '50%'
            };
        }
    }

    return new Template('experience/components/cms/ambassadorContent').render(model).text;
};
