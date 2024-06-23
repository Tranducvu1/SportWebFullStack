var $storeId = $('.checkStoreId').val();

$(document).ready(function ($) {
    "use strict";
    awe_owl();
    awe_category();
    awe_menumobile();
    awe_tab();
});

if(in_array($storeId, [137493, 66])) {
    $('.news-section').after($('#promo'));
    // $('#promo').remove();
}

/********************************************************
 # SIDEBAR CATEOGRY
 ********************************************************/
function awe_category() {
    $('.nav-category .fa-angle-down').click(function (e) {
        $(this).parent().toggleClass('active');
    });
}

window.awe_category = awe_category;

/********************************************************
 # MENU MOBILE
 ********************************************************/
function awe_menumobile() {
    $('.menu-bar').click(function (e) {
        e.preventDefault();
        $('#nav').toggleClass('open');
    });
    $('#nav .fa').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().toggleClass('open');
    });
}

window.awe_menumobile = awe_menumobile;


/********************************************************
 # OWL CAROUSEL
 ********************************************************/
function awe_owl() {
    if (in_array($storeId, [43017])) {
        $('.brand-logo-carousel').owlCarousel({
            loop: false,
            autoPlay : true,
            lazyLoad:true,
            items :7,
            margin: 15,
            autoplay:true,
            smartSpeed: 3000,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            dots: false,
            responsive: {
                0: {
                    items: 2
                },
                250: {
                    items: 4
                },
                320: {
                    items: 4
                },
                480: {
                    items: 3
                },
                775: {
                    items: 4
                },
                991: {
                    items: 6
                },
                1170: {
                    items: 7
                }
            }
        });
    }
    $('.owl-carousel:not(.not-aweowl, .barScrollCategory-cus)').each(function () {
        var xss_item = $(this).attr('data-xss-items');
        var xs_item = $(this).attr('data-xs-items');
        var sm_item = $(this).attr('data-sm-items');
        var md_item = $(this).attr('data-md-items');
        var lg_item = $(this).attr('data-lg-items');
        var autoplay = $(this).attr('data-autoplay');
        var timeout = $(this).attr('data-timeout');
        var margin = $(this).attr('data-margin');
        var dot = $(this).attr('data-dot');
        var nav = $(this).attr('data-nav');
        var animateIn = $(this).attr('data-animateIn');
        var animateOut = $(this).attr('data-animateOut');
        var navTextPrev = $(this).attr('data-navTextPrev');
        var navTextNext = $(this).attr('data-navTextNext');
        if (typeof margin !== typeof undefined && margin !== false) {
        } else {
            margin = 30;
        }
        if (typeof xss_item !== typeof undefined && xss_item !== false) {
        } else {
            xss_item = 1;
        }
        if (typeof xs_item !== typeof undefined && xs_item !== false) {
        } else {
            xs_item = 1;
        }
        if (typeof sm_item !== typeof undefined && sm_item !== false) {

        } else {
            sm_item = 3;
        }
        if (typeof md_item !== typeof undefined && md_item !== false) {
        } else {
            md_item = 3;
        }
        if (typeof lg_item !== typeof undefined && lg_item !== false) {
        } else {
            lg_item = 4;
        }
        if (typeof dot !== typeof undefined && dot !== true) {
            dot = dot;
        } else {
            dot = false;
        }

        if (typeof autoplay !== typeof undefined && autoplay !== true) {
            autoplay;
        } else {
            autoplay = 3000;
        }
        if (typeof timeout !== typeof undefined && timeout > 0) {
            timeout;
        } else {
            timeout = 3000;
        }
        if (typeof nav !== typeof undefined && nav !== true) {
            nav = nav;
        } else {
            nav = false;
        }
        if (typeof animateIn !== typeof undefined && animateIn !== true) {
            animateIn = animateIn;
        } else {
            animateIn = '';
        }
        if (typeof animateOut !== typeof undefined && animateOut !== true) {
            animateOut = animateOut;
        } else {
            animateOut = '';
        }
        if (typeof navTextPrev !== typeof undefined && navTextPrev !== true) {
            navTextPrev = navTextPrev;
        } else {
            navTextPrev = '';
        }
        if (typeof navTextNext !== typeof undefined && navTextNext !== true) {
            navTextNext = navTextNext;
        } else {
            navTextNext = '';
        }
        if($storeId == 25426) {
            $(this).owlCarousel({
                animateIn: animateIn,
                animateOut: animateOut,
                loop: true,
                margin: Number(margin),
                responsiveClass: true,
                dots: dot,
                nav: nav,
                autoplay: autoplay,
                autoplayTimeout: timeout,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: Number(xss_item)
                    },
                    543: {
                        items: Number(xs_item)
                    },
                    768: {
                        items: Number(sm_item),
                        margin: 5
                    },
                    992: {
                        items: Number(md_item)
                    },
                    1200: {
                        items: Number(lg_item)
                    }
                }
            })
        }else if($storeId == 43438){
            $(this).owlCarousel({
                animateIn: animateIn,
                animateOut: animateOut,
                loop: true,
                margin: Number(margin),
                responsiveClass: true,
                dots: dot,
                nav: nav,
                autoplay: autoplay,
                autoplayTimeout: timeout,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    543: {
                        items: 2
                    },
                    768: {
                        items: 3,
                        margin: 5
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 4
                    }
                },
                navText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
            })
        } else if (in_array($storeId, [31158, 14593, 39888])) {
            $(this).owlCarousel({
                animateIn: animateIn,
                animateOut: animateOut,
                loop: false,
                margin: Number(margin),
                responsiveClass: true,
                dots: dot,
                nav: nav,
                autoplay: autoplay,
                autoplayTimeout: timeout,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: Number(xss_item)
                    },
                    543: {
                        items: Number(xs_item)
                    },
                    768: {
                        items: Number(sm_item),
                        margin: 5
                    },
                    992: {
                        items: Number(md_item)
                    },
                    1200: {
                        items: Number(lg_item)
                    }
                }
            })
        }else{
            if ($(window).width() > 767 ) {
                $(this).owlCarousel({
                    animateIn: animateIn,
                    animateOut: animateOut,
                    loop: true,
                    margin: Number(margin),
                    responsiveClass: true,
                    dots: dot,
                    nav: nav,
                    autoplay: autoplay,
                    autoplayTimeout: timeout,
                    autoplayHoverPause: true,
                    navText: [navTextPrev, navTextNext],
                    responsive: {
                        0: {
                            items: Number(xss_item)
                        },
                        543: {
                            items: Number(xs_item)
                        },
                        768: {
                            items: Number(sm_item),
                            margin: 5
                        },
                        992: {
                            items: Number(md_item)
                        },
                        1200: {
                            items: Number(lg_item)
                        }
                    }
                })
            }
        }

    })
}

