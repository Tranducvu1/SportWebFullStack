var checkStoreId = $('.checkStoreId').val();
$(function () {
    Address.load('#cityId', '#districtId');
});
/*--- compare quantity ---*/
$(document).ready(function(){
    $("input.input_quantity, input.cart_quantity").keypress(function (e) {
        var productIvt = $(this).attr("max");
        $("input.input_quantity, input.cart_quantity").bind("keyup", function () {
            var qtt = parseInt($("input.input_quantity, input.cart_quantity").val());
            if(productIvt < qtt) {
                alert('Số lượng nhập vào không được quá ' + productIvt);
                $(this).val(productIvt);
            }
        });
    });
    // check hết hàng
    if(in_array(checkStoreId,[22931,3138,43017,8515])) {
        if ($('body .ivt').length) {
            var ps = [];
            $('.ivt').each(function () {
                ps.push({storeId: checkStoreId, id: $(this).attr('psid')});
            });
            if (ps.length) {
                checkInventory(ps, function (rs) {
                    if (rs.inventories != "") {
                        $.each(rs.inventories, function (key, vl) {
                            console.log(vl);
                            if (vl <= 0) {
                                $('.ivt[psid="' + key + '"] .product-thumbnail').append('<span class="outstock">Hết hàng</span>');
                            }
                        });
                    }
                });
            }
        }
    }
});
//mua ngay - add cart in Product View
$(document).ready(function(){
    $("button#buy-now").on("click", function(){
        if ($(this).attr("ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('selid');
            ps['quantity'] = document.getElementById("quantity_product").value;
            products.push(ps);
            addToCart(products, 1, function(rs){
                if (rs.status == 1) {
                    if($('.checkStoreId').val() == 81){
                        $('.blockSize').css('margin-bottom', '-800px');
                        $('.details-product .details-pro .price-box').css('padding-top','0');
                        $('.special-price').empty();
                        $('.special-price').append('<a style="background: #000; color: #fff; padding: 10px 15px; line-height: 30px;font-size: 13px;text-transform: uppercase" href="/cart">Giỏ hàng</a>');
                        ajaxLoadView({
                            view: 'pCart', delay: 100,
                            onSuccess: function (rs) {
                                $('#cartView').html(rs);
                            }
                        });
                    }else{
                        window.location.href = '/cart'
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
        }
    });
    $("button#buy-now-add").on("click", function(){
        if ($(this).attr("ck") == 1) {
            var products = [], ps = {};
            ps['id'] = $(this).attr('selid');
            ps['quantity'] = document.getElementById("quantity_product").value;
            products.push(ps);
            addToCart(products, 1, function(rs){
                if (rs.status == 1) {
                   window.location.href = '/cart/checkout'
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
        }
    });
    if(in_array(checkStoreId,[134354,15113])) {
        $('.nav-item i').click(function () {
            $(this).parent().toggleClass('active');
        })
    }
});

/*----- remove cart -----*/
$(document).ready(function(){
    $("a.remove_cart").on("click", function(){
        var Pid = $(this).attr("data-id");
        if(in_array(checkStoreId, [15113, 43017])) {
            removeCart(Pid, true, null);
        }else {
            if (confirm(msgRemoveCartItem + ' ?') == true) {
                removeCart(Pid, true, null);
            }
        }
    });

/*----- update quantity cart -----*/
    $(document).on("change", "input.cart_quantity", function(){
        var qtt = $(this).val();
        var products = [
            {id: $(this).attr('data-id'), quantity: qtt}
        ];
        addToCart(products, 2, function (rs) {
            location.reload();
        });
    });

    /*-----Cancel Oder-----*/
    $('.delOrderBtn').click(function () {
        var mes = $('#dialogMessage');
        var t = $(this);
        if (confirm('Bạn có muốn hủy đơn hàng?')){
            AppAjax.post('/order/cancel', { 'id': t.attr('rel') },
                function (rs) {
                    if (rs.code == 1) {
                        document.location.href = document.URL;
                    }
                }, 'json'
            );
        }
    });

    /*-------subscribe-----*/

    $('.btnSubscribe').click(function (e) {
        e.preventDefault();
        if(in_array(checkStoreId,[91155, 1642])) {
            AppAjax.post('/contact/contacts', {
                    'content': '.',
                    'name': '.',
                    'email': 'email@gmail.com',
                    'mobile': $('#newsletter_phone').val(),
                    'address': '.'
                },
                function (rs) {
                    if (rs.code) {
                        $('input#newsletter_phone').val('');
                    }
                    var msg = $('#dialogMessage');
                    alert('Đăng kí thành công');
                }
            );
        }else if(in_array(checkStoreId,[93641])) {
            AppAjax.post('/newsletter/subscribe', {mail: $('input#newsletter_signup').val(),mobile: $('input#newsletter_phone').val()},
                function (rs) {
                    if (rs.code) {
                        $('input#newsletter_signup').val('');
                    }
                    var msg = $('#dialogMessage');
                    alert(rs.message);
                }
            );
        } else {
            AppAjax.post('/newsletter/subscribe', {mail: $('input#newsletter_signup').val()},
                function (rs) {
                    if (rs.code) {
                        $('input#newsletter_signup').val('');
                    }
                    var msg = $('#dialogMessage');
                    alert(rs.message);
                }
            );
        }
    });
    /*-----filter----*/
    $('.filter_click').click(function(e){
        e.preventDefault();
        window.location.href = $(this).attr('data-link');
    });

    $("#sign ul li input:not(:submit)").addClass("form-control");

    var backToTopBtn = $('#back-to-top');
    if (backToTopBtn.length) {
        var scrollTrigger = 150, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    backToTopBtn.css('display', 'block');
                } else {
                    backToTopBtn.css('display', 'none');
                }
            };
        $(window).on('scroll', function () {
            backToTop();
        });
        backToTopBtn.on('click', function (e) {
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

    if($('#popupHome.cookie').length){
        if(in_array(checkStoreId,[43017,8515])){
            if($(window).width()>= 768){
                $.fancybox({
                    fitToView: true,
                    content: $('#popupHome'),
                    padding: 0,
                    autoSize: false,
                    maxWidth : 600,
                    minHeight : 350,
                    type: 'image',
                });
            }
            else {
                $.fancybox({
                    fitToView: true,
                    content: $('#popupHome'),
                    padding: 0,
                    minWidth : 180,
                });
            }
        }else {
            $.fancybox({
                // fitToView: false,
                autoSize : true,
                content: $('#popupHome'),
                padding: 0,
            });
        }
    }

    $('#contactFormSubmit').click(function (e) {
        e.preventDefault();
        AppAjax.post('/newsletter/subscribe', {'mail': $('#contactFormEmail').val()},
            function (rs) {
                if (rs.code) {
                    $('#contactFormEmail').val('');
                }
                alert(rs.message);
            }
        );
    });

    if ($( "#slider-range" ).length) {
        var price_max = $('#price_to');
        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: price_max.attr('data-max'),
            values: [parseInt($('#price_form').attr('data-size')),parseInt($('#price_to').attr('data-size'))],
            slide: function( event, ui ) {
                $('#price_form').text($.number(ui.values[0]) + 'đ').attr('data-size',ui.values[0]);
                $('#price_to').text($.number(ui.values[1]) + 'đ').attr('data-size',ui.values[1]);
                window.location.href = addFilter('price', ui.values[0] + ':'+ui.values[1], 3);
            }
        });
    }
});
