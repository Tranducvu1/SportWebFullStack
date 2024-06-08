
$(function () {
    $('.slider-collection-store').owlCarousel({
        autoPlay : true,
        loop: true,
        lazyLoad:true,
        items :1,
        itemsDesktop : [960,1],
        itemsDesktopSmall : [960,1],
        itemsTablet: [768,1],
        itemsMobile : [479,1],
        slideSpeed : 500,
        paginationSpeed : 500,
        rewindSpeed : 500,
        navigation : false,
        stopOnHover : false,
        pagination : true,
        scrollPerPage:false
    });
    var locations = $.parseJSON($('#locations').val());
    if($('.checkCityId').length){
        var dataLat = $('.storeSelect :selected').attr('data-lat');
        var dataLong = $('.storeSelect :selected').attr('data-long');
    }else{
        var dataLat = 21.0088151;
        var dataLong = 105.8374346;
    }
    var mapOptions = {
        zoom: 10, center: new google.maps.LatLng(dataLat, dataLong)
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var infowindowShow = new google.maps.InfoWindow();
    $('.storeSelect').change(function () {
        window.history.pushState(null, null, '/he-thong-cua-hang?'+$(this).val());
        showStore($(this).attr('data-value'), $('#storeId').val());
        $('.urlDepot').val('/he-thong-cua-hang?'+$(this).val());
        if($('.mapStore').length){
            $('.mapslist1').hide();
        }
    });


    $(document).on("click", ".list-store ul li" , function() {
        var regex = new RegExp($(this).attr('data-depotId'), "i");
        var output = '<div class="row mapStore">';
        $.each(locations, function(key, val){
            if ((val.id.search(regex) != -1)) {
                output += '<div class="col-sm-4 mapslist1">';
                output += '<img class="img-responsive" src="'+val.img+'" alt="'+ val.name +'" />';
                output += '</div>';
                output += ' <div class="col-sm-6 mapslist1">';
                output += '<div class="listAgency">';
                output += ' <h2>Thông tin liên hệ</h2>';
                output += '<span><b>Địa chỉ: </b>' + val.address + '</span>';
                output += '<span><b>Điện thoại: </b>' + val.phone + '</span>';
                output += '<span><b>Địa chỉ email: </b>' + val.email + '</span><br/>';
                output += '<h2>Thời gian hoạt động</h2>';
                output += '<p>' + $('.timeWork').val() + '</p> <br/>';
                output += '<p>Tham khảo nếu chưa biết đường đi: </p>';
                output += '</div>';
                output += '</div>';
                output += '<div class="col-lg-10 col-md-10 col-xs-10 col-sm-10" style="margin-top: 20px">';
                output += '<div id="map"></div>';
                if(val.content != null){
                    output += '<div class="mapslist1">' + val.content+ '</div>';
                }
                output += '</div>';
            }
        });
        output += '</div>';
        $('.mapDetails').html(output);
        var mapOptions2 = {
            zoom: 15, center: new google.maps.LatLng($(this).attr('data-lat'),  $(this).attr('data-long'))
        };
        var maps = new google.maps.Map(document.getElementById('map'), mapOptions2);
        var latlng = new google.maps.LatLng($(this).attr('data-lat'), $(this).attr('data-long'));
        maps.panTo(latlng);
        var contentString = '<h3>' + $(this).attr('data-name') + '</h3><p>' + $(this).attr('data-address') + '</p>';
        infowindowShow.setContent(contentString);
        infowindowShow.setPosition(latlng);
        infowindowShow.setOptions({pixelOffset: new google.maps.Size(0, 30)});
        infowindowShow.open(maps);

        $("#map").css("height", 510);

        var url = new URL(document.URL);
        var query_string = url.search;
        var search_params = new URLSearchParams(query_string);
        search_params.set('depotId', $(this).attr('data-depotId'));
        url.search = search_params.toString();

        var new_url = url.toString();


        window.history.pushState(null, null, new_url);
        setMarkers(map, locations);
    });
    setMarkers(map, locations);
});
$(window).on('load', function() {
    var locations = $.parseJSON($('#locations').val());
    var cityId=$.urlParam('cityId'), storeId=$('#storeId').val();
    var infowindowShow = new google.maps.InfoWindow();
    if($.urlParam('depotId') !== undefined && $.urlParam('depotId') > 0){
        var dataLat = '';
        var dataLong = '';
        var dataName = '';
        var dataAddress = '';
        var regex = new RegExp($.urlParam('depotId'), "i");
        $('.centerMap .mapDetails').empty();
        var output = '<div class="row mapStore">';
        $.each(locations, function(key, val){;
            if ((val.id.search(regex) != -1)) {
                output += ' <div class="col-sm-4 mapslist1">';
                output += '<img class="img-responsive" src="'+val.img+'" alt="'+ val.name +'" />';
                output += '</div>';
                output += ' <div class="col-sm-6 mapslist1">';
                output += '<div class="listAgency">';
                output += ' <h2>Thông tin liên hệ</h2>';
                output += '<span><b>Địa chỉ: </b>' + val.address + '</span>';
                output += '<span><b>Điện thoại: </b>' + val.phone + '</span>';
                output += '<span><b>Địa chỉ email: </b>' + val.email + '</span><br/>';
                output += '<h2>Thời gian hoạt động</h2>';
                output += '<p>' + $('.timeWork').val() + '</p> <br/>';
                output += '<p>Tham khảo nếu chưa biết đường đi: </p>';
                output += '</div>';
                output += '</div>';
                output += '<div class="col-lg-10 col-md-10 col-xs-10 col-sm-10" style="margin-top: 20px; margin-bottom: `20px">';
                output += '<div id="map"></div>';
                if(val.content != null){
                    output += '<div>' + val.content+ '</div>';
                }
                output += '</div>';
                dataLat = val.lat;
                dataLong = val.lng;
                dataName = val.name;
                dataAddress = val.address;
            }
        });
        output += '</div>';
        $('.mapDetails').html(output);
        var mapOptionsLoad = {
            zoom: 18, center: new google.maps.LatLng(dataLat, dataLong)
        };

        var mapLoad = new google.maps.Map(document.getElementById('map'), mapOptionsLoad);
        var latlng = new google.maps.LatLng(dataLat, dataLong);
        mapLoad.panTo(latlng);
        var contentString = '<h3>' + dataName + '</h3><p>' + dataAddress + '</p>';
        infowindowShow.setContent(contentString);
        infowindowShow.setPosition(latlng);
        infowindowShow.setOptions({pixelOffset: new google.maps.Size(0, 30)});
        infowindowShow.open(mapLoad);

        $("#map").css("height", 510);
    }
    if($.urlParam('cityId') !== undefined && $.urlParam('cityId') > 0){
        showStore (cityId, storeId);
    }
})
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results == null){
        return 0;
    }else{
        return results[1] || 0;
    }
}
function showStore (cityId, storeId) {
    const cId = cityId != undefined && cityId ? cityId : $.urlParam('cityId');
    if (cId) {
        AppAjax.post('/agency/agencystore',
            {
                cityId: cId,
                storeId: storeId,
            },
            function (rs) {
                $(".list-store .all-submenu-1").empty();
                if(rs.length){
                    var inner="";
                    for(var i = 0; i < rs.length; i++) {
                        var obj = rs[i];
                        inner +=
                            "<li data-depotId='"+obj.id+"' class='sub-item1' data-name='"+obj.name+"' rel='"+i+"' data-address='"+obj.address+"' data-lat='"+obj.latitude+"' data-long='"+obj.longitude+"'>" +
                            "<a class='btn'><b>"+obj.name+": </b>"+obj.address+"</a>";
                        inner +="</li>";
                    }
                    $(".list-store .all-submenu-1").append(inner);
                    var cityLat = $('.all-submenu-1 li:first-child').attr('data-lat');
                    var cityLong = $('.all-submenu-1 li:first-child').attr('data-long');
                    var cityName = $('.all-submenu-1 li:first-child').attr('data-name');
                    var cityAddress = $('.all-submenu-1 li:first-child').attr('data-address');
                    var mapOptionsCity = {
                        zoom: 15, center: new google.maps.LatLng(cityLat, cityLong)
                    };
                    var mapCity = new google.maps.Map(document.getElementById('map'), mapOptionsCity);

                    var latlng = new google.maps.LatLng(cityLat, cityLong);
                    mapCity.panTo(latlng);
                    var contentString = '<h3>' + cityName + '</h3><p>' + cityAddress + '</p>';
                    var infowindow = new google.maps.InfoWindow();
                    infowindow.setContent(contentString);
                    infowindow.setPosition(latlng);
                    infowindow.setOptions({pixelOffset: new google.maps.Size(0, 30)});
                    infowindow.open(mapCity);

                    $("#map").css("height", 510);
                    setMarkers(mapCity, locations);
                }else{
                    $(".list-store .all-submenu-1").append('<li style="background: none"><a class="btn"><span style="display: block;text-align: center; font-weight: normal">Chưa có cửa hàng nào !!!</span></a></li>');
                }
            }
        );

    }
}
function setMarkers(map, locations) {

    for (var i = 0; i < locations.length; i++) {
        var location = locations[i];
        var latlng = new google.maps.LatLng(location.lat, location.lng);
        var marker = new google.maps.Marker({
            id: i + 1,
            position: latlng,
            map: map,
            // icon: getIcon(i + 1),
            // icon: getIcon,
            title: location.name,
            content: '<h3>' + location.name + '</h3><p>' + location.address + '</p>'
        });
        // variable[i] = marker;
        google.maps.event.addListener(marker, 'mouseover', function () {
            setInfoWindow(this);
        });
    }
}
function setInfoWindow(marker) {
    var infowindow = new google.maps.InfoWindow();
    infowindow.close();
    infowindow.setContent(marker.content);
    infowindow.setOptions({pixelOffset: new google.maps.Size(0, 0)});
    infowindow.open(marker.map, marker);
}
function getIcon() {
    return {
        url: '/tp/T0012/img/maps/iconMarker.png',
        // This marker is 20 pixels wide by 32 pixels tall.
        size: new google.maps.Size(29, 42),
        // The origin for this image is 0,0.
        origin: new google.maps.Point(0, 0),
        // The anchor for this image is the base of the flagpole at 0,32.
        anchor: new google.maps.Point(14, 42)
    };
}


