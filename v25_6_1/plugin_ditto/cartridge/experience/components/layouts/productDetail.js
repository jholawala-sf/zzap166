const ABTestMgr = require('dw/campaign/ABTestMgr');
const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
const Logger = require('dw/system/Logger');
const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
const productHelper = require('*/cartridge/scripts/helpers/productHelpers.js');
const overlayHelper = require('*/cartridge/scripts/overlayHelper');
const CONSTANTS = require('*/cartridge/scripts/config/dittoConstants');

const getCommercePaymentsConfiguration = () => {
    try {
        const configurationHelper = require('*/cartridge/scripts/configurationHelper');
        if (configurationHelper) {
            return configurationHelper.getConfiguration();
        }
    } catch (e) {
        Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
    }
    return null;
};

/**
 * Render logic for the storefront.popularCategories.
 * @param {dw.experience.ComponentScriptContext} context The Component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { component, content: { product } } = context;

    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    const params = { pid: product.ID };
    const productHelperResult = productHelper.showProductPage(params, request.pageMetaData);
    const productType = productHelperResult.product.productType;

    let template;
    if (!productHelperResult.product.online && productType !== 'set' && productType !== 'bundle') {
        template = new Template('error/notFound');
        template.setStatusCode(404);
        return template.render().text;
    }
    template = new Template(productHelperResult.template + 'NoDecorator');

    const layoutMap = {
        'Base PDP - Layout 1': 1,
        'Layout 2': 2,
        'Layout 3': 3,
        'Layout 4': 4
    };
    model.pdpLayoutTemplate = layoutMap[context.content.templateLayout] || 1;

    model.product = productHelperResult.product;
    model.addToCartUrl = productHelperResult.addToCartUrl;
    model.resources = productHelperResult.resources;
    model.breadcrumbs = productHelperResult.breadcrumbs;
    model.canonicalUrl = productHelperResult.canonicalUrl;
    model.schemaData = productHelperResult.schemaData;
    model.enabledPlugins = overlayHelper.enabledPlugins();
    model.pickUpInStore = {
        actionUrl: URLUtils.url('Stores-InventorySearch', 'showMap', false, 'horizontalView', true, 'isForm', true).toString(),
        atsActionUrl: URLUtils.url('Stores-getAtsValue').toString()
    };
    model.isPD = true;
    model.isPdpTestSegment = ABTestMgr.isParticipant(CONSTANTS.AB_TESTS.PDP_ATC.TEST_ID, CONSTANTS.AB_TESTS.PDP_ATC.SEGMENTS.TEST_SEGMENT);

    const commercePaymentsConfiguration = getCommercePaymentsConfiguration();
    if (commercePaymentsConfiguration) {
        model.commercePaymentsConfiguration = commercePaymentsConfiguration;
    }

    model.hideRatings = context.content.hideRatings;
    model.hideSocials = context.content.hideSocials;
    model.hideDesc = context.content.hideDesc;
    model.hideRecs = context.content.hideRecs;

    return template.render(model).text;
};
