var URLUtils = require('dw/web/URLUtils');

/**
 * Recursive function which traverses the tree
 *
 * @param {dw.catalog.Category|dw.content.Folder} rootElement the object (category or folder) to recurse into
 * @param {string} type the object type used to traverse
 * @returns {Object} the mapping object
 */
function traverseTree(rootElement, type) {
    let urlAction;
    let urlParam;
    let subElements;

    if (type === 'folder') {
        urlAction = 'SearchContent-Show';
        urlParam = 'fdid';
        subElements = rootElement.getOnlineSubFolders().toArray();
    } else if (type === 'category') {
        urlAction = 'Search-Show';
        urlParam = 'cgid';
        subElements = rootElement.getOnlineSubCategories().toArray();
    } else {
        throw new Error('Requested unsupported element type');
    }

    // create the api response for each object
    return subElements.map((element) => ({
        id: element.ID,
        url: URLUtils.url(urlAction, urlParam, element.ID).toString(),
        type: type
    // adding flattened url of childcategories and their recursive gathered results
    })).concat(subElements.reduce((previous, current) => previous.concat(traverseTree(current, type)), []));
}

/**
 * Traverses online folder & category tree and exposes their search-friendly URLs. The result
 * can i.e. be used in a React frontend.
 *
 * @param {string} typesString comma separated types to use
 * @returns {Object} the API response
 */
exports.api = function (typesString) {
    try {
        var result = [];
        var types = JSON.parse(JSON.stringify(typesString || ['category']))[0];
        if (types.indexOf('category') > -1) {
            var CatalogMgr = require('dw/catalog/CatalogMgr');
            var rootCategory = CatalogMgr.getCategory('root');
            result = traverseTree(rootCategory, 'category');
        }
        if (types.indexOf('folder') > -1) {
            var ContentMgr = require('dw/content/ContentMgr');
            var rootFolder = ContentMgr.getFolder('root');
            result = result.concat(traverseTree(rootFolder, 'folder'));
        }
        return result;
    } catch (e) {
        return {
            error: 'An error occurred while serialising the category mapping.',
            message: e.message
        };
    }
};
exports.get = function (httpParams) {
    return exports.api(httpParams.types);
};
