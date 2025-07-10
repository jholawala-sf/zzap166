'use strict';

/* globals InternalError */
const File = require('dw/io/File');
const Logger = require('dw/system/Logger');
const utils = require('*/cartridge/scripts/qlabs/utils');
const xmlUtils = require('*/cartridge/scripts/qlabs/xmlUtils');
const OcapiApi = require('*/cartridge/scripts/services/ocapi');
const PREFIX_ID = xmlUtils.PREFIX_ID;
const PREFIX_FILENAME = xmlUtils.PREFIX_FILENAME;
const MAX_STATUS_ATTEMPTS = 10;

const getCustomerGroups = () => {
    const CustomerMgr = require('dw/customer/CustomerMgr');
    return CustomerMgr.getCustomerGroups()
        .toArray()
        .map(function (cg) {
            return {
                id: cg.getID(),
                description: cg.getDescription(),
            };
        });
};

const getShippingMethods = () => {
    const ShippingMgr = require('dw/order/ShippingMgr');
    return ShippingMgr.getAllShippingMethods()
        .toArray()
        .map(function (sm) {
            return {
                id: sm.getID(),
                displayName: sm.getDisplayName(),
                description: sm.getDescription(),
            };
        });
};

const getSiteCatalogId = () => {
    const CatalogMgr = require('dw/catalog/CatalogMgr');
    const storefrontCatalog = CatalogMgr.getSiteCatalog();
    return storefrontCatalog ? storefrontCatalog.getID() : null;
};

const getSiteCategories = () => {
    const CatalogMgr = require('dw/catalog/CatalogMgr');
    const storefrontCatalog = CatalogMgr.getSiteCatalog();
    const category = storefrontCatalog ? storefrontCatalog.getRoot() : null;

    const result = {
        count: 0,
        categoryTree: []
    };
    if (!category) return result;

    const mapCategories = (cat) => {
        result.count++;
        return {
            categoryId: cat.ID,
            categoryName: cat.displayName,
            categories: cat.hasOnlineSubCategories() ? cat.getOnlineSubCategories().toArray().map(mapCategories) : []
        };
    };
    result.categoryTree = mapCategories(category);

    return result;
};

