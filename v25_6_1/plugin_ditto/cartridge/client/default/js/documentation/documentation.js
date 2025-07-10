function getModalHtmlElement() {
    if ($('#editDocumentationModal').length !== 0) {
        $('#editDocumentationModal')
            .remove();
    }
    var htmlString = '<!-- Modal -->'
        + '<div class="modal fade" id="editDocumentationModal" tabindex="-1" role="dialog">'
        + '<span class="enter-message sr-only"></span>'
        + '<div class="modal-dialog quick-view-dialog modal-lg">'
        + '<!-- Modal content-->'
        + '<div class="modal-content">'
        + '<div class="modal-body">'
        + '    <button type="button" class="close pull-right" data-dismiss="modal">'
        + '        <span aria-hidden="true">&times;</span>'
        + '        <span class="sr-only"> </span>'
        + '    </button><div class="modal-body-contents"></div></div>'
        + '<div class="modal-footer"></div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $('body')
        .append(htmlString);
}

function addEventsToModal(lineItemUUID) {
    const uuidField = $('#editDocumentationModal form input[name="lineItemUUID"]');
    uuidField.val(lineItemUUID);
}

function fillModalElement(editProductUrl, lineItemUUID) {
    $('.modal-body')
        .spinner()
        .start();
    $.ajax({
        url: editProductUrl,
        method: 'GET',
        success: function (data) {
            $('#editDocumentationModal .modal-body-contents')
                .empty();
            $('#editDocumentationModal .modal-body-contents')
                .html(data);
            $('#editDocumentationModal')
                .modal('show');
            $('body')
                .trigger('editdocumentationmodal:ready');
            $.spinner()
                .stop();

            addEventsToModal(lineItemUUID)
        },
        error: function () {
            $.spinner()
                .stop();
        }
    });
}


module.exports = {
    documentationConfigure: function () {
        $('body')
            .on('click', '.cart-page .product-edit .documentation', function (e) {
                e.preventDefault();

                var editProductUrl = $(this)
                    .attr('href');
                var lineItemUUID = $(this)
                    .attr('data-uuid');
                getModalHtmlElement();
                fillModalElement(editProductUrl, lineItemUUID);
            });
        $('body')
            .on('shown.bs.modal', '#editDocumentationModal', function () {
                console.log('editDocumentationModal shown');
            });
    }
};
