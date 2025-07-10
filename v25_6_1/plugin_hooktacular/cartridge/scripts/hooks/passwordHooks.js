exports.afterPOST = function (customer, resetToken) {
    var variables = new dw.util.HashMap();
    variables.put('Customer', customer);
    variables.put('ResetPasswordToken', resetToken);
    // replace by customers password reset
    var template = new dw.util.Template('test/resetpasswordemail.isml');
    var content = template.render(variables);
    var mail = new dw.net.Mail().setSubject('Password Reset').setContent(content).setFrom('noreply@salesforce.com')
        .addTo(customer.profile.email);
    mail.send();
    // secure this further, or use test email service, or trust it just works
    if (dw.system.System.getInstanceType() !== dw.system.System.PRODUCTION_SYSTEM) {
        response.addHttpHeader('X-SF-CC-Token', resetToken);
    }
};