const getCustomerGroupQualifiers = () => {
    const SystemObjectMgr = require('dw/object/SystemObjectMgr');

    const profileAttributesToExclude = ['UUID', 'customerNo', 'fax', 'firstName', 'jobTitle', 'lastModified', 'lastName', 'phoneBusiness', 'phoneHome', 'phoneMobile', 'secondName', 'suffix', 'taxID', 'taxIDType'];
    const profileTypeDef = SystemObjectMgr.describe('Profile');
    const profileAttributes = profileTypeDef.getAttributeDefinitions().toArray()
        .map(function (type) {
            return {
                id: type.getID(),
                displayName: type.getDisplayName(),
                type: utils.getAttributeValueType(type.getValueTypeCode()),
                attributePath: `customer.profile${type.isSystem() ? '' : '.custom'}.${type.getID()}`
            };
        })
        .filter(function (attr) {
            return !profileAttributesToExclude.includes(attr.id);
        });

    const customerActiveDataAttributesToExclude = ['UUID'];
    const customerActiveDataTypeDef = SystemObjectMgr.describe('CustomerActiveData');
    const customerActiveDataAttributes = customerActiveDataTypeDef.getAttributeDefinitions().toArray()
        .map(function (type) {
            return {
                id: type.getID(),
                displayName: type.getDisplayName(),
                attributePath: `customer.activeData${type.isSystem() ? '' : '.custom'}.${type.getID()}`
            };
        })
        .filter(function (attr) {
            return !customerActiveDataAttributesToExclude.includes(attr.id);
        });

    // hard code some of the object attributes
    const addressAttributes = [
        { id: 'city', displayName: 'City', attributePath: 'customer.addressBook.preferredAddress.city' },
        { id: 'countryCode', displayName: 'Country', attributePath: 'customer.addressBook.preferredAddress.countryCode' },
        { id: 'postalCode', displayName: 'Postal Code', attributePath: 'customer.addressBook.preferredAddress.postalCode' },
        { id: 'stateCode', displayName: 'State', attributePath: 'customer.addressBook.preferredAddress.stateCode' }
    ];
    const requestAttributes = [
        { id: 'locale', displayName: 'Locale', attributePath: 'request.locale' }
    ];
    const geolocationAttributes = [
        { id: 'city', displayName: 'City', attributePath: 'request.geolocation.city' },
        { id: 'countryCode', displayName: 'Country Code', attributePath: 'request.geolocation.countryCode' },
        { id: 'latitude', displayName: 'Latitude', attributePath: 'request.geolocation.latitude' },
        { id: 'longitude', displayName: 'Longitude', attributePath: 'request.geolocation.longitude' },
        { id: 'metroCode', displayName: 'Metro Code', attributePath: 'request.geolocation.metroCode' },
        { id: 'postalCode', displayName: 'Postal Code', attributePath: 'request.geolocation.postalCode' },
        { id: 'regionCode', displayName: 'Region Code', attributePath: 'request.geolocation.regionCode' }
    ];
    const segmentAttributes = [
        { id: 'segments', displayName: 'Segments', attributePath: 'customer.cdpData.segments' }
    ];
    const storefrontSessionAttributes = [
        { id: 'sourceCodeGroup', displayName: 'Active Source Code Group', attributePath: 'session.sourceCodeGroup' },
        { id: 'store', displayName: 'Active Store', attributePath: 'session.store' },
        { id: 'agentUserAuthenticated', displayName: 'Agent User Authenticated', attributePath: 'session.agentUserAuthenticated' },
        { id: 'authenticated', displayName: 'Authenticated', attributePath: 'session.authenticated' },
        { id: 'customerGroups', displayName: 'Customer Groups', attributePath: 'session.customerGroups' },
        { id: 'referrerHost', displayName: 'Referrer Host', attributePath: 'session.referrerHost' },
        { id: 'referrerKeywords', displayName: 'Referrer Keywords', attributePath: 'session.referrerKeywords' },
        { id: 'referrerURL', displayName: 'Referrer URL', attributePath: 'session.referrerURL' },
        { id: 'registered', displayName: 'Registered', attributePath: 'session.registered' },
        { id: 'currency', displayName: 'Session Currency', attributePath: 'session.currency' },
        { id: '{{attributeName}}', displayName: 'Session Custom Attribute', attributePath: 'session.custom.{{attributeName}}', instructions: 'Replace {{attributeName}} with the name of the custom attribute provided by the user' }
    ];
    return {
        profileAttributes,
        customerActiveDataAttributes,
        geolocationAttributes,
        addressAttributes,
        requestAttributes,
        segmentAttributes,
        storefrontSessionAttributes
    }
};

const getFilePath = (file) => {
    return file.getFullPath().replace('IMPEX/src/', '');
}

/**
 * get all necessary data needed to create promotions via Agentforce
 * @returns {Object} api response
 */
const getPromoData = () => {
    const Site = require('dw/system/Site');
    const result = {};
    var siteId;

    try {
        const currentSite = Site.getCurrent();
        siteId = currentSite ? currentSite.getID() : null;
        if (!currentSite || !siteId) {
            throw new InternalError('Current site could not be determined!');
        }

        result.siteId = siteId;
        result.storefrontCatalogId = getSiteCatalogId();
        result.shippingMethods = getShippingMethods();
        result.customerGroups = getCustomerGroups();
        result.siteCategories = getSiteCategories();
        result.customerGroupQualifiers = getCustomerGroupQualifiers();
    } catch (e) {
        Logger.error('Error in getPromoData: ' + e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        throw e;
    }
    return result;
}

/**
 * Gets the job execution status by calling OCAPI, with a maximum of 5 retry attempts
 * @param {string} accessToken - The access token
 * @param {string} jobId - The ID of the job
 * @param {string} executionId - The execution ID
 * @param {Function} callback - Callback function with (error, data)
 */
function getJobExecutionStatus(accessToken, jobId, executionId, callback) {
    for (var attempts = 0; attempts < MAX_STATUS_ATTEMPTS; attempts++) {
        var ocapiSvc = OcapiApi.getOCAPIService(accessToken);
        var ocapiResult = ocapiSvc.call({
            method: 'GET',
            path: `jobs/${jobId}/executions/${executionId}`
        });

        if (!ocapiResult.ok) {
            if (attempts >= MAX_STATUS_ATTEMPTS - 1) {
                return callback(new Error(`Failed to get job status after ${MAX_STATUS_ATTEMPTS} attempts`), null);
            }
            continue;
        }

        // see if we have a final status
        var executionStatus = ocapiResult.object.execution_status;
        if (executionStatus === 'aborted' || executionStatus === 'finished') {
            return callback(null, ocapiResult.object);
        }
    }

    callback(new Error(`Job status check exceeded maximum attempts (${MAX_STATUS_ATTEMPTS})`), null);
}

/**
 * Executes the import job for the provided site ID
 * @param {string} jobId - the job id
 * @param {string} fileName - the file name to import
 * @returns {object} result object
 */
const executeImportJob = (jobId, fileName) => {
    const importResult = {};
    try {
        var accessToken;
        const ocapiAuthSvc = OcapiApi.getOCAPIAuthService();
        ocapiAuthSvc.setThrowOnError();
        var authResult = ocapiAuthSvc.call();

        if (authResult.ok) {
            accessToken = authResult.object.access_token;
        }
        if (!accessToken) {
            throw new InternalError('Access token could not be retrieved!');
        }
        const ocapiSvc = OcapiApi.getOCAPIService(accessToken);
        var ocapiResult = ocapiSvc.call({
            method: 'POST',
            path: `jobs/${jobId}/executions`,
            request: {
                file_name: fileName,
                mode: 'merge'
            }
        });
        if (!ocapiResult.ok) {
            throw new InternalError('Error starting job execution!');
        }

        var jobExecutionId = ocapiResult.object.id;
        importResult.jobId = jobId;
        importResult.executionId = jobExecutionId;
        getJobExecutionStatus(accessToken, jobId, jobExecutionId, function(error, jobData) {
            if (error) {
                Logger.error('Job execution status check failed: ' + error.message);
                importResult.success = false;
                importResult.error = {
                    code: 'JOB_STATUS_ERROR',
                    message: error.message
                };
                return;
            }

            var jobStatus = jobData.status;
            var executionStatus = jobData.execution_status;
            importResult.importStatus = {
                status: jobStatus,
                executionStatus: executionStatus
            };

            if (executionStatus === 'aborted' || jobStatus === 'ERROR') {
                Logger.error('Job failed or was aborted: ' + jobData.log_file_path);
                importResult.success = false;
                importResult.error = {
                    code: 'JOB_FAILED',
                    message: `Job execution failed or was aborted, log file: ${jobData.log_file_path}`
                };
            } else if (executionStatus === 'finished') {
                importResult.success = true;
            }
        });
    } catch (e) {
        Logger.error('Error executing import job: ' + e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        importResult.success = false;
        importResult.error = {
            code: e.name || 'UNKNOWN',
            message: e.message || 'Error executing import job'
        };
        return importResult;
    }
    return importResult;
}

/**
 * Validates promotion data based on type
 * @param {Object} promotion - The promotion object
 * @returns {Object} Validation result {valid: boolean, message: string}
 */
function validatePromotion(promotion) {
    const { promotionType, shippingMethodIds, productIds, categoryIds, discountConditionType } = promotion;

    if (!promotionType) {
        return { valid: false, message: 'Promotion type (order, product, shipping) is required' };
    }

    if (promotionType !== 'order' && promotionType !== 'product' && promotionType !== 'shipping') {
        return { valid: false, message: `Invalid promotion type: ${promotionType}. Must be one of: order, product, shipping` };
    }

    if (promotionType === 'shipping') {
        if (!shippingMethodIds || !shippingMethodIds.length) {
            return { valid: false, message: 'At least one shippingMethodId is required for shipping promotions' };
        }
    } else if (promotionType === 'product' || promotionType === 'order') {
        const hasProductIds = productIds && productIds.length > 0;
        const hasCategoryIds = categoryIds && categoryIds.length > 0;

        if (!hasProductIds && !hasCategoryIds) {
            return { valid: false, message: `Product IDs or category IDs are required for ${promotionType} promotions` };
        }

        if (promotionType === 'order' && !discountConditionType) {
            return { valid: false, message: 'discountConditionType is required for order promotions. Please specify the amount or number of qualifying products.' };
        }
    }

    return { valid: true };
}

function validateConditions(conditions, missingAttributes, type) {
    if (!conditions || !conditions.length) {
        return { valid: false, message: 'At least one condition is required' };
    }

    for (var i = 0; i < conditions.length; i++) {
        var condition = conditions[i];
        if (!condition.attributePath) {
            missingAttributes.push(`${type} ${i} attributePath`);
        }
        if (!condition.operator) {
            missingAttributes.push(`${type} ${i} operator`);
        }
        if (!condition.conditionList || !condition.conditionList.length) {
            missingAttributes.push(`${type} ${i} conditionList`);
        }
        if (!condition.conditionListType) {
            missingAttributes.push(`${type} ${i} conditionListType`);
        }
    }

    return missingAttributes;
}

/**
 * Validates customer group data
 * @param {Object} customerGroup - The customer group object
 * @returns {Object} Validation result {valid: boolean, message: string}
 */
function validateCustomerGroup(customerGroup) {
    const { type, description, groupAssignments, includedConditions, excludedConditions } = customerGroup;

    const missingAttributes = [];

    if (!type) {
        missingAttributes.push('customer group type');
    }
    // static customer groups require groupAssignments
    if (type === 'static' && (!groupAssignments || !groupAssignments.length)) {
        missingAttributes.push('groupAssignments are required for static customer groups');
    }
    // dynamic customer groups require includedConditions
    if (type === 'dynamic' && (!includedConditions || !includedConditions.length)) {
        missingAttributes.push('at least one includedConditions is required for a dynamic customer group');
    }
    if (!description) {
        missingAttributes.push('customer group description');
    }
    if (includedConditions && includedConditions.length) {
        validateConditions(includedConditions, missingAttributes, 'includedConditions');
    }
    if (excludedConditions && excludedConditions.length) {
        validateConditions(excludedConditions, missingAttributes, 'excludedConditions');
    }
    if (missingAttributes.length) {
        return { valid: false, message: `Missing required attributes: ${missingAttributes.join(', ')}` };
    }

    return { valid: true };
}

/**
 * Recursively removes a directory and its contents
 * @param {dw.io.File} directory - the directory to delete
 */
const removeDirectoryRecursively = (directory) => {
    directory.listFiles().toArray().forEach(function (fileOrFolder) {
        if (fileOrFolder.isDirectory()) {
            removeDirectoryRecursively(fileOrFolder);
        } else {
            fileOrFolder.remove();
        }
    });
    directory.remove();
};

const createId = (prefixId, name, currentDateString) => {
    var id = `${prefixId}-${name.toLowerCase()
        .replace(/%/g, 'percent')
        .replace(/\$/g, 'dollars')
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')}`;
    if (currentDateString) {
        id = `${id}-${currentDateString}`;
    }
    return id;
};

/**
 * Writes the promotions to an XML file and triggers the import job
 @returns {object} result object
 */
const importPromotions = () => {
    const Calendar = require('dw/util/Calendar');
    const FileWriter = require('dw/io/FileWriter');
    const Pipelet = require('dw/system/Pipelet');
    const StringUtils = require('dw/util/StringUtils');
    const XMLIndentingStreamWriter = require('dw/io/XMLIndentingStreamWriter');

    const result = {};
    try {
        var requestBody = request.httpParameterMap.requestBodyAsString;
        if (!requestBody) {
            throw new InternalError('Request body is empty');
        }
        var parsedBody = JSON.parse(requestBody);

        const siteId = parsedBody.siteId;
        const storefrontCatalogId = parsedBody.storefrontCatalogId;
        const promotions = parsedBody.promotions;
        if (!siteId) {
            throw new InternalError('Current site could not be determined!');
        }

        if (!promotions || !promotions.length) {
            throw new InternalError('No promotions were provided!');
        }

        // validate promotions first
        const validationErrors = [];

        for (let i = 0; i < promotions.length; i++) {
            var promotion = promotions[i];
            var validationResult = validatePromotion(promotion);

            if (!validationResult.valid) {
                validationErrors.push(`Promotion ${promotion.name}: ${validationResult.message}`);
            }
        }

        if (validationErrors.length > 0) {
            result.error = {
                code: 'validation-error',
                message: 'Promotion validation failed',
                details: validationErrors.join('\n')
            };
            return result;
        }

        var currentDateString = StringUtils.formatCalendar(new Calendar(new Date()), 'yyyyMMdd_hhmmss');
        var fileName = `${PREFIX_FILENAME}_promo_${currentDateString}`;

        // create the directory
        var directory = new File([File.IMPEX, 'src', 'instance', fileName, 'sites', siteId].join(File.SEPARATOR));
        directory.mkdirs();

        // create base directory
        var compressedDirectoryPath = [File.IMPEX, 'src', 'instance', fileName].join(File.SEPARATOR);
        var compressedDirectory = new File(compressedDirectoryPath);

        var file = new File(directory, 'promotions.xml');
        var fw = new FileWriter(file, 'UTF-8', false);
        var filePath = getFilePath(file);
        var xsw = new XMLIndentingStreamWriter(fw);
        var promoLinkId;

        xsw.writeStartDocument('UTF-8', '1.0');
        xsw.writeStartElement('promotions'); //<promotions>
        xsw.writeDefaultNamespace('http://www.demandware.com/xml/impex/promotion/2008-01-31');

        var promotionData = [];

        for (let i = 0; i < promotions.length; i++) {
            var promotion = promotions[i];
            var promoId = createId(PREFIX_ID, promotion.name, currentDateString);

            // if we are only dealing with one promotion, save the promoId as the promoLinkId
            if (!promoLinkId && promotions.length === 1) {
                promoLinkId = promoId;
            }
            promotionData.push({
                id: promoId,
                promotion: promotion
            });
        }

        // write campaign xml
        for (let i = 0; i < promotionData.length; i++) {
            var promotionObject = promotionData[i];
            xmlUtils.writeCampaignXml(xsw, promotionObject.promotion, promotionObject.id);
        }

        // write promotion xml
        for (let i = 0; i < promotionData.length; i++) {
            var promotionObject = promotionData[i];
            var promotionType = promotionObject.promotion.promotionType;
            switch (promotionType) {
                case 'order':
                    xmlUtils.writeOrderPromotionXml(xsw, promotionObject.promotion, promotionObject.id, storefrontCatalogId);
                    break;
                case 'product':
                    xmlUtils.writeProductPromotionXml(xsw, promotionObject.promotion, promotionObject.id, storefrontCatalogId);
                    break;
                case 'shipping':
                    xmlUtils.writeShippingPromotionXml(xsw, promotionObject.promotion, promotionObject.id);
                    break;
            }
        }

        // write promotion-campaign assignments
        for (let i = 0; i < promotionData.length; i++) {
            var promotionObject = promotionData[i];
            xmlUtils.writePromotionCampaignAssignmentXml(xsw, promotionObject.id);
        }

        xsw.writeEndElement(); // </promotions>
        xsw.writeEndDocument();

        xsw.flush();
        xsw.close();
        fw.flush();
        fw.close();

        // validate the XML file
        var validateXmlResult = new Pipelet('ValidateXMLFile').execute({
            File: filePath,
            Schema: 'promotion.xsd'
        });
        if (validateXmlResult.Status.status !== 0) {
            result.error = {
                code: validateXmlResult.Status.code,
                message: `Impex ValidateXMLFile failed with message: ${validateXmlResult.Status.message}`,
                details: `log file: ${validateXmlResult.Status.details.LogFileName}`
            };
            return result;
        }

        result.writeResult = {
            success: true,
            message: `Successfully wrote and validated ${file.getFullPath()}`
        };

        // zip file
        var compressedFile = new File(compressedDirectoryPath + '.zip');
        compressedDirectory.zip(compressedFile);

        // remove the base directory and all its contents
        removeDirectoryRecursively(compressedDirectory);

        // call OCAPI to trigger the sfcc-site-archive-import job
        result.importResult = executeImportJob('sfcc-site-archive-import', compressedFile.name);

        // delete zip file
        if (result.importResult.success) {
            compressedFile.remove();
        }

        if (result.writeResult.success && result.importResult.success) {
            result.success = true;
            // return the promotion link if the import was successful, and we only have 1 promotion
            if (promoLinkId) {
                result.promoId = promoLinkId;
                result.promotionLink = `https://${dw.system.System.getInstanceHostname()}/on/demandware.store/Sites-Site/default/BMPromotion-Edit?PromotionID=${promoLinkId}`;
            }
        }
    } catch (e) {
        Logger.error('Error in importPromotions: ' + e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        throw e;
    }

    return result;
}

/**
 * Writes the customer groups to an XML file and triggers the import job
 @returns {object} result object
 */
const importCustomerGroups = () => {
    const Calendar = require('dw/util/Calendar');
    const FileWriter = require('dw/io/FileWriter');
    const Pipelet = require('dw/system/Pipelet');
    const StringUtils = require('dw/util/StringUtils');
    const XMLIndentingStreamWriter = require('dw/io/XMLIndentingStreamWriter');

    const result = {};
    try {
        var requestBody = request.httpParameterMap.requestBodyAsString;
        if (!requestBody) {
            throw new InternalError('Request body is empty');
        }
        var parsedBody = JSON.parse(requestBody);

        const siteId = parsedBody.siteId;
        const customerGroups = parsedBody.customerGroups;
        if (!siteId) {
            throw new InternalError('Current site could not be determined!');
        }

        if (!customerGroups || !customerGroups.length) {
            throw new InternalError('No customer groups were provided!');
        }

        // validate customer groups first
        const validationErrors = [];

        for (let i = 0; i < customerGroups.length; i++) {
            var customerGroup = customerGroups[i];
            var validationResult = validateCustomerGroup(customerGroup);

            if (!validationResult.valid) {
                validationErrors.push(`Customer Group ${customerGroup.description}: ${validationResult.message}`);
            }
        }

        if (validationErrors.length > 0) {
            result.error = {
                code: 'validation-error',
                message: 'Customer Group validation failed',
                details: validationErrors.join('\n')
            };
            return result;
        }

        var currentDateString = StringUtils.formatCalendar(new Calendar(new Date()), 'yyyyMMdd_hhmmss');
        var fileName = `${PREFIX_FILENAME}_customer_groups_${currentDateString}`;

        // create the directory
        var directory = new File([File.IMPEX, 'src', 'instance', fileName, 'sites', siteId].join(File.SEPARATOR));
        directory.mkdirs();

        // create base directory
        var compressedDirectoryPath = [File.IMPEX, 'src', 'instance', fileName].join(File.SEPARATOR);
        var compressedDirectory = new File(compressedDirectoryPath);

        var file = new File(directory, 'customer-groups.xml');
        var fw = new FileWriter(file, 'UTF-8', false);
        var filePath = getFilePath(file);
        var xsw = new XMLIndentingStreamWriter(fw);
        var customerGroupLinkId;

        xsw.writeStartDocument('UTF-8', '1.0');
        xsw.writeStartElement('customer-groups'); //<customer-groups>
        xsw.writeDefaultNamespace('http://www.demandware.com/xml/impex/customergroup/2007-06-30');

        var customerGroupData = [];

        for (let i = 0; i < customerGroups.length; i++) {
            var customerGroup = customerGroups[i];
            var customerGroupId = createId(PREFIX_ID, customerGroup.description, '');

            // if we are only dealing with one promotion, save the promoId as the promoLinkId
            if (!customerGroupLinkId && customerGroups.length === 1) {
                customerGroupLinkId = customerGroupId;
            }
            customerGroupData.push({
                id: customerGroupId,
                customerGroup: customerGroup
            });
        }

        // write customer-group xml
        for (let i = 0; i < customerGroupData.length; i++) {
            var customerGroupObject = customerGroupData[i];
            var customerGroupType = customerGroupObject.customerGroup.type;
            switch (customerGroupType) {
                case 'dynamic':
                    xmlUtils.writeDynamicCustomerGroupXml(xsw, customerGroupObject.customerGroup, customerGroupObject.id);
                    break;
                case 'static':
                    xmlUtils.writeStaticCustomerGroupXml(xsw, customerGroupObject.customerGroup, customerGroupObject.id);
                    break;
            }
        }

        // write group-assignments
        for (let i = 0; i < customerGroupData.length; i++) {
            var customerGroupObject = customerGroupData[i];
            if (customerGroupObject.customerGroup.type === 'static'
                && customerGroupObject.customerGroup.groupAssignments
                && customerGroupObject.customerGroup.groupAssignments.length) {
                xmlUtils.writeCustomerGroupAssignmentsXml(xsw, customerGroupObject.customerGroup, customerGroupObject.id);
            }
        }

        xsw.writeEndElement(); // </customer-groups>
        xsw.writeEndDocument();

        xsw.flush();
        xsw.close();
        fw.flush();
        fw.close();

        // validate the XML file
        var validateXmlResult = new Pipelet('ValidateXMLFile').execute({
            File: filePath,
            Schema: 'customergroup.xsd'
        });
        if (validateXmlResult.Status.status !== 0) {
            result.error = {
                code: validateXmlResult.Status.code,
                message: `Impex ValidateXMLFile failed with message: ${validateXmlResult.Status.message}`,
                details: `log file: ${validateXmlResult.Status.details.LogFileName}`
            };
            return result;
        }

        result.writeResult = {
            success: true,
            message: `Successfully wrote and validated ${file.getFullPath()}`
        };

        // zip file
        var compressedFile = new File(compressedDirectoryPath + '.zip');
        compressedDirectory.zip(compressedFile);

        // remove the base directory and all its contents
        removeDirectoryRecursively(compressedDirectory);

        // call OCAPI to trigger the sfcc-site-archive-import job
        result.importResult = executeImportJob('sfcc-site-archive-import', compressedFile.name);

        // delete zip file
        if (result.importResult.success) {
            compressedFile.remove();
        }

        if (result.writeResult.success && result.importResult.success) {
            result.success = true;
            // return the customer group link if the import was successful, and we only have 1 customer group
            if (customerGroupLinkId) {
                result.customerGroupId = customerGroupLinkId;
                result.customerGroupLink = `https://${dw.system.System.getInstanceHostname()}/on/demandware.store/Sites-Site/default/ViewApplication-BM?SelectedMenuItem=customers_groups#/?CustomerGroup#CustomerGroupEditor!mode!edit!id!${customerGroupLinkId}`;
            }
        }
    } catch (e) {
        Logger.error('Error in importCustomerGroups: ' + e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        throw e;
    }

    return result;
}

exports.getCustomerGroups = getCustomerGroups;
exports.getShippingMethods = getShippingMethods;
exports.getSiteCatalogId = getSiteCatalogId;
exports.getSiteCategories = getSiteCategories;
exports.getPromoData = getPromoData;
exports.importPromotions = importPromotions;
exports.importCustomerGroups = importCustomerGroups;
