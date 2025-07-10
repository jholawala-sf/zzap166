'use strict'
/**
 * Init for the custom editor
 */
module.exports.init = function (editor) {
  var URLUtils = require('dw/web/URLUtils')
  var Resource = require('dw/web/Resource')

  editor.configuration.put(
    'assetUrl',
    URLUtils.httpsStatic('experience/editors/headless').toString()
  )
  editor.configuration.put(
    'pluginVersion',
    Resource.msg('global.version.number', 'version', null)
  )
  editor.configuration.put(
    'pluginVersionUpdatedAt',
    Resource.msg('global.version.last_updated', 'version', null)
  )
  editor.configuration.put(
    'promptVersion',
    Resource.msg('global.prompt.version', 'version', null)
  )
  editor.configuration.put(
    'promptVersionUpdatedAt',
    Resource.msg('global.prompt.last_updated', 'version', null)
  )

  editor.configuration.put(
      'isDemo',
      dw.system.Site.current.getCustomPreferenceValue('einsteinAssistedDemoMode') === true
  )
  editor.configuration.put(
      'demoPrompts',
      dw.system.Site.current.getCustomPreferenceValue('einsteinAssistedDemoPrompts') || ''
  )
}
