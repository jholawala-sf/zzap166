const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the layouts.dynamic_row.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

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

    model.showDesignElement = content.showDesignElement;
    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/assets/sectionHeader').render(model).text;
};