window.awe_owl = awe_owl;


/********************************************************
 # TAB
 ********************************************************/
function awe_tab() {
    $(".e-tabs:not(.not-dqtab)").each(function () {
        $(this).find('.tabs-title li:first-child').addClass('current');
        $(this).find('.tab-content').first().addClass('current');

        $(this).find('.tabs-title li').click(function () {
            var tab_id = $(this).attr('data-tab');
            var url = $(this).attr('data-url');
            $(this).closest('.e-tabs').find('.tab-viewall').attr('href', url);
            $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
            $(this).closest('.e-tabs').find('.tab-content').removeClass('current');
            $(this).addClass('current');
            $(this).closest('.e-tabs').find("#" + tab_id).addClass('current');
        });
    });
}

window.awe_tab = awe_tab;

/********************************************************
 # Other
 ********************************************************/
$('.dropdown-toggle').click(function () {
    $(this).parent().toggleClass('open');
});
$('.btn-close').click(function () {
    $(this).parents('.dropdown').toggleClass('open');
});
$('body').click(function (event) {
    if (!$(event.target).closest('.dropdown').length) {
        $('.dropdown').removeClass('open');
    }
});

jQuery(document).ready(function ($) {
    $('#nav-mobile .fa').click(function (e) {
        e.preventDefault();
        $(this).parent().parent().toggleClass('open');
    });
    $('.menu-bar').click(function (e) {
        e.preventDefault();
        $('#nav-mobile').toggleClass('open');
    });

    $('.open-filters').click(function (e) {

        $(this).toggleClass('open');
        $('.dqdt-sidebar').toggleClass('open');
    });

    $('.inline-block.account-dr>a').click(function (e) {
        if ($(window).width() < 992) {
            e.preventDefault();

        }
    })

});

