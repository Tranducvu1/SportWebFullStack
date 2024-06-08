var storeId = parseInt(document.getElementsByClassName('checkStoreId')[0].value);

$(function () {
    if($.inArray(storeId, [37693, 10103]) !== -1) {
        if($(window).width()< 768) {
            if ($('.utility-bar.checkout-bottom-bar').length) {
                var scrollTrigger = 100, // px
                    backToTop = function () {
                        var scrollTop = $(window).scrollTop();
                        if (scrollTop > scrollTrigger) {
                            $('.utility-bar.checkout-bottom-bar').addClass('show');
                        } else {
                            $('.utility-bar.checkout-bottom-bar').removeClass('show');
                        }
                    };
                backToTop();
                $(window).on('scroll', function () {
                    backToTop();
                });
            }

            $('.sku-slide').owlCarousel({
                responsiveClass: true,
                dots: false,
                nav: true,
                autoplayTimeout: 3500,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    543: {
                        items: 1
                    },
                    768: {
                        items: 1,
                        margin: 5
                    },
                    992: {
                        items: 1
                    },
                    1200: {
                        items: 1
                    }
                }
            });

            $('.mobile-thumb-slide').owlCarousel({
                responsiveClass: true,
                dots: true,
                nav: false,
                autoplayTimeout: 3500,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    543: {
                        items: 1
                    },
                    768: {
                        items: 1,
                        margin: 5
                    },
                    992: {
                        items: 1
                    },
                    1200: {
                        items: 1
                    }
                }
            });

            $('.footer').addClass('hidden');
            $('.sku-panel-close-icon-wrap, .mext-mask').click(function () {
                $('.req a').removeClass('active');
                $('.btnAddToCart').attr('ck', 0);
                $('.mext-slip-wrapper').removeClass('opened');
                $('.input_quantity').val(1);
                // $('.btn-addcart-bottom').removeClass('green')
            });

            $('.qtt-plus').click(function () {
                var input = $('.custom-btn-number .input_quantity');
                var qtt = input.val(), max = parseInt(input.attr('max'));
                if (qtt < max) {
                    input.val(parseInt(qtt)+1)
                }
            });

            $('.qtt-minus').click(function () {
                var input = $('.custom-btn-number .input_quantity');
                var qtt = input.val();
                if (qtt > 1 ) {
                    input.val(parseInt(qtt)-1)
                }
            });

            $('.popup-added-to-cart .btn-close').click(function () {
                $('.popup-added-to-cart').removeClass('opened')
            });

            $('.btn-addcart-bottom').click(function () {
                var t = $(this);
                if (t.attr("ck") == 1) {
                    var products = [], ps = {};
                    ps['id'] = t.attr('selid');
                    ps['quantity'] = $('.input_quantity').val() ? $('.input_quantity').val() : 1;
                    products.push(ps);
                    addToCart(products, 1, function (rs) {
                        if (rs.status == 1) {
                            if (t.attr('id') == 'addcart-bottom') {
                                window.location.href = '/cart'
                                // ajaxLoadView({
                                //     view: 'addedCartMobile',
                                //     onSuccess: function (rs) {
                                //         $('.req a').removeClass('active');
                                //         $('.btnAddToCart').attr('ck', 0);
                                //         // $('.mext-slip-wrapper').removeClass('opened');
                                //         $('.input_quantity').val(1);
                                //         $('.popup-added-to-cart .cart_page_mobile').html(rs);
                                //         $('.popup-added-to-cart').addClass('opened')
                                //     }
                                // });
                            } else {
                                window.location.href = '/cart/checkout'
                            }
                        } else {
                            var mes = $('#dialogMessage');
                            mes.html('<p><span class="ui-icon ui-icon-alert" style="float: left; margin: 0 10px 40px 0;"></span>' +
                                rs.messages + '</p>');
                            mes.dialog({
                                title: "Thông báo!", modal: true, show: "explode", hide: "explode",
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        }
                    });
                } else {
                    // $(this).toggleClass('green');
                    $('.mext-slip-wrapper').addClass('opened');
                }
            })
        }
    }

    if($(window).width()>= 769){
        $('.req a').tooltip({
            position: {
                my: "center bottom-10",
                at: "center top",
                using: function (position, feedback) {
                    $(this).css(position);
                    $("<div>")
                        .addClass("arrow")
                        .addClass(feedback.vertical)
                        .addClass(feedback.horizontal)
                        .appendTo(this);
                }
            }
        });
        $('.btn').tooltip({
            position: {
                my: "center bottom-10",
                at: "center top",
                using: function (position, feedback) {
                    $(this).css(position);
                    $("<div>")
                        .addClass("arrow")
                        .addClass(feedback.vertical)
                        .addClass(feedback.horizontal)
                        .appendTo(this);
                }
            }
        });
    }

    checkInv();

    /* rate product*/
    var vote = $('p.vote span');
    vote.hover(function () {
        $(this).addClass('voteHover');
        $("p.vote span:lt(" + $(this).index() + ")").addClass('voteHover');
        $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
    }, function () {
        $(this).removeClass('voteHover');
        $("p.vote span:lt(" + $(this).index() + ")").removeClass('voteHover');
        $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
    });
    vote.click(function () {
        vote.removeClass('active voted');
        $(this).addClass('active voted');
        $("p.vote span:lt(" + $(this).index() + ")").addClass('active');
    });

    $('.form-submit #submit').click(function (e) {
        e.preventDefault();
        var t = $(this);
        var title = $('#voteFullName');
        var email = $('#voteEmail');
        var comment = $('#voteContent');
            if(!$('.vote .voted').attr('data-rate')){
                alert('Bạn chưa chọn số sao đánh giá!')
            }else{
                AppAjax.post(
                    '/rating/add?type=1',
                    {
                        itemId: t.attr('data-pid'),
                        point: $('.vote .voted').attr('data-rate'),
                        storeId: t.attr('data-storeId'),
                        title: title.val(),
                        comment: comment.val(),
                    },
                    function (rs) {
                        if (rs.code == 1) {
                            alert(rs.msg);
                            window.location.reload();
                        } else {
                            alert(rs.msg);
                        }
                    },
                    'json'
                );
            }
    });
    /*--- size ---*/
    $('.size a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity_product'), atc = $('.btnAddToCart'), attrs = {};
        if (!t.hasClass('active')) {
            if($('.gift-ar').length) {
                $('.gift-ar').empty();
            }
            size.removeClass('active');
            if ($('.color.req').length && !$('.color.req a.active').length) {
                size.attr('data-original-title', msgColor);
            } else {
                attrs[$('.color.req').attr('data-column')] = t.attr('data-value');
                if (t.attr('qtt')) {
                    t.addClass('active');
                    if(t.attr('data-price') > 0) {
                        if (storeId == 37693 || storeId == 10103) {
                            $('#price-view .product-price').html('<sup>đ</sup>' + $.number(t.attr('data-price')));
                        }else if (in_array(storeId, [93641])) {
                            $('#price-view').html($.number(t.attr('data-price')) + ' VNĐ');
                        }else {
                            $('#price-view .product-price').html($.number(t.attr('data-price')) + ' VNĐ');
                            $('#price-view .product-price-old').html($.number(t.attr('data-oldPrice')) + ' VNĐ');
                        }
                    }
                    if (in_array(storeId, [93641])) {
                        $('.select-size').html(t.text());
                        $('.select-size-option').slideToggle('20');
                    }
                    if(in_array(storeId, [43017,8515,11503])) {
                        AppAjax.post(
                            '/product/child?childId=' + t.attr('selid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1) {
                                    if (rs.gift != '') {
                                        let inner = '';
                                        $.each(rs.gift, function (i, item) {
                                            inner += '<span>- ' + item.name + ' : <span style="color: red; font-weight: 600"> ' + $.number(item.price) + ' VNĐ</span><br/>';
                                        });
                                        $('.gift-ar').append(inner);
                                    }
                                }
                            },
                            'json'
                        );
                    }
                    qtt.attr('max', t.attr('qtt'));
                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                    ajaxLoadView({
                        view: 'loadInventory&psId='+t.attr('selId'),
                        onSuccess: function (rs) {
                            $('.listStoresIvt').html(rs);
                        }
                    });
                }
            }
        }
    });

    /*--- color ---*/
    $('.color.req a').click(function () {
        var t = $(this), size = $('.size a'), qtt = $('#quantity_product'), atc = $('.btnAddToCart'), src = $(this).attr('data-src'), attrs = {};
        $('#zoom_01').attr('src', src);
        $(".zoomWindow").css("background-image", 'url("'+src+'")');
        if (!t.hasClass('active')) {
            $('.color.req a').removeClass('active');
            if($('.gift-ar').length) {
                $('.gift-ar').empty();
            }
            if (in_array(storeId, [93641])) {
                $('.select-size').html('Hãy chọn size của bạn');
            }
            if (size.length > 1) {
                size.removeClass('active deactive');
                t.addClass('active');
                size.removeAttr('data-original-title');
                atc.addClass("unsel").attr("ck", 0);
                attrs[$('.color.req').attr('data-column')] = t.attr('data-value');
                size.each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('data-column')] = t.attr('data-value');
                    AppAjax.post(
                        '/product/child?psId=' + $('.btnAddToCart').attr('psId'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1) {
                                if (rs.data.available <= 0) {
                                    t.addClass('deactive').attr('title', msgOutofStock).removeAttr('qtt');
                                } else {
                                    t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                                }

                                if(in_array(storeId, [43017,8515,11503])) {
                                    if(rs.gift != ''){
                                        let inner='';
                                        $.each(rs.gift, function(i, item) {
                                            inner +='<span>- ' + item.name + ' : <span style="color: red; font-weight: 600"> ' + $.number(item.price) + ' VNĐ<br/>';
                                        });
                                        $('.gift-ar').append(inner);
                                    }
                                }
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock).removeAttr('qtt');
                            }
                        },
                        'json'
                    );
                });
            } else {
                if (t.attr('qtt')) {
                    if(in_array(storeId, [43017,8515,11503])) {
                        AppAjax.post(
                            '/product/child?childId=' + t.attr('selid'),
                            {'attrs': attrs},
                            function (rs) {
                                if (rs.code == 1) {
                                    if (rs.gift != '') {
                                        let inner = '';
                                        $.each(rs.gift, function (i, item) {
                                            inner += '<span>- ' + item.name + ' : <span style="color: red; font-weight: 600"> ' + $.number(item.price) + ' VNĐ</span><br/>';
                                        });
                                        $('.gift-ar').append(inner);
                                    }
                                }
                            },
                            'json'
                        );
                    }
                    t.addClass('active');
                    if(t.attr('data-price') > 0) {
                        if (storeId == 37693 || storeId == 10103) {
                            $('#price-view .product-price').html('<sup>đ</sup>' + $.number(t.attr('data-price')));
                        }else if (in_array(storeId, [93641])) {
                            $('#price-view').html($.number(t.attr('data-price')) + ' VNĐ');
                        }else {
                            $('#price-view .product-price').html($.number(t.attr('data-price')) + ' VNĐ');
                        }
                    }
                    atc.attr('selId', t.attr('selId')).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                    qtt.attr('max', t.attr('qtt'));
                    ajaxLoadView({
                        view: 'loadInventory&psId=' + t.attr('selId'),
                        onSuccess: function (rs) {
                            $('.listStoresIvt').html(rs);
                        }
                    });
                }
            }
        }
    });

    if($.inArray(storeId, [16294, 10179]) == -1) {
        var vote = $('p.vote span');
        vote.hover(function () {
            $(this).addClass('voteHover');
            $("p.vote span:lt(" + $(this).index() + ")").addClass('voteHover');
            $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
        }, function () {
            $(this).removeClass('voteHover');
            $("p.vote span:lt(" + $(this).index() + ")").removeClass('voteHover');
            $("p.vote span:gt(" + $(this).index() + ")").removeClass('voteHover');
        });
        vote.click(function () {
            vote.removeClass('active voted');
            $(this).addClass('active voted');
            $("p.vote span:lt(" + $(this).index() + ")").addClass('active');
        });
        $('#comment').keyup(function(){
            $('#digitComment').html($('#comment').val().length + txtDigitComment);
        });
        $('#btnRate button.btnRed').click(function (e) {
            e.preventDefault();
            var t = $(this);
            var title = $('#title');
            var comment = $('#commentText'), submit = true;
            if (!vote.hasClass('voted')) {
                submit = false;
                alert(msgStarRate);
                return;
            }
            if (!title.val()) {
                submit = false;
                alert(txtTitle);
                return;
            }
            if (!comment.val() || comment.val().length < 30) {
                submit = false;
                alert(txtComment);
                return;
            }
            if (submit) {
                submit = false;
                AppAjax.post(
                    '/rating/add?type=1',
                    {
                        itemId: t.attr('data-pid'),
                        point: $('.vote .voted').attr('data-rate'),
                        storeId: t.attr('data-storeId'),
                        title: $('#title').val(),
                        comment: $('#commentText').val(),
                    },
                    function (rs) {
                        if (rs.code == 1) {
                            submit = true;
                            alert(rs.msg);
                            window.location.reload();
                        } else {
                            alert(rs.msg);
                        }
                    },
                    'json'
                );
            }
        });
    }

});

