var server = require("server");

var cache = require("*/cartridge/scripts/middleware/cache");

const page = module.superModule;
server.extend(page);

function getContext(pid) {
    var URLUtils = require("dw/web/URLUtils");
    var ProductFactory = require("*/cartridge/scripts/factories/product");

    var productTileParams = { pview: "tile", pid: pid };
    var product;
    var productUrl;
    var quickViewUrl;
    var addToCartUrl;

    function createErrorProduct() {
        product = { id: pid, error: true };
        productUrl = URLUtils.url("Home-Show").toString();
        quickViewUrl = URLUtils.url("Home-Show").toString();
        addToCartUrl = URLUtils.url("Home-Show").toString();
    }

    // TODO: remove this logic once the Product factory is
    // able to handle the different product types
    try {
        product = ProductFactory.get(productTileParams);
        if (product.id) {
            product.error = false;
            productUrl = URLUtils.url("Product-Show", "pid", product.id)
                .relative()
                .toString();
            quickViewUrl = URLUtils.url("Product-ShowQuickView", "pid", product.id)
                .relative()
                .toString();
            addToCartUrl = URLUtils.url("Concierge-Cart", "basket", product.id)
                .relative()
                .toString();
        } else {
            createErrorProduct();
        }
    } catch (e) {
        createErrorProduct();
    }

    var context = {
        product: product,
        urls: {
            product: productUrl,
            quickView: quickViewUrl,
            addToCart: addToCartUrl
        }
    };

    return context;
}
/**
 * Tile-Show : Allow for a JSON rendering of the tile
 */
server.append(
    "Show",
    cache.applyPromotionSensitiveCache,
    function (req, res, next) {
        if (req.querystring.asJSON) {
            res.json(getContext(req.querystring.pid));
        }

        next();
    },
);

/**
 * Load an array of product tiles (JSON only)
 */
server.get(
    "Batch",
    cache.applyPromotionSensitiveCache,
    function (req, res, next) {
        var pids = req.querystring.pids.split(",");

        var products = [];
        for (var i = 0; i < pids.length; i++) {
            products.push(getContext(pids[i]));
        }
        res.json({
            products: products,
        });
        next();
    },
);

module.exports = server.exports();
