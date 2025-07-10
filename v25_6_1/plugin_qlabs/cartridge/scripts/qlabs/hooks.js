function afterFooter() {
    const Velocity = require('dw/template/Velocity');
    const model = new dw.util.HashMap();
    const markup = new dw.util.Template('qlabs/head').render(model).text;
    Velocity.render(markup, null);
}
module.exports = {
    afterFooter: afterFooter
};
