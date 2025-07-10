'use strict'

/**
 * @param {dw.experience.CustomEditor} editor The custom editor object
 */
module.exports.init = function (editor) {
    var URLUtils = require('dw/web/URLUtils')

    // requires bm_ditto cartridge (see b2c-commerce-industries project)
    editor.configuration.put('locale', request.locale);
    editor.configuration.put('serviceUrl', URLUtils.https('OpenAI-OpenAIRequest').toString())
    editor.configuration.put('egptServiceUrl', URLUtils.https('QLabs-EGPTRequest').toString())
    editor.configuration.put('model', dw.system.System.preferences.custom.openaiModel.value)
    editor.configuration.put(
        'enableExamples',
        dw.system.Site.current.getCustomPreferenceValue('aiPageDesignerEnableExamples')
    )
    editor.configuration.put(
        'enableVision',
        dw.system.Site.current.getCustomPreferenceValue('aiPageDesignerEnableVision')
    )
    editor.configuration.put(
        'examples',
        dw.system.Site.current.getCustomPreferenceValue('aiPageDesignerExamples')
    )
    editor.configuration.put(
        'jsxPrompt',
        dw.system.Site.current.getCustomPreferenceValue('aiPageDesignerJSXPrompt')
    )
    editor.configuration.put(
        'workerScript',
        URLUtils.httpsStatic('js/sharedworker.js').toString()
    )
    editor.configuration.put('publicPath', URLUtils.httpsStatic('experience/editors').toString())
}
