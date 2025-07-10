'use strict';

/* Script Modules */
const scapiServiceFactory = require('*/cartridge/scripts/util/scapiServiceFactory');
const serviceHelpers = require('*/cartridge/scripts/helpers/serviceHelpers');

const ScapiConfig = {
    createRequest: function (service, requestDataContainer) {
        this.serviceAction = requestDataContainer.action;

        var serviceUrl;
        var requestMethod = requestDataContainer.requestMethod;
        if (requestMethod) {
            service.setRequestMethod(requestMethod);

            // enable caching for GET requests
            if (requestMethod === 'GET') {
                service.setCachingTTL(60);
            }
        }

        // set authentication
        if (Object.hasOwnProperty.call(requestDataContainer, 'authentication') && requestDataContainer.authentication) {
            service.setAuthentication(requestDataContainer.authentication);
        }

        // add path to service URL
        if (Object.hasOwnProperty.call(requestDataContainer, 'path') && requestDataContainer.path) {
            serviceHelpers.appendUrlPath(service, requestDataContainer.path);
        }

        // append params to the service request
        if (Object.hasOwnProperty.call(requestDataContainer, 'params') && requestDataContainer.params) {
            serviceHelpers.appendParams(service, requestDataContainer.params);
        }

        // override service URL if it exists in request container
        if (Object.hasOwnProperty.call(requestDataContainer, 'serviceUrl') && requestDataContainer.serviceUrl) {
            serviceUrl = requestDataContainer.serviceUrl;
            service.setURL(serviceUrl);
        }

        var requestHeaders = Object.hasOwnProperty.call(requestDataContainer, 'headers') && requestDataContainer.headers ? requestDataContainer.headers : {};
        var contentType = Object.hasOwnProperty.call(requestHeaders, 'Content-Type') && requestHeaders['Content-Type'] ? requestHeaders['Content-Type'] : null;
        if (requestHeaders && Object.keys(requestHeaders).length > 0) {
            Object.keys(requestHeaders).forEach(function (headerName) {
                service.addHeader(headerName, requestHeaders[headerName]);
            });
        }

        if (requestDataContainer.data) {
            switch (contentType) {
                case 'application/json':
                    return JSON.stringify(requestDataContainer.data);
                case 'application/x-www-form-urlencoded':
                    return serviceHelpers.buildFormPostRequest(requestDataContainer.data);
                default:
                    return requestDataContainer.data;
            }
        }

        return '';
    },
    parseResponse: function (service, serviceResponse) {
        if (serviceResponse && serviceResponse.statusCode >= 200 && serviceResponse.statusCode < 300) {
            if (this.serviceAction === scapiServiceFactory.ACTIONS.PWDLESS_ACCESS_TOKEN) {
                return serviceHelpers.parseJsonResponse(serviceResponse);
            }
            return serviceResponse;
        }
        throw new Error('Service Errored with Status Code: ' + serviceResponse.statusCode);
    },
    mockCall: function (service) {
        const mockService = require('*/cartridge/scripts/util/scapiMockService');

        if (this.serviceAction === scapiServiceFactory.ACTIONS.AUTH_PWDLESS_CUSTOMER) {
            return mockService.getPasswordlessAuthCustomerResponse();
        }
        if (this.serviceAction === scapiServiceFactory.ACTIONS.PWDLESS_ACCESS_TOKEN) {
            return mockService.getPasswordlessAccessTokenResponse();
        }

        return {
            statusCode: 200,
            statusMessage: 'Success',
            text: 'MOCK RESPONSE (' + service.URL + ')'
        };
    },
    filterLogMessage: function (data) {
        try {
            var logObj = JSON.parse(data);
            var result = serviceHelpers.iterate(logObj);
            return result ? JSON.stringify(result) : data;
        } catch (ex) {
            return serviceHelpers.prepareFormLogData(data);
        }
    }
};

module.exports.ScapiConfig = ScapiConfig;
