const Template = require('dw/util/Template');
const HashMap = require('dw/util/HashMap');
// const PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper');



// function addPage(){
//
// }

/**
 * Render logic for the dynamiclayout.
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @returns {string} The rendered template
 */
module.exports.render = function (context) {
    const model = new HashMap();
    const { content } = context;


    model.content = content;

    model.wizard = {
        title: '',
        showSteps: '',
        category: '',
        colorPrimary: '',
        colorAlternate: '',
        buttonActiveColor: '',
        pages: [
        ]
    }

    // model.wizard = {
    //     override: content.override,
    //     title: 'Build Your Plan Here',
    //     showSteps: true,
    //     category: 'bla',
    //     colorPrimary: '#139ade',
    //     colorAlternate: '#41d035',
    //     buttonActiveColor: '#b9fa94',
    //     finalURL: 'URL HERE',
    //     pages: [
    //         {
    //             pageTitle: 'Page 1',
    //             pageQuestion: 'Question for page 1',
    //             pageAttribute: 'color',
    //             pageImage: 'someImageHere',
    //             answers: [
    //                 {
    //                     answerText: 'YES',
    //                     filter: 'SOME',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'NO',
    //                     filter: 'SOME1',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'true',
    //                     filter: 'SOME2',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'false',
    //                     filter: 'SOME3',
    //                     icon: '',
    //                     image: ''
    //                 }
    //             ]
    //         },
    //         {
    //             pageTitle: 'Page 2',
    //             pageQuestion: 'Question for page 2',
    //             pageAttribute: 'shape',
    //             pageImage: 'someImageHere',
    //             answers: [
    //                 {
    //                     answerText: 'YES',
    //                     filter: 'SOME',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'NO',
    //                     filter: 'SOME1',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'true',
    //                     filter: 'SOME2',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'false',
    //                     filter: 'SOME3',
    //                     icon: '',
    //                     image: ''
    //                 }
    //             ]
    //         },
    //         {
    //             pageTitle: 'Page 3',
    //             pageQuestion: 'What phone do you want?',
    //             pageAttribute: 'phone',
    //             pageImage: 'someImageHere',
    //             answers: [
    //                 {
    //                     answerText: 'YES',
    //                     filter: 'SOME',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'NO',
    //                     filter: 'SOME1',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'true',
    //                     filter: 'SOME2',
    //                     icon: '',
    //                     image: ''
    //                 },
    //                 {
    //                     answerText: 'false',
    //                     filter: 'SOME3',
    //                     icon: '',
    //                     image: ''
    //                 }
    //             ]
    //         }
    //     ]
    // };

    model.wizard = JSON.parse(content.configText);

    return new Template('experience/components/assets/finderExternal').render(model).text;
};
