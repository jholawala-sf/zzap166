function Download() {
    var File = require('dw/io/File');
    var CSRFProtection = require('dw/web/CSRFProtection');

    var csrfToken = CSRFProtection.generateToken();

    var filename = request.httpParameterMap.filename.stringValue;
    var file = new File(filename);
    if (!file.exists()) {
        throw new Error('File not found');
    }
    response.redirect(dw.web.URLUtils.url('ViewStudioSetup-DownloadFile', 'SelectedFile', 'Sites/' + filename, 'CurrentFolder', 'Sites/Impex/documentation-uploads', 'csrf_token', csrfToken));
}

Download.public = true;
module.exports.Download = Download;
