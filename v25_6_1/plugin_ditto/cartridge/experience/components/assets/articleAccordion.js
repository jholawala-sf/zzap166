"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

/**
 * Render logic for the component
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    model.id = "article-acc-" + context.component.getID();

    model.articleTitle = content.article_title;

    model.articleTitleOne = content.article_title1;
    model.articleBodyOne = content.article_body1;

    model.articleTitleTwo = content.article_title2;
    model.articleBodyTwo = content.article_body2;

    model.articleTitleThree = content.article_title3;
    model.articleBodyThree = content.article_body3;

    model.articleTitleFour = content.article_title4;
    model.articleBodyFour = content.article_body4;

    model.articleTitleFive = content.article_title5;
    model.articleBodyFive = content.article_body5;

    /*if section 3 is blank its false */
    if (content.article_title3 || content.article_body3) {
        model.showThree = true;
    } else if (
        content.article_title3 == null ||
        content.article_body3 == null
    ) {
        model.showThree = false;
    }

    /*if section 4 is blank its false */
    if (content.article_title4 || content.article_body4) {
        model.showFour = true;
    } else if (
        content.article_title4 == null ||
        content.article_body4 == null
    ) {
        model.showFour = false;
    }

    /*if section 5 is blank its false */
    if (content.article_title5 || content.article_body5) {
        model.showFive = true;
    } else if (
        content.article_title5 == null ||
        content.article_body5 == null
    ) {
        model.showFive = false;
    }

    return new Template("experience/components/assets/articleAccordion").render(
        model
    ).text;
};
