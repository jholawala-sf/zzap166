window.addEventListener('DOMContentLoaded', (event) => {
    $('.popover-source').on('mouseenter focusin', function (e) {
        var selector = e.delegateTarget.dataset.popoverTarget;
        if ($(selector).length > 0 && $(selector).children().length > 0) {
            $(selector).addClass('show');
            $(selector).attr('aria-expanded', 'true');
        }
    });

    $('.popover-source').on('mouseleave', function (e) {
        var selector = e.delegateTarget.dataset.popoverTarget;
        if ($(selector).length > 0) {
            $(selector).removeClass('show');
            $(selector).attr('aria-expanded', 'false');
        }
    });
})