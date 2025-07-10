var ProductMgr = require('dw/catalog/ProductMgr');
var Logger = require('dw/system/Logger');
var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');

var log = Logger.getLogger('storefront-catalog-export', 'catalog');

var allSiteProduct;
var fileWriter;
var csvWriter;

var COLUMNS = [
    'ID',
    'ItemGroupID',
    'Name',
    'Category',
    'Size',
    'Color',
    'Link',
    'ImageUrl',
    'AlternateImageUrls',
    'ColorSwatchUrl',
    'ShortDescription',
    'LongDescription',
    'Specifications',
    'Availability',
    'ListPrice',
    'SalePrice',
    'Gender',
    'Subcategory1',
    'Subcategory2',
    'Subcategory3'
];

var lastProduct

exports.beforeStep = function () {
    var fileName = `catalog-${dw.system.Site.current.ID}.csv`;
    var directory = new File(File.IMPEX + File.SEPARATOR + 'catalog');
    directory.mkdirs();
    var file = new File(directory, fileName);
    fileWriter = new FileWriter(file);
    csvWriter = new CSVStreamWriter(fileWriter);
    allSiteProduct = ProductMgr.queryAllSiteProducts();

    csvWriter.writeNext(COLUMNS);

    if (allSiteProduct.count > 0) {
        log.debug('Processing {0} products', allSiteProduct.count);
    }
};

exports.getTotalCount = function () {
    return allSiteProduct.count;
};

exports.beforeChunk = function () {
};

exports.read = function () {
    if (allSiteProduct.hasNext()) {
        lastProduct = allSiteProduct.next();
        return lastProduct;
    }
};

/**
 *
 * @param {dw.catalog.Product} product
 * @return {string}
 */
exports.process = function (product) {
    var isSimpleProduct = !product.master && !product.variant && !product.variationGroup
    if (product.variant || isSimpleProduct && (!product.bundle && !product.productSet)) {
        var pvm = product.variationModel;
        var color = ''
        var size = ''
        if (pvm) {
            var colorAttr = pvm.getProductVariationAttribute('color');
            var sizeAttr = pvm.getProductVariationAttribute('size');
            var countAttr = pvm.getProductVariationAttribute('count');
            if (colorAttr) {
                color = pvm.getVariationValue(product, colorAttr).displayValue;
            }
            if (countAttr) {
                size = pvm.getVariationValue(product, countAttr).displayValue;
            }
            if (sizeAttr) {
                size = pvm.getVariationValue(product, sizeAttr).displayValue;
            }
        }
        var link = dw.web.URLUtils.https('Product-Show', 'pid', product.ID).toString();

        var images = product.getImages('large')
        var imageUrl = '';
        var alternateImageUrls = '';
        if (images) {
            imageUrl = images[0].getAbsURL().toString();

            if (images.length > 1) {
                alternateImageUrls = images.slice(1).toArray().map(function (image) {
                    return image.getAbsURL().toString();
                }).join(',');
            }
        }
        var swatchImageUrl = '';
        var swatchImage = product.getImage('swatch', 0)
        if (swatchImage) {
            swatchImageUrl = swatchImage.getAbsURL().toString();
        }

        var shortDescription = product.shortDescription ? product.shortDescription.markup : '';
        var longDescription = product.longDescription ? product.longDescription.markup : '';
        var specifications = product.custom.specifications ? product.custom.specifications.markup : '';

        if (longDescription) {
            longDescription = longDescription.replace(/(\r\n|\n|\r)/gm, ' ');
        }
        if (shortDescription) {
            shortDescription = shortDescription.replace(/(\r\n|\n|\r)/gm, ' ');
        }
        if (specifications) {
            specifications = specifications.replace(/(\r\n|\n|\r)/gm, ' ');
        }

        var primaryCategory = product.primaryCategory;
        var categoryPath = [];
        if (!primaryCategory && product.masterProduct) {
            primaryCategory = product.masterProduct.primaryCategory;
        }
        if (primaryCategory) {
            categoryPath.unshift(primaryCategory.displayName);
            while (primaryCategory.parent && primaryCategory.parent.ID !== 'root') {
                primaryCategory = primaryCategory.parent;
                categoryPath.unshift(primaryCategory.displayName);
            }
        }

        var category = categoryPath.join(' / ');
        var availability = '10000'

        var salePrice = product.priceModel.price;
        var listPrice = salePrice
        if (product.priceModel.priceInfo && product.priceModel.priceInfo.priceBook.parentPriceBook) {
            listPrice = product.priceModel.getPriceBookPrice(product.priceModel.priceInfo.priceBook.parentPriceBook.ID)
        }

        var gender = product.custom.gender ? product.custom.gender.value : '';
        var subcategory1 = product.custom.dcCategory1
        var subcategory2 = product.custom.dcCategory2
        var subcategory3 = product.custom.dcCategory3

        return [
            product.ID,
            product.variant ? product.masterProduct.ID : product.ID,
            product.name,
            category,
            size,
            color,
            link,
            imageUrl,
            alternateImageUrls,
            swatchImageUrl,
            shortDescription,
            longDescription,
            specifications,
            availability,
            listPrice.value,
            salePrice.value,
            gender,
            subcategory1,
            subcategory2,
            subcategory3
        ]
    }
};

exports.write = function (chunk) {
    for (var i = 0; i < chunk.length; i++) {
        csvWriter.writeNext(chunk[i].toArray());
    }
};

exports.afterChunk = function () {
    fileWriter.flush();
};

exports.afterStep = function () {
    fileWriter.close();
    allSiteProduct.close();
};
