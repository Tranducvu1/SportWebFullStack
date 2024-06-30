$(document).ready(function() {
    ajaxGet(1);    
    // do get
    function ajaxGet(page) {
        var offset = (page - 1); 
        if(offset < 0){
            offset =0;
        }
        var pageSize = 10;
        // prepare data
        var data = $('#searchForm').serialize();    
        $.ajax({
            type: "GET",        
            data: data,
            contentType : "application/json",
            url: "http://localhost:4444/api/banner/pagination/" + offset + "/" + pageSize,
            success: function(result){
                console.log("Dữ liệu phân trang:", offset, pageSize);
                $.each(result.content, function(i, banner){
                    var sanPhamRow = '<tr>' +
                        '<td>' + banner.id + '</td>' +
                        '<td>' + '<img src="' + banner.hinhanh + '" class="img-responsive" style="height: 50px; width: 50px" />' +'</td>'+
                        '<td>' + banner.mota + '</td>' +
                        '<td width="0%"><input type="hidden" id="bannerID" value="' + banner.id + '"></td>' +
                        '<td><button class="btn btn-warning btnChiTiet" style="margin-right: 6px">Chi tiết</button>' +
                        '<a href="/admin/update/banner/' + banner.id + '" class="btn btn-primary">Cập nhật</a>' +
                        '<button class="btn btn-danger btnXoaSanPham">Xóa</button></td>' +
                        '</tr>';
                    $('.bannerTable tbody').append(sanPhamRow);
                });
                $('.pagination').empty();
                
                if(result.totalPages > 1 ){
                    for(var numberPage = 1; numberPage <= result.totalPages; numberPage++) {
                        var li = '<li class="page-item "><a class="pageNumber">'+numberPage+'</a></li>';
                        $('.pagination').append(li);
                    };
                    
                    // active page pagination
                    $(".pageNumber").each(function(index){    
                        if($(this).text() == page){
                            $(this).parent().removeClass().addClass("page-item active");
                        }
                    });
                };
            },
            error : function(e){
                alert("Error: ", e);
                console.log("Error", e);
            }
        });
    };
    
    // event khi click vào dropdown chọn danh mục thêm sản phẩm
    $('#danhMucDropdown').mouseup(function() {
        console.log("ehhhehehehe");
        var open = $(this).data("isopen");
        if (open) {
            $('.lapTopModal').modal('show');
            $("#idDanhMucLaptop").val($(this).val());
            $('#SportForm').removeClass().addClass("addLapTopForm");
            $('#SportForm #btnSubmit').removeClass().addClass("btn btn-primary btnSaveLapTopForm");
            console.log(open)
            // $(".modal-title").text("Thêm mới sản phẩm danh mục "+ label);
        }
        $(this).data("isopen", !open);
        console.log(open)
    });

    $(document).on('click', '#btnDuyetSanPham', function (event) {
        event.preventDefault();
        $('.bannerTable tbody tr').remove();
        $('.pagination li').remove();
        ajaxGet(1);
    });

    // event khi ẩn modal form
    $('.lapTopModal, .otherModal').on('hidden.bs.modal', function(e) {
        e.preventDefault();
        $("#idDanhMucLaptop, #idDanhMucKhac").val("");
        $("#idSanPhamLapTop, #idSanPhamKhac").val("");
        $('#SportForm').removeClass().addClass("SportForm");
        $('#SportForm #btnSubmit').removeClass().addClass("btn btn-primary");
        $('#SportForm').trigger("reset");
        $('#otherForm').removeClass().addClass("otherForm");
        $('#otherForm #btnSubmit').removeClass().addClass("btn btn-primary");
        $('#otherForm').trigger("reset");
        $('input, textarea').next().remove();
    });

    // btn Save Form Laptop Event
    $(document).on('click', '.btnSaveLapTopForm', function (event) {
        event.preventDefault();
        ajaxPostLapTop();
        resetData();
    });

    function ajaxPostLapTop() {
        var formData = new FormData($('#SportForm')[0]); // Sử dụng biến formData như bạn đã khởi tạo từ form
        var file = $('input[type=file]')[0].files[0]; // Lấy file từ input

        formData.append('hinhanh', file);

        // Đoạn code dưới đây để log FormData khi nó đã sẵn sàng
        console.log('FormData before sending:');
        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        // do post
        $.ajax({
            url: 'http://localhost:4444/api/mathang',
            type: 'POST',
            enctype: 'application/json',
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            timeout: 600000,
            success: function(response) {
                alert(response)
                if(response.status == "success"){
                    $('.lapTopModal').modal('hide');
                    alert("Thêm thành công");
                } else {
                    $('input, textarea').next().remove();
                    $.each(response.errorMessages, function(key, value){
                        if(key != "id"){
                            $('input[name='+ key +']').after('<span class="error">'+value+'</span>');
                            $('textarea[name='+ key +']').after('<span class="error">'+value+'</span>');
                        };
                    });
                }
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        }); 
    }

    // btnSaveOtherForm event click
    $(document).on('click', '.btnSaveOtherForm', function (event) {
        event.preventDefault();
        ajaxPostOther();
        resetData();
    });

    function ajaxPostOther() {
        // PREPATEE DATA
        var form = $('.addOtherForm')[0];     
        var data = new FormData(form);      
        // do post
        $.ajax({
            async:false,
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/laptopshop/api/san-pham/save",
            enctype: 'multipart/form-data',
            data: data,
            // prevent jQuery from automatically transforming the data into a query string
            processData: false,
            contentType: false,
            cache: false,
            timeout: 1000000,
            success: function(response) {
                if(response.status == "success"){
                    $('.otherModal').modal('hide');
                    alert("Thêm thành công");
                } else {
                    $('input, textarea').next().remove();
                    $.each(response.errorMessages, function(key, value){
                        if(key != "id"){
                            $('input[name='+ key +']').after('<span class="error">'+value+'</span>');
                            $('textarea[name='+ key +']').after('<span class="error">'+value+'</span>');
                        };
                    });
                }
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        }); 
    }

    // click cập nhật button 
    // vs danh mục laptop
    $(document).on("click", ".btnCapNhatLapTop", function(event){
        event.preventDefault();
        var bannerId = $(this).parent().prev().children().val();    
        $('#lapTopForm').removeClass().addClass("updateLaptopForm");
        $('#lapTopForm #btnSubmit').removeClass().addClass("btn btn-primary btnUpdateLaptopForm");
        var href = "http://localhost:4444/api/banner/find/"+bannerId;
        $.get(href, function(mathang) {
            populate('.updateLaptopForm', banner);
            $("#idDanhMucLaptop").val(banner.id);
            var hangSXId = mathang.hangSanXuat.id;
            $("#nhaSXId").val(hangSXId);    
        });
        
        removeElementsByClass("error");        
        $('.updateLaptopForm .lapTopModal').modal();
    });

    // btn update Laptop form Event
    $(document).on('click', '.btnUpdateLaptopForm', function (event) {
        event.preventDefault();
        ajaxPutLapTop();
        resetData();
    });

    function ajaxPutLapTop() {
        var form = $('.updateLaptopForm')[0];     
        var data = new FormData(form);
        console.log(data);
        // do post
        $.ajax({
            async:false,
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/laptopshop/api/san-pham/save",
            enctype: 'multipart/form-data',
            data: data,
            // prevent jQuery from automatically transforming the data into a query string
            processData: false,
            contentType: false,
            cache: false,
            timeout: 1000000,
            success: function(response) {
                if(response.status == "success"){
                    $('.updateLaptopForm .lapTopModal').modal('hide');
                    alert("Cập nhật thành công");
                } else {
                    $('input, textarea').next().remove();
                    $.each(response.errorMessages, function(key, value){
                        if(key != "id"){
                            $('input[name='+ key +']').after('<span class="error">'+value+'</span>');
                            $('textarea[name='+ key +']').after('<span class="error">'+value+'</span>');
                        };
                    });
                }
            },
            error: function(e) {
                alert("Error!")
                console.log("ERROR: ", e);
            }
        }); 
    }

    // event click Xóa sản phẩm
    $(document).on("click", ".btnXoaSanPham", function() {
        event.preventDefault();
        var bannerId = $(this).parent().prev().children().val();
        var workingObject = $(this);
        var confirmation = confirm("Bạn chắc chắn xóa sản phẩm này ?");
        if(confirmation){
            $.ajax({
                type : "DELETE",
                url : "http://localhost:4444/api/banner/delete/" + bannerId,
                success: function(resultMsg){
                    resetData();
                    alert("Xóa thành công");
                },
                error : function(e) {
                    alert("Xóa không thành công");
                    console.log("ERROR: ", e);
                }
            });
        }
    });

    // reset table after post, put
    function resetData() {
        var page = $('li.active').children().text();
        $('.bannerTable tbody tr').remove();
        $('.pagination li').remove();
        ajaxGet(page);
    }

    function populate(frm, data) {
        $.each(data, function(key, value){
            $('[name='+key+']', frm).val(value);
        });
    }

    function removeElementsByClass(className){
        var elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
});
