const server = require('server');

const page = module.superModule;
server.extend(page);

server.get('RecommendationAjaxLoad', function (req) {
    const URLUtils = require('dw/web/URLUtils');
    const ProductFactory = require('*/cartridge/scripts/factories/product');
    const renderTemplateHelper = require('*/cartridge/scripts/renderTemplateHelper');

    const recommendations = JSON.parse(req.querystring.recommendations);

    let content = '';
    recommendations.forEach(function (recommendation) {
        const productTileParams = { pview: 'tile' };
        Object.keys(recommendation).forEach(function (key) {
            productTileParams[key] = recommendation[key];
        });

        let product;
        let productUrl;
        let quickViewUrl;

        try {
            product = ProductFactory.get(productTileParams);
            productUrl = URLUtils.url('Product-Show', 'pid', product.id).relative().toString();
            quickViewUrl = URLUtils.url('Product-ShowQuickView', 'pid', product.id)
                .relative().toString();
        } catch (e) {
            product = false;
            productUrl = URLUtils.url('Home-Show');
            quickViewUrl = URLUtils.url('Home-Show');
        }

        var context = {
            product: product,
            urls: {
                product: productUrl,
                quickView: quickViewUrl
            },
            display: {}
        };

        Object.keys(recommendation).forEach(function (key) {
            if (recommendation[key] === true) {
                context.display[key] = true;
            } else if (recommendation[key] === false) {
                context.display[key] = false;
            }
        });

        content += renderTemplateHelper.getRenderedHtml(context, 'experience/components/carousel/einsteinProductTile');
    });

    response.writer.print(content);
});

module.exports = server.exports();
