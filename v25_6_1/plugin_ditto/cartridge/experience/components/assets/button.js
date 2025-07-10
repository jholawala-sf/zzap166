const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for the button component.
 * @param {dw.experience.PageScriptContext} context The page context
 * @return {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;

    if (content.btnText) {
        model.btnText = content.btnText;
    }
    if (content.btnLink) {
        model.btnLink = content.btnLink;
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

    if(content.iconCode) {
        model.iconCode = content.iconCode;
    }

    if (content.btnAlign) {
        switch (content.btnAlign) {
            case 'Left':
                model.btnAlign = 'text-left';
                break;
            case 'Center':
                model.btnAlign = 'text-center';
                break;
            case 'Right':
                model.btnAlign = 'text-right';
                break;
            default:
                model.btnAlign = '';
        }
    }

    model.componentClasses = PageRenderHelper.getComponentClasses(content);
    model.componentStyles = PageRenderHelper.getComponentStyles(content);

    return new Template('experience/components/assets/button').render(model).text;
};