function checkInv() {
    var req = $('.req').length, attrs = {}, atc = $('.btnAddToCart'), qtt = $('#quantity_product');
    if (req == 1) {
        if ($('.color.req').length) {
            if ($('.color.req a.active').length) {
                attrs[$('.color.req').attr('data-column')] = $('.color.req a.active').attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );

            } else {
                $('.color.req a').each(function () {
                    var t = $(this);
                    attrs[$('.color.req').attr('data-column')] = t.attr('data-value');
                    AppAjax.post(
                        '/product/child?psId=' + atc.attr('psId'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        } else {
            if ($('.size a.active').length) {
                attrs[$('.size').attr('data-column')] = $('.size a.active').attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1 && rs.data.available > 0) {
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                        } else {
                            atc.attr('data-original-title', msgOutofStock);
                        }
                    },
                    'json'
                );
            } else {
                $('.size a').each(function () {
                    var t = $(this);
                    attrs[$('.size').attr('data-column')] = t.attr('data-value');
                    AppAjax.post(
                        '/product/child?psId=' + atc.attr('psId'),
                        {'attrs': attrs},
                        function (rs) {
                            if (rs.code == 1 && rs.data.available > 0) {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price).attr('data-oldPrice', rs.data.oldPrice);
                            } else {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                        },
                        'json'
                    );
                });
            }
        }
        return false;
    }
    if (req > 1) {
        var colorAt = $('.color.req a.active'), sizeAt = $('.size a.active');
        if (colorAt.length && sizeAt.length) {
            attrs[$('.color.req').attr('data-column')] = colorAt.attr('data-value');
            attrs[$('.size').attr('data-column')] = sizeAt.attr('data-value');
            AppAjax.post(
                '/product/child?psId=' + atc.attr('psId'),
                {'attrs': attrs},
                function (rs) {
                    if (rs.code == 1) {
                        if (rs.data.available <= 0) {
                            sizeAt.addClass('deactive').attr('title', msgOutofStock);
                        }
                        else {
                            $('.size a').attr('data-price', rs.data.price);
                            if($('.size a').attr('data-price') > 0){
                                if (storeId == 37693 || storeId == 10103) {
                                    $('#price-view .product-price').html('<sup>đ</sup>' + $.number($('.size a').attr('data-price')));
                                } else {
                                    $('#price-view .product-price').html($.number($('.size a').attr('data-price')) + ' VNĐ');
                                }
                            }
                            qtt.attr('max', rs.data.available);
                            atc.attr('selId', rs.data.id).removeAttr('data-original-title').attr('ck', 1).removeClass('unsel');
                        }
                    } else {
                        atc.attr('data-original-title', msgOutofStock);
                    }
                },
                'json'
            );
            return false;
        }
        if (colorAt.length && !sizeAt.length) {
            attrs[$('.color.req').attr('data-column')] = colorAt.attr('data-value');
            $('.size a').each(function () {
                var t = $(this);
                attrs[$('.size').attr('data-column')] = t.attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if (rs.data.available <= 0) {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                            else {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            }
                        } else {
                            t.addClass('deactive').attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
        if (!colorAt.length && sizeAt.length) {
            attrs[$('.size').attr('data-column')] = sizeAt.attr('data-value');
            $('.color.req a').each(function () {
                var t = $(this);
                attrs[$('.color.req').attr('data-column')] = t.attr('data-value');
                AppAjax.post(
                    '/product/child?psId=' + atc.attr('psId'),
                    {'attrs': attrs},
                    function (rs) {
                        if (rs.code == 1) {
                            if (rs.data.available <= 0) {
                                t.addClass('deactive').attr('title', msgOutofStock);
                            }
                            else {
                                t.attr('qtt', rs.data.available).attr('selId', rs.data.id).attr('data-price', rs.data.price);
                            }
                        } else {
                            t.addClass('deactive').attr('title', msgOutofStock);
                        }
                    },
                    'json'
                );
            });
            return false;
        }
    }
}

/*=------- end chung ------*/

$(document).ready(function(){

    $('.qtyplus').click(function () {
        var input = $('.custom-btn-number .input_quantity');
        var qtt = input.val(), max = parseInt(input.attr('max'));
        if (qtt < max) {
            input.val(parseInt(qtt)+1)
        }
    });

    $('.qtyminus').click(function () {
        var input = $('.custom-btn-number .input_quantity');
        var qtt = input.val();
        if (qtt > 1 ) {
            input.val(parseInt(qtt)-1)
        }
    });

    $('.video-item .thumb-link').click(function(){
        $('.large-image').hide();
        $('.large-video').show();
        $('.zoomContainer').hide();
    });
    $('.image-item .thumb-link').click(function(){
        $('.large-image').show();
        $('.large-video').hide();
        $('.zoomContainer').show();
    })

    if(in_array(storeId,[39888,11053])){
    }else{
        if($(window).width()>1200){
            setTimeout(function(){
                $('#zoom_01').elevateZoom({
                    gallery:'gallery_01',
                    zoomWindowWidth:420,
                    zoomWindowHeight:500,
                    zoomWindowOffetx: 10,
                    easing : true,
                    scrollZoom : false,
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    imageCrossfade: true
                });
            },500);
        }
    }


    //var alias = 'khan-len-dan-van-thung-asos';

    $(window).on("load resize",function(e){
        if($(window).width() > 1199){
            var he = $('.large-image').height();
            if (he > 500) {
                he = he - 200;
                $('#gallery_01').css('margin-top','100px');
                $('.product-image-block').removeClass('margin');
            }else{
                $('.product-image-block').addClass('margin');
                $('#gallery_01').css('margin-top','0');
            }
            $('#gallery_01').height(he);
            if(he < 250){
                var items = 2;
            }else{
                if(he < 400){
                    var items = 3;
                }else{
                    if(he > 750){
                        var items = 9;
                    }else{

                        if(he > 600){
                            var items = 7;
                        }else{
                            var items = 5;
                        }
                    }
                }
            }
            $("#gallery_01.swiper-container").each( function(){
                var config = {
                    spaceBetween: 15,
                    slidesPerView: items,
                    direction: $(this).data('direction'),
                    paginationClickable: true,
                    nextButton: '.swiper-button-next.fixlg',
                    prevButton: '.swiper-button-prev.fixlg',
                    grabCursor: true ,
                    calculateHeight:true,
                    height:he
                };
                var swiper = new Swiper(this, config);
            });

            $('.more-views .swiper-slide img').each(function(e){
                var t1 = (this.naturalHeight/this.naturalWidth);
                if(t1<1){
                    $(this).parents('.swiper-slide').addClass('bethua');
                }
            });
        }else{
            var heightWindow = parseInt($(window).width());
            var items = 4;
            // console.log(heightWindow);
            $("#gallery_01.swiper-container").each( function(){
                if(heightWindow < 768){
                    if(!in_array(storeId,[43017,8515])) {
                        items = 1;
                    }
                }
                var config = {
                    spaceBetween: 15,
                    slidesPerView: items,
                    direction: 'horizontal',
                    paginationClickable: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    grabCursor: true ,
                    calculateHeight:true,
                };
                var swiper = new Swiper(this, config);
            });
        }
        $('.thumb-link').click(function(e){
            e.preventDefault();
            var hr = $(this).attr('href');
            $('#zoom_01').attr('src',hr);
        });
    });

    $('#gallery_01 img, .swatch-element label').click(function(e){
        $('.checkurl').attr('href',$(this).parent().attr('href'));
        setTimeout(function(){
            if($(window).width() > 1200){
                $('.zoomContainer').remove();
                $('#zoom_01').elevateZoom({
                    gallery:'gallery_01',
                    zoomWindowWidth:420,
                    zoomWindowHeight:500,
                    zoomWindowOffetx: 10,
                    easing : true,
                    scrollZoom : false,
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    imageCrossfade: true
                });
            }

            if($(window).width() > 1199){
                var he = $('.large-image').height();
                if (he > 500) {
                    he = he - 200;
                    $('#gallery_01').css('margin-top','100px');
                    $('.product-image-block').removeClass('margin');

                }else{
                    $('.product-image-block').addClass('margin');
                    $('#gallery_01').css('margin-top','0');
                }
                $('#gallery_01').height(he);

                if(he < 250){
                    var items = 2;
                }else{
                    if(he < 400){
                        var items = 3;
                    }else{
                        if(he > 750){
                            var items = 9;
                        }else{
                            if(he > 600){
                                var items = 7;
                            }else{
                                var items = 5;
                            }
                        }
                    }
                }
                $("#gallery_01.swiper-container").each( function(){
                    var config = {
                        spaceBetween: 15,
                        slidesPerView: items,
                        direction: $(this).data('direction'),
                        paginationClickable: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        grabCursor: true ,
                        calculateHeight:true,
                        height:he
                    };
                    var swiper = new Swiper(this, config);
                });
            }

        },400);

        setTimeout(function(){
            if($(window).width() > 1200){
                $('#zoom_01').elevateZoom({
                    gallery:'gallery_01',
                    zoomWindowWidth:420,
                    zoomWindowHeight:500,
                    zoomWindowOffetx: 10,
                    easing : true,
                    scrollZoom : false,
                    cursor: 'pointer',
                    galleryActiveClass: 'active',
                    imageCrossfade: true
                });
            }
            if($(window).width() > 1199){
                var he = $('.large-image').height();
                if (he > 500) {
                    he = he - 200;
                    $('#gallery_01').css('margin-top','100px');
                    $('.product-image-block').removeClass('margin');
                }else{
                    $('.product-image-block').addClass('margin');
                    $('#gallery_01').css('margin-top','0');
                }
                $('#gallery_01').height(he);
                if(he < 250){
                    var items = 2;
                }else{
                    if(he < 400){
                        var items = 3;
                    }else{
                        if(he > 750){
                            var items = 9;
                        }else{
                            if(he > 600){
                                var items = 7;
                            }else{
                                var items = 5;
                            }
                        }
                    }
                }
                $("#gallery_01.swiper-container").each( function(){
                    var config = {
                        spaceBetween: 15,
                        slidesPerView: items,
                        direction: $(this).data('direction'),
                        paginationClickable: true,
                        nextButton: '.swiper-button-next',
                        prevButton: '.swiper-button-prev',
                        grabCursor: true ,
                        calculateHeight:true,
                        height:he
                    };
                    var swiper = new Swiper(this, config);
                });
            }
        },1000);
    });

    function scrollToxx() {
        $('html, body').animate({ scrollTop: $('.product-tab.e-tabs').offset().top }, 'slow');
        $('.product-tab .tab-link').removeClass('current');
        $('.product-tab .tab-link[data-tab=tab-3]').addClass('current');
        $('.product-tab .tab-content').removeClass('current');
        $('.product-tab .tab-content#tab-3').addClass('current');
        return false;
    }
});