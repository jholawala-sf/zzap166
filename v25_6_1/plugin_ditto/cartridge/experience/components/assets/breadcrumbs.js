const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
const URLUtils = require('dw/web/URLUtils');
const Resource = require('dw/web/Resource');

/**
 * Helper for building breadcrumbs for category searches
 * @param {array} breadcrumbs The breadcrumbs array
 * @param {*} category The category being traversed
 */
function buildCategoryBreadcrumbs(breadcrumbs, category) {
    if (category.root) return;

    if (category.parent) {
        buildCategoryBreadcrumbs(breadcrumbs, category.parent);
    }

    breadcrumbs.push({
        htmlValue: category.displayName,
        url: URLUtils.url('Search-Show', 'cgid', category.ID).toString()
    });
}

/**
 * Render logic for dynamicBanner component.
 * @param {dw.experience.ComponentScriptContext} context The component script context object.
 * @returns {string} The template to be displayed
 */
module.exports.render = function (context) {
    const { content: { product, category } } = context;
    const model = new HashMap();
    let breadcrumbs = [];
    const productHelper = require('*/cartridge/scripts/helpers/productHelpers');

    if (product) {
        breadcrumbs = productHelper.getAllBreadcrumbs(null, product.ID, []).reverse();
    } else if (category) {
        breadcrumbs = [
            {
                htmlValue: Resource.msg('global.home', 'common', null),
                url: URLUtils.home().toString()
            }
        ];
        buildCategoryBreadcrumbs(breadcrumbs, category);
    }
    model.breadcrumbs = breadcrumbs;

    return new Template('experience/components/assets/breadcrumbs').render(model).text;
};