$(document).on('click', '.overlay, .close-popup, .btn-continue, .fancybox-close', function () {
    setTimeout(function () {
        $('.loading').removeClass('loaded-content');
    }, 500);
    return false;
});


!function (e) {
    "use strict";
    var i = e(window),
        a = e(document);
    var brdn = 2;
    if(in_array($storeId,[43017,8515])){
        brdn = 5;
    }
    e(function () {
        if(in_array($storeId,[31158,9570])){}else{
            e(".navigation-menu > ul > li:has( > ul)").addClass("menu-dropdown-icon"), e(".navigation-menu > ul > li.menu-dropdown-icon").append('<div class="dropworn-arrow"></div>'), e(".navigation-menu > ul > li > ul:not(:has(ul))").addClass("normal-sub"), e(".navigation-menu > ul").before('<a href="#boxMenuLeft" class="menu-mobile">Menu</a>');
            var a = e(".navigation-menu > ul > li"),
                t = e(".menu-mobile");
            a.on("mouseenter mouseleave", function (a) {
                i.width() > parseInt(979) && (e(this).children(".js-nav-dropdown").stop(!0, !1).fadeToggle(150), e(this).children(".dropworn-arrow").stop(!0, !1).fadeToggle(150), a.preventDefault())
            }), a.on("click", function () {
                i.width() <= parseInt(979) && (e(this).children(".js-nav-dropdown").fadeToggle(150), e(this).children(".dropworn-arrow").hide())
            }), t.on("click", function (i) {
                e(".navigation-menu > ul").toggleClass("show-on-mobile"), i.preventDefault()
            })
        }
    }),
        e(function () {
            if(!in_array($storeId,[43017,8515])) {
                !function (e) {
                    if (void 0 !== e) {
                        var a = e.offset().top,
                            t = i;
                        t.on("scroll", function () {
                            t.scrollTop() > a ? e.addClass("fixed") : e.removeClass("fixed")
                        })
                    }
                }(e("#header-sticky"))
            }
        }),
        i.bind("DOMContentLoaded load resize", function () {
            var a = e(".header").innerHeight();
            i.innerWidth() <= parseInt(979) ? (e("#header-sticky").addClass("no-stick"), e(".header").css("height", "auto")) : (e("#header-sticky").removeClass("no-stick"), e(".header").css("height", a))
        }), e(function () {
        var t = e(".sidebar-right"),
            s = e("#sidebar_toggle_btn"),
            o = e("#sidebar_close_icon"),
            n = e(".sidebar_overlay");
        e(".sidebar_overlay_active");
        if (s.on("click", function () {
                e(this).toggleClass("active"), t.toggleClass("sidebar-open"), n.toggleClass("sidebar_overlay_active")
            }), o.on("click", function () {
                s.removeClass("active"), t.removeClass("sidebar-open"), n.removeClass("sidebar_overlay_active")
            }), a.on("click touchstart", ".sidebar_overlay_active", function () {
                s.toggleClass("active"), t.toggleClass("sidebar-open"), n.toggleClass("sidebar_overlay_active")
            }), e(function () {
                var i = e(".search-overlay-menu-btn"),
                    a = e(".search-overlay-menu, .search-overlay-menu .search-overlay-close");
                i.on("click", function (i) {
                    e(".search-overlay-menu").addClass("open"), e('.search-overlay-menu > form > input[type="search"]').focus()
                }), a.on("click keyup", function (i) {
                    i.target != this && "search-overlay-close" != i.target.className && 27 != i.keyCode || e(this).removeClass("open")
                })
            }), e('a[data-toggle="tab"]').on("shown.bs.tab", function (i) {
                e(e(i.target).attr("href")).find(".owl-carousel").owlCarousel("invalidate", "width").owlCarousel("update")
            }), e(".slide-bg-image, .bg-image").each(function (i) {
                e(this).attr("data-background-img") && e(this).css("background-image", "url(" + e(this).data("background-img") + ")"), e(this).attr("data-bg-position-x") && e(this).css("background-position", e(this).data("bg-position-x"))
            }), i.width() > parseInt(979)) {
            var l = e("nlpopup").data("expires"),
                r = 1500 * e("nlpopup").data("delay"),
                d = function () {
                    var t = a.scrollTop(),
                        s = i.height(),
                        o = e("#nlpopup"),
                        n = t + Math.round(s / 2) - Math.round(o.outerHeight() / 2);
                    n <= 40 && (n = 40), o.css("top", n), e("#nlpopup, #nlpopup_overlay").fadeIn(500)
                };

        }
        e("ul.jq-accordian > li:has( > ul ) > a").append("<span class='jq-accordionIcon'></span>"), e("ul.jq-accordian > li:has( > ul ) > a").attr("href", "javascript:void(0)"), e("ul.jq-accordian li ul").hide();
        var c = e("ul.jq-accordian li a"),
            u = e("ul.jq-accordian > li > a");
        c.on("click", function (i) {
            c.each(function (i) {
                e(this).next().is("ul") && e(this).next().is(":visible") && e(this).next().slideUp()
            }), (i = e(i.target)).next().is("ul") && i.next().is(":visible") ? i.next().slideUp() : i.next().slideDown()
        }), c.on("click", function (i) {
            e(this).hasClass("is-active") ? e(this).removeClass("is-active") : (u.not(this).removeClass("is-active"), e(this).addClass("is-active"))
        }), e(function () {

        }), e(function () {

        }), e(".slide-toggle-btn").on("click", function (i) {
            e("#" + e(this).data("toggleTarget")).slideToggle(300)
        }), e(".fade-toggle-btn").on("click", function (i) {
            e("#" + e(this).data("toggleTarget")).fadeToggle(300)
        }), e(function () {
            var i = e(".quantity").attr("min"),
                a = e(".quantity").attr("max");
            e(".quantityPlus").on("click", function () {
                var i = parseInt(e(this).next(".quantity").val(), 10);
                e("p:first").text();
                i != a && e(this).next(".quantity").val(i + 1)
            }), e(".quantityMinus").on("click", function () {
                var a = parseInt(e(this).prev(".quantity").val(), 10);
                a != i && e(this).prev(".quantity").val(a - 1)
            })
        }), e(".color-selector .entry").on("click", function () {
            e(this).parent().find(".active").removeClass("active"), e(this).addClass("active")
        }), e(".size-selector .entry").on("click", function () {
            e(this).parent().find(".active").removeClass("active"), e(this).addClass("active")
        });
        var p = e(".product-list-switcher"),
            v = e(".product-grid-switcher"),
            m = e(".product-list-item");
        p.on("click", function (e) {
            e.preventDefault(), m.addClass("product-list-view"), p.addClass("product-view-icon-active"), v.removeClass("product-view-icon-active")
        }), v.on("click", function (e) {
            e.preventDefault(), m.removeClass("product-list-view"), p.removeClass("product-view-icon-active"), v.addClass("product-view-icon-active")
        })
    }), e(function () {
        e(".blog-carousel").owlCarousel({
            items: 4,
            loop: !1,
            margin: 30,
            autoplay: !1,
            autoplayHoverPause: !0,
            singleItem: !0,
            dots: !1,
            nav: !0,
            navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                775: {
                    items: 1
                },
                991: {
                    items: 2
                },
                1170: {
                    items: 2
                }
            }
        }), e(".brand-logo-carousel").owlCarousel({
            items: 7,
            loop: !0,
            margin: 0,
            autoplay: !0,
            autoplayHoverPause: !0,
            singleItem: !0,
            dots: !1,
            nav: !1,
            transitionStyle: !0,
            responsive: {
                0: {
                    items: 1
                },
                250: {
                    items: 1
                },
                320: {
                    items: brdn
                },
                480: {
                    items: 3
                },
                775: {
                    items: 4
                },
                991: {
                    items: 6
                },
                1170: {
                    items: 7
                }
            }
        }),e(".banner-home").owlCarousel({
            items:1,
            dots:false,
            nav:true,
            autoplay:true,
            loop:true
        });
        var i = e(".product-image-slider"),
            a = e(".product-image-slider-thumbnails");

    })
}(jQuery);

