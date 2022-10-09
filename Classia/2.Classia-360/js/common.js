function hideLoading() {
    $('.page-loading').fadeOut();
    $('.box-loading').fadeIn();
}
setTimeout(hideLoading, 2000);


var withTabTablet = $('.tab-tablet-2').width();
$('.tab-tablet-2').click(function () {
    $(this).find('ul').show()
    $(this).find('ul').css({
        'width': withTabTablet + 'px'
    })
})

// menu mobile
var height = $( window ).height()
var withMobile = $( window ).width();
var heightLogo = 0;
var heightFix = 80;
if (withMobile <=480) {
    var withTab2 = $('.tab-m-2').width();
    var withTab3 = $('.tab-m-3').width();

    var withCal = withTab2
        withCal = withCal + withTab3
    $('.tab-m-2').find('ul').css({
        'width': withCal + 'px'
    })

    heightMenu = $('.menu-bottom-m').height()
    heightLogo = $('.logo-m').height()
    heightFix = height - heightMenu - heightLogo
} else if (withMobile > 480 && withMobile <=768) {
    heightMenu = $('.menu-bottom-tablet').height()
    heightFix = height - heightMenu
} else if (withMobile > 768 && withMobile <=1024) {
    heightMenu = $('.menu-bottom-tablet').height()
    heightFix = height - heightMenu
} else {
    heightMenu = $('.menu-bottom').height()
    heightFix = height - heightMenu

    var withTab = $('.tab-7').width();
    $('.tab-7').find('ul').css({
        'width': withTab + 'px'
    })
    $('.tab-7').hover(function () {
        $(this).find('ul').show()
    }, function () {
        $(this).find('ul').hide()
    })
}

$('#render').css({
    'top': heightLogo + 'px',
    'height': heightFix + 'px'
})

