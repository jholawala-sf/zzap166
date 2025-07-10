'use strict'

var System = require('dw/system/System')
var orgPrefs = System.getPreferences()
var isEGPTTrainingEnabled =
  orgPrefs &&
  Object.hasOwnProperty.call(orgPrefs, 'custom') &&
  Object.hasOwnProperty.call(orgPrefs.custom, 'isEGPTTrainingEnabled')
    ? orgPrefs.custom.isEGPTTrainingEnabled
    : false

module.exports = {
  FETCH_DEFAULT_TIMEOUT: 5000,
  /**
   *  WARNING: FOR INTERNAL USE ONLY !!!
   *
   *  ECOM version with allowStorefront=true uses the internal service name: 'Salesforce.Internal.EGPT' while the productized version uses 'Salesforce.Internal.PageDesignerEgpt'
   *  We import custom object extension into BM for training and enable `isEGPTTrainingEnabled` flag which allows us to decide what service name to use.
   *  How to setup custom object extension (Do this only if 'Salesforce.Internal.EGPT' service is configured):
   *
   *  1. Go to Administration > Site Development > Import & Export.
   *  2. Under "Metadata" click Import.
   *  3. Use the upload option on top of the page to Upload the file: `site_import_einstein_page_designer/meta/system-objecttype-extensions-einstein-page-designer.xml`
   *  4. Select `system-objecttype-extensions-einstein-page-designer.xml` Click Import -> Click Next.
   *  5. Navigate to Administration > Global Preferences > Global Custom Preferences > EGPT Page Designer Training Preferences
   *  6. Set `Support EGPT Training?` to true (checked)
   *  7. Click Apply
   *
   */
  EGPT_SERVICE: isEGPTTrainingEnabled
    ? 'Salesforce.Internal.EGPT'
    : 'Salesforce.Internal.PageDesignerEgpt'
}