//Create tab
$(document).ready(function () {
    $(".not-dqtab").each(function () {
        $(this).find('.tabs-title li:first-child').addClass('current');
        $(this).find('.tab-content').first().addClass('current');

        $(this).find('.tabs-title li').click(function () {
            var tab_id = $(this).attr('data-tab');
            var url = $(this).attr('data-url');
            $(this).closest('.e-tabs').find('.tab-viewall').attr('href', url);
            $(this).closest('.e-tabs').find('.tabs-title li').removeClass('current');
            $(this).closest('.e-tabs').find('.tab-content').removeClass('current');
            $(this).addClass('current');
            $(this).closest('.e-tabs').find("#" + tab_id).addClass('current');
        });
    });
//Count tab
    var count = 0;
    $('.tab-content').each(function (e) {
        count += 1;
    });
    $('.not-dqtab .next').click(function (e) {
        var str = $('#tab-titlexx').attr('data-tab');
        var res = str.replace("tab-", "");
        res = Number(res);
        if (res < count) {
            var current = res + 1;
        } else {
            var current = 1;
        }
        action(current);
    });

    /* hiện thị danh mục con ở trang danh mục sp*/
    $('.sidebar-category .aside-content .nav-category > ul > li i').click(function (e) {
        $(this).toggleClass('active');
    })

    $('.not-dqtab .prev').click(function (e) {
        var str = $('#tab-titlexx').attr('data-tab');
        var res = str.replace("tab-", "");
        res = Number(res);
        if (res > 1) {
            var current = res - 1;
        } else {
            var current = count;
        }
        action(current);
    });
    var action = function (current) {
        $('#tab-titlexx').attr('data-tab', 'tab-' + current);
        var text = '';
        $('ul.tabs.tabs-title.clearfix.hidden-xs li').each(function (e) {
            if ($(this).attr('data-tab') == 'tab-' + current) {
                title = $(this).find('span').text();
            }
        });
        $('#tab-titlexx span').text(title);
        $('.not-dqtab').find("#tab-" + current).addClass('current');
    };

    $('.iWishAdd').click(function () {
        AppAjax.post(
            '/wishlist/add',
            {psId: $(this).attr('rel')},
            function (rs) {
                if (rs.code == 1) {
                    alert(rs.message);
                } else {
                    alert(rs.message);
                }
            },
            'json'
        );
    });

    $('.removeFav').click(function (e) {
        e.preventDefault();
        if (confirm(msgRemoveCartItem + ' ?') == true) {
            AppAjax.post(
                '/wishlist/remove',
                {psId: $(this).attr('rel')},
                function (rs) {
                    console.log(rs);
                    if (rs.code == 1) {
                        document.location.href = '/wishlist/view';
                    } else {
                        alert(rs.message);
                    }
                },
                'json'
            );
        }
    });

    /*---------------------search autocomplete--------------------------*/
    var search = $('form#searchform input[name="q"]');
    var s = $('#searchFolding');
    if (in_array($storeId, [43017, 8515]) && ($(window).width() > 768)) {
        search = $('form#searchform__desktop input[name="q"]');
        s = $('#searchFolding_desktop')
    }
    search.autocomplete({
        source: function () {
            s.slideDown();
            $.post('/search/suggestion?q=' + search.val() + '&limit=7&showMore=category',
                function (data) {
                    s.empty();
                    if (in_array($storeId, [43017, 8515])) {
                        if (data.categories) {
                            $.each(data.categories, function (i, c) {
                                s.append('<a href="/search?q=' + data.searchOptions.q + '&category=' + c.id + '">' + data.searchOptions.q + '<i>' + txtInCategory + ': <b>' + c.name + '</b></i></a>');
                            });
                        }
                        if (data.products) {
                            $.each(data.products, function (i, p) {
                                s.append('<a href="' + p.viewLink + '"><div class="image_search"><img src="' + p.image + '"></div>' + p.name + '<span>Giá: <b>' + $.number(p.price) + 'đ</b></span></a>');
                            });
                        }
                    } else {
                        if (data.products) {
                            $.each(data.products, function (i, p) {

                                if (in_array($storeId, [76941])) {
                                    s.append('<a href="' + p.viewLink + '">' +
                                        '<div class="item_image"><img src="' + p.image + '"></div>' + '<div class="item_detail"><div class="item_title"><h4>' + p.name + '</h4></div>' + '<div class="item_price"><span>' + $.number(p.price) + 'đ</span><del>' + $.number(p.oldPrice) + 'đ</del></div></div></a>');
                                } else if ($storeId == 31909) {
                                    s.append('<a href="' + p.viewLink + '">' + p.name + '<span>Giá: <b>' + $.number(p.price) + 'đ</b></span></a>');
                                } else {
                                    s.append('<a href="' + p.viewLink + '">' + p.name + '</a>');
                                }
                            });
                        }
                    }
                }
            );
        }
    });
    var searchF = !jQuery('#searchFolding a').click;
    if (in_array($storeId, [43017, 8515]) && ($(window).width() > 768)) {
        searchF = !jQuery('#searchFolding_desktop a').click;
    }
    search.keyup(function () {
        if (!$(this).val().length) {
            s.slideUp();
        }
    }).focus(function () {
        if ($(this).val().length) {
            s.slideDown();
        } else {
            $(this).attr('placeholder', 'Tìm...');
        }
    }).focusout(function () {
        if (searchF) {
            if (!$(this).val().length) {
                $(this).attr('placeholder', msgSearchProduct).val('');
            }
            s.slideUp();
        }
    });
    $('.hide_qc').click(function () {
        $('.float-ck').css('right', '-' + $('.float-ck').width() + 'px');
        $('.float-ck').find('.show_qc').show();
        $('.float-ck').find('.hide_qc').hide();
    });
    $('.show_qc').click(function () {
        $('.float-ck').css('right', '0');
        $('.float-ck').find('.show_qc').hide();
        $('.float-ck').find('.hide_qc').show();
    });
    $('.quick-buy-cart').click(function (e) {
        e.preventDefault();
        var products = [], ps = {};
        ps['id'] = $(this).attr('data-id');
        ps['quantity'] = 1;
        products.push(ps);
        addToCart(products, 1, function (rs) {
            if (rs.status == 1) {
                window.location.href = "/cart";
            } else {
                alert(rs.messages)
            }
        });
    })
    if ($('.banner-home').length) {
        if (in_array($storeId, [55914])) {
            if ($(window).width() < 1023) {
                $('.banner-home').addClass('container');
            }
        }
    }
    if (in_array($storeId, [8515, 3022])) {
        $(document).ready(function () {
            setTimeout(function () {
                $('.custom-order-popup:first').addClass('show');
            }, 5000);
            setInterval(function () {
                if ($('.custom-order-popup:last').hasClass('show')) {
                    next = $('.custom-order-popup:first')
                } else {
                    next = $('.custom-order-popup.show').next()
                }
                $('.custom-order-popup.show').removeClass('show');
                setTimeout(function () {
                    next.addClass('show');
                }, 5000)
            }, 10000);
        })
        $('.cop-close').click(function (){
            $('.custom-order-popup.show').removeClass('show');
        })
    }
})

