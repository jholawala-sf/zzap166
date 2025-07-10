// eslint-disable-next-line
exports.beforePOST = function (authorizationHeader, authRequestType) {
    if (authRequestType.displayValue === 'credentials') {
        // we cant change the body, so we can either have get parameters or custom headers
        var resetToken = request.httpHeaders.get('x-sf-cc-reset');
        if (resetToken) {
            var userName;
            var password;

            var baseAuth = authorizationHeader.substr(6);
            var base64decoded = dw.util.StringUtils.decodeBase64(baseAuth, 'UTF-8');

            [userName, password] = base64decoded.split(':');

            var customer = dw.customer.CustomerMgr.getCustomerByLogin(userName);
            var credentials = customer.profile.credentials;
            var status = credentials.setPasswordWithToken(resetToken, password);
            if (status.error) {
                return status;
            }
        }
    }
};
