$(function () {
    $(window).load(function () {
        if ($(".cate-desc").height() > 400) {
            $(".cate-desc").css('max-height', '165px');
            $(".view-content").show();
        } else {
            $(".view-content").hide();
        }
    });

    $(".view-content").click(function () {
        $(this).hide();
        $(".cate-desc").css('max-height', '100%');
    });
})