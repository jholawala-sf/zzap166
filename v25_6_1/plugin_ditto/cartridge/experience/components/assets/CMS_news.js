const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the banner
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

    if (content.cmsItem.bannerImage) {
        model.image = {
            src: {
                mobile: content.cmsItem.bannerImage.url,
                desktop: content.cmsItem.bannerImage.url
            },
            alt: "alt text here"
        };
    }

    var body = content.cmsItem.body;
    var excerpt = content.cmsItem.excerpt;
    var title = content.cmsItem.title;

    model.title = title;
    model.excerpt = excerpt;
    model.body = body;
    model.bodyPartial = body.substring(0, 80);

    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/assets/CMS_News').render(model).text;
};
