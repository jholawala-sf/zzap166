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
    const { component, content } = context;

    model.containerClasses = PageRenderHelper.getContainerClasses(content);

    model.rowClasses = PageRenderHelper.getComponentClasses(content);
    model.rowStyles = PageRenderHelper.getComponentStyles(content);

    model.column1Width = PageRenderHelper.getColumnClasses(content.column1Width);
    
    if(content.uniqueId) {
        model.uniqueId = content.uniqueId;
    }

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    return new Template('experience/components/layouts/1_column').render(model).text;
};