//hover-color
$(document).ready(function (){
    $(".color-item").hover(function () {
        var t = $(this);
        $(".color-item").removeClass('hover-color');
        $(this).addClass('hover-color');
        var img = $(this).children().attr('src');
        var oldImg = $(this).parent().parent().parent().parent().parent().parent().prev().find(' a img:first-child').attr('src');
        $(this).parent().parent().parent().parent().parent().parent().prev().find(' a img:first-child').attr('src', img).attr('data-old-src', oldImg);
    });

    var barScrollCategory = $('.barScrollCategory-cus')
    if (barScrollCategory.length) {
        barScrollCategory.owlCarousel({
            loop: false,
            items: 3,
            nav: true,
            dots: false,
            mouseDrag: true,
            autoplay: false,
            margin: 30,
            navText: ['<i class="fas fa-long-arrow-alt-left"></i>',
                '<i class="fas fa-long-arrow-alt-right"></i>'],
            responsive: {
                0: {
                    margin: 10,
                },
                576: {
                    margin: 20,
                },
                992: {
                    margin: 30,
                },
            }
        })
    }
    var maxWidthMaque = 200;
    if ($('.barScrollCategory-cus .item').length) {
        $('.barScrollCategory-cus .item').each(function () {
            if ($(this).width() >= (maxWidthMaque - 20)) {
                $(this).addClass('activeMq')
            }
        })
    }
})