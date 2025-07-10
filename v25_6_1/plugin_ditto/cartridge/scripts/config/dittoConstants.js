'use strict';

const siteHelpers = require('*/cartridge/scripts/helpers/siteHelpers');

module.exports = {
    AB_TESTS: {
        PDP_ATC: {
            TEST_ID: siteHelpers.getSitePreference('DittoAbTestPdpAddToCartTestId') || 'PDP_ATC_Placement',
            SEGMENTS: {
                TEST_SEGMENT: siteHelpers.getSitePreference('DittoAbTestPdpAddToCartTestSegmentId') || 'Test Segment'
            }
        }
    }
};
