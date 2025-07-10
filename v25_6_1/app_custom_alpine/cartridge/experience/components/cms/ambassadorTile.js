const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
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
        model.title = ambassador.title;
        model.activity = ambassador.activity;

        if (ambassador.tileImage) {
            model.image = {
                src: {
                    mobile: ImageTransformation.url(ambassador.tileImage, { device: 'mobile' }),
                    desktop: ImageTransformation.url(ambassador.tileImage, { device: 'desktop' })
                },
                alt: ambassador.title,
                focalPointX: '50%',
                focalPointY: '50%'
            };
        }
    }

    model.link = URLUtils.url('Page-Show', 'cid', content.page.ID);


    return new Template('experience/components/cms/ambassadorTile').render(model).text;
};
