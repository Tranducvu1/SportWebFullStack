/********************************************************
# Quickview
********************************************************/
initQuickView();
var product = {};
var option1 = '';
var option2 = '';

function changeImageQuickView(img, selector) {
    var src = $(img).attr("src");
    src = src.replace("_compact", "");
    $(selector).attr("src", src);
}
function initQuickView(){
    $(document).on("click", "#thumblist_quickview li", function() {
        changeImageQuickView($(this).find("img:first-child"), ".product-featured-image-quickview");
        $(this).parent().parent().find('li').removeClass('active');
        $(this).addClass('active');
    });
    $(document).on('click', '.quick-view', function(e) {
        if($(window).width() > 1025){
            e.preventDefault();
            var proId = $(this).attr("data-id");
            $.ajax({
                url: 'product/q'+proId,
                type: 'GET',
                dataType: 'text',
                success: function(data){
                    $("div#quick-view-product").html(data);
                    $("div#quick-view-product").modal("show");
                    $.getScript('/js/elevatezoom/elevatezoom.min.js');
                }
            });
        }
    });
}

function validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

$(document).on('click', '.quickview-close, #quick-view-product .quickview-overlay, .fancybox-overlay', function(e){
    $("#quick-view-product").fadeOut(0);
    $('#quick-view-product').modal('hide');
});