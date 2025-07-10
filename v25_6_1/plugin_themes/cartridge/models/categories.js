'use strict';

var collections = require('*/cartridge/scripts/util/collections');
var URLUtils = require('dw/web/URLUtils');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var CacheMgr = require('dw/system/CacheMgr');
var CachePartition = CacheMgr.getCache('categoryRefinements');
var rootSearchRefinements = null;
/**
 * Get category url
 * @param {dw.catalog.Category} category - Current category
 * @returns {string} - Url of the category
 */
function getCategoryUrl(category) {
    return category.custom && 'alternativeUrl' in category.custom && category.custom.alternativeUrl
        ? (category.custom.alternativeUrl.toString()).replace(/&amp;/g, '&')
        : URLUtils.url('Search-Show', 'cgid', category.getID()).toString();
}

/**
 *  inititializes the search to check which categories have products with or without stock
 *  @param {String} productFilter the category filter criteria
 *   @returns {dw.util.Collection} - List of Search Refinement definitions
 */
function getCatalogSearchRefinements(productFilter) {
    var rootSearch;
    if (!rootSearchRefinements) {
        rootSearch = new ProductSearchModel();
        rootSearch.setCategoryID('root');
        rootSearch.setOrderableProductsOnly(productFilter === 'PRODUCTS_OUT_OF_STOCK');
        rootSearch.search();
        rootSearchRefinements = rootSearch.getRefinements();
    }
    return rootSearchRefinements;
}

/**
 * decides wether a category should be added to the menu based on filter
 * @param {dw.catalog.Category} category - the category to check
 * @param {Object} filters the filter rules 
 * @returns {Boolean} true if category should be added to menu
 */
function shouldIncludeCategory(category, filters) {
    var shouldInclude = true;
    if (filters.showInMenu) {
        if (category.custom && !category.custom.showInMenu) {
            shouldInclude = false;
        }
    }

    if (shouldInclude && filters.productFilter !== 'NEVER') {
        var nextLevel = CachePartition.get(category.getParent().ID+ '-' + filters.productFilter, function refinmentCacheLoader() {
            var refinements = getCatalogSearchRefinements(filters.productFilter);
            var nextLevelCollection = refinements.getNextLevelCategoryRefinementValues(category.getParent());
            return nextLevelCollection.toArray().map(function (refinementValue) {return refinementValue.value});
        });
        let isAvailable = false;
        nextLevel.forEach(function (refinementValue) {
            if (category.ID === refinementValue) {
                isAvailable = true;
            }
        });
        shouldInclude = isAvailable;
    }

    return shouldInclude;
}


/**
 * Converts a given category from dw.catalog.Category to plain object
 * @param {dw.catalog.Category} category - A single category
 * @param {Object} skipShowInMenuFilter - wether we want to filteer by show in menu here
 * @param {Number} levelsToGo - the levels still to traverse
 * 
 * @returns {Object} plain object that represents a category
 */
function categoryToObject(category, filters, levelsToGo) {
    var result = {
        name: category.getDisplayName(),
        url: getCategoryUrl(category),
        id: category.ID
    };
    
    levelsToGo -= 1;
    if (levelsToGo > 0) {
        var subCategories = category.hasOnlineSubCategories() ?
        category.getOnlineSubCategories() : null;
        
        if (subCategories) {
            collections.forEach(subCategories, function (subcategory) {
                var converted = null;
                if (shouldIncludeCategory(category, filters)) {
                    converted = categoryToObject(subcategory, filters, levelsToGo);
                }
                if (converted) {
                    if (!result.subCategories) {
                        result.subCategories = [];
                    }
                    result.subCategories.push(converted);
                }
            });
            if (result.subCategories) {
                result.complexSubCategories = result.subCategories.some(function (item) {
                    return !!item.subCategories;
                });
            }
        }
    } 

    return result;
}


/**
 * Represents a single category with all of it's children
 * @param {dw.util.ArrayList<dw.catalog.Category>} items - Top level categories
 * @constructor
 */
function categories(items, filters, levels) {
    this.categories = [];
    var sfraDefaultFilter = {
        showInMenu : true,
        productFilter : 'NO_PRODUCTS',
    }
    var myFilters = filters || sfraDefaultFilter;
    var levelsToGo = levels || 10;
    collections.forEach(items, function (item) {
        
        if (shouldIncludeCategory(item, myFilters)) {
            this.categories.push(categoryToObject(item, myFilters, levelsToGo));
        }
    }, this);
}

module.exports = categories;
