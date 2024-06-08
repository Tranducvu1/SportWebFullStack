$(document).ready(function() {
    if($(window).width() > 768) {
        if ($('div.ivt').length) {
            var storeId = $('.checkStoreId').val();
            var ps = [];
            $('div.ivt').each(function () {
                var t = $(this);
                var id_p = t.attr('psid');
                ps.push({id: id_p, code: 2, storeId: storeId});
            });
            if(ps.length>0){
                getallchildimg(ps, function (rs) {
                    if (rs.allImages != "") {
                        $.each(rs.images,function (key,vl) {
                            $('div.ivt[psid="'+ key +'"]').find('.product-thumbnail>a .second_img').attr('data-src',vl).attr('src',vl);
                        });
                    }
                });
            }
        }
    }else{
        $('#boxMenuLeft').mmenu();
    }
    function getIvtDepots(attrs,t) {
        AppAjax.post(
            '/product/child?childId=' + t.attr('data-selId'),
            {'attrs': attrs},
            function (rs) {
                if (rs.code == 1 && rs.data.available > 0) {
                    ajaxLoadView({
                        view: 'loadInventory&psId='+rs.data.id,
                        onSuccess: function (rs) {
                            $('.btn-showroom ul').html(rs);
                        }
                    });
                }else {
                    t.addClass('deactive').attr('title', msgOutofStock);
                    $('.btn-showroom ul').html('<div class="alert alert-warning">Sản phẩm đã tạm hết hàng!</div>');
                }
            },
            'json'
        );
    }

    var PositionZero = 0;
    $(window).scroll(function(e){
        // if($(window).width() <= 768) {
            var Pos = $(this).scrollTop();
            if (Pos > PositionZero || Pos==0 ){
                $('.header.tp_header').removeClass('fixed');
            } else {
                $('.header.tp_header').addClass('fixed');
            }
            PositionZero = Pos;
        // }
    });

    $('.search-overlay-menu-mobile').click(function () {
        $('.search__mobile').slideToggle();
    });

    $('.social-tab-button').click(function () {
        if($('.social-tab').hasClass('open')) {
            $('.social-tab').removeClass('open');
            $('.social-tab-button i').removeClass('spin');
        } else {
            $('.social-tab').addClass('open');
            $('.social-tab-button i').addClass('spin');
        }
    });

    $('.btn-dk').click(function (e) {
        e.preventDefault();
        AppAjax.post('/newsletter/subscribe', {'mail': $('.subFooter input[name = "contact[email]"]').val()},
            function (rs) {
                if (rs.code) {
                    alert(rs.message);
                    $('.subFooter input[name = "contact[email]"]').val('');
                }else{
                    alert(rs.message);
                }

            }
        );
    });


    $('.min-value-filter-search').on('input', function (e) {
        $('#price_form_input').attr('data-size',parseInt(e.target.value));
        $('#price_form_input').attr('value',parseInt(e.target.value));
        $('#price_form').attr('data-size',parseInt(e.target.value));
    })

    $('.max-value-filter-search').on('input', function (e) {
        $('#price_to_input').attr('data-size', parseInt(e.target.value));
        $('#price_to_input').attr('value', parseInt(e.target.value));
        $('#price_to').attr('data-size',parseInt(e.target.value));
    })

    $('.search-price-button').click(function () {
        $maxVal = $('#price_to_input').val();
        $minVal = $('#price_form_input').val();
        $maxValue = parseInt($('#price_to').attr('data-max'));
        if($maxVal > $maxValue) {
            $maxVal = parseInt($('#price_to').attr('data-max'));
        }
        if($minVal < 0) {
            $minVal = 0;
        }
        if ($minVal > $maxVal) {
            return false
        }

        $('#price_form').text($.number($minVal) + 'đ').attr('data-size',$minVal);
        $('#price_to').text($.number($maxVal) + 'đ').attr('data-size',$maxVal);
        window.location.href = addFilter('price', $minVal + ':'+$maxVal, 3);
    })

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
                $('#price_to_input').attr('data-size',ui.values[0]).attr('value', ui.values[0]);
                $('#price_form_input').attr('data-size',ui.values[1]).attr('value', ui.values[1]);
                window.location.href = addFilter('price', ui.values[0] + ':'+ui.values[1], 3);
            }
        });
    }

    $('.brand-filter').click(function () {
        document.location.href = $(this).attr('data-link')
    })

    $('.icon-dropdown i').click(function () {
        if($(this).hasClass('fa-angle-down')) {
            $(this).removeClass('fa-angle-down')
            $(this).addClass('fa-angle-up')
        } else {
            $(this).removeClass('fa-angle-up')
            $(this).addClass('fa-angle-down')
        }
    })

    $('.icon-dropdown.price-box i').click(function () {
        if($(this).hasClass('fa-angle-up')) {
            $('.price-filter-box').addClass('open')
        } else {
            $('.price-filter-box').removeClass('open')
        }
    })

    $('.icon-dropdown.color-box i').click(function () {
        if($(this).hasClass('fa-angle-up')) {
            $('.color-filter-box').addClass('open')
        } else {
            $('.color-filter-box').removeClass('open')
        }
    })

    $('.icon-dropdown.size-box i').click(function () {
        if($(this).hasClass('fa-angle-up')) {
            $('.size-filter-box').addClass('open')
        } else {
            $('.size-filter-box').removeClass('open')
        }
    })

    $('.icon-dropdown.brand-box i').click(function () {
        if($(this).hasClass('fa-angle-up')) {
            $('.brand-filter-box').addClass('open')
        } else {
            $('.brand-filter-box').removeClass('open')
        }
    })

    $('.icon-dropdown.cate-box i').click(function () {
        if($(this).hasClass('fa-angle-up')) {
            $('.cate-filter-box').addClass('open')
        } else {
            $('.cate-filter-box').removeClass('open')
        }
    })
    $("form.contact-form .btn").on('click', function() {
        AppAjax.post(
            '/contact/contacts',
            {
                'content' : $('#contactFormMessage ').val(),
                'name' : $('.form-group #contactFormName').val(),
                'email' : $('#contactFormEmail').val(),
                'mobile' : '.',
                'address' : '.'
            },
            function(rs){
                if (rs.code == 1) {
                    alert(rs.message);
                    window.location.href = '/lien-he';
                } else {
                    alert(rs.message);
                }
            }
        );
    });
});
