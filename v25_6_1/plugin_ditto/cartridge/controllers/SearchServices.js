'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
const userLoggedIn = require('*/cartridge/scripts/middleware/userLoggedIn');

const page = module.superModule;
server.extend(page);

server.replace('GetSuggestions',
    userLoggedIn.validateGatedCommerce,
    cache.applyDefaultCache,
    function (req, res, next) {
        var SuggestModel = require('dw/suggest/SuggestModel');
        var CategorySuggestions = require('*/cartridge/models/search/suggestions/category');
        var ContentSuggestions = require('*/cartridge/models/search/suggestions/content');
        var ProductSuggestions = require('*/cartridge/models/search/suggestions/product');
        var SearchPhraseSuggestions = require('*/cartridge/models/search/suggestions/searchPhrase');
        var array = require('*/cartridge/scripts/util/array');
        var categorySuggestions;
        var contentSuggestions;
        var productSuggestions;
        var recentSuggestions;
        var popularSuggestions;
        var brandSuggestions;
        var searchTerms = req.querystring.q;
        var suggestions;
        var minChars = 3;
        // Unfortunately, by default, max suggestions is set to 10 and is not configurable in Business
        // Manager.
        var maxSuggestions = 3;
        var maxProductSuggestions = 6;
        var showDidYouMeanLabel = false;

        if (searchTerms && searchTerms.length >= minChars) {
            suggestions = new SuggestModel();
            suggestions.setFilteredByFolder(false);
            suggestions.setSearchPhrase(searchTerms);
            suggestions.setMaxSuggestions(maxSuggestions);
            categorySuggestions = new CategorySuggestions(suggestions, maxSuggestions);
            contentSuggestions = new ContentSuggestions(suggestions, maxSuggestions);
            productSuggestions = new ProductSuggestions(suggestions, maxProductSuggestions);
            recentSuggestions = new SearchPhraseSuggestions(suggestions.recentSearchPhrases, maxSuggestions);
            popularSuggestions = new SearchPhraseSuggestions(suggestions.popularSearchPhrases, maxSuggestions);
            brandSuggestions = new SearchPhraseSuggestions(suggestions.brandSuggestions, maxSuggestions);

            if (productSuggestions.available && productSuggestions.phrases.length) {
                var containsExactMatch = !!array.find(productSuggestions.phrases, function (suggestion) {
                    return suggestion.exactMatch;
                });

                if ((containsExactMatch && productSuggestions.phrases.length > 1)
                    || (!containsExactMatch && productSuggestions.phrases.length)) {
                    showDidYouMeanLabel = true;
                }
            }

            if (
                productSuggestions.available
                || contentSuggestions.available
                || categorySuggestions.available
                || recentSuggestions.available
                || popularSuggestions.available
                || brandSuggestions.available
            ) {
                res.render('search/suggestions', {
                    searchTerms: searchTerms,
                    suggestions: {
                        product: productSuggestions,
                        category: categorySuggestions,
                        content: contentSuggestions,
                        recent: recentSuggestions,
                        popular: popularSuggestions,
                        brand: brandSuggestions
                    },
                    showDidYouMeanLabel: showDidYouMeanLabel
                });
            } else {
                res.json({});
            }
        } else {
        // Return an empty object that can be checked on the client.  By default, rendered
        // templates automatically get a diagnostic string injected into it, making it difficult
        // to check for a null or empty response on the client.
            res.json({});
        }

        next();
    });

module.exports = server.exports();
