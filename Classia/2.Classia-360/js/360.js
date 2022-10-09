$(document).on('click', function (e) {
    if ($(e.target).closest(".show-tutorial").length === 0) {
        $('.overlay').fadeOut('slow');
        $('.show-tutorial').fadeOut('slow');
        $('.show-tutorial').remove();
        $('.overlay').remove();
    }
});

$(document).ready(function() {
    if ($('.overlay').length > 0) {
        $('.overlay').fadeIn('slow');
        $('.show-tutorial').fadeIn('slow');
    }

    $('#hide_overlay_tutorial').click(function () {
        $('.overlay').fadeOut('slow');
        $('.show-tutorial').fadeOut('slow');
        $('.show-tutorial').remove();
        $('.overlay').remove();
    });
})