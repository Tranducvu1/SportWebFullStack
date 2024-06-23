$(document).ready(function() {
	ajaxGet(1);	
	// do get
	function ajaxGet(page) {
    var offset = (page - 1); 
    var pageSize = 10;
		// prepare data
   	    var data = $('#searchForm').serialize();	
		$.ajax({
			type: "GET",		
			data: data,
			contentType : "application/json",
			url: "http://localhost:4444/api/mathang/pagination/" + offset + "/" + pageSize,
			success: function(result){
				 console.log("Dữ liệu phân trang:",offset, pageSize);
				$.each(result.content, function(i, mathang){
					var sanPhamRow = '<tr>' +
										'<td>' + mathang.id + '</td>' +
									  '<td>' + mathang.tenmathang + '</td>' +
									  '<td>' + mathang.dongia + '</td>' +
									   '<td>' + mathang.soluong + '</td>' +
									   '<td>' + '<img src="' + mathang.hinhanh + '" class="img-responsive" style="height: 50px; width: 50px" />' +'</td>'+
					                  '<td>' + mathang.gender + '</td>' +
					                  '<td>' + mathang.size + '</td>' +
					                  '<td>' + mathang.gender + '</td>' +
					             	   '<td>' + mathang.giamgia + '</td>' +	
					                   '<td width="0%"><input type="hidden" id="sanPhamId" value="' + mathang.id + '"></td>' +
                                              '<td><button class="btn btn-warning btnChiTiet" style="margin-right: 6px">Chi tiết</button>' +
												'<a href="/admin/products/update/' + mathang.id + '" class="btn btn-primary">Cập nhật</a>' +
                                              '<td><button class="btn btn-danger btnXoaSanPham">Xóa</button></td>' +
                                              '</tr>';
					$('.sanPhamTable tbody').append(sanPhamRow);
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
				alert("Error: ",e);
				console.log("Error" , e );
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
    	$('.sanPhamTable tbody tr').remove();
    	$('.pagination li').remove();
    	ajaxGet(1);
        
    });
    $('.sanPhamTable').on('click', '.btnCapNhat', function() {
                var sanPhamId = $(this).closest('tr').find('#sanPhamId').val(); // Lấy ID của sản phẩm từ input hidden

                // Đối tượng dữ liệu để gửi đi (có thể cần thêm các trường dữ liệu cần cập nhật)
                var updatedData = {
                    id: sanPhamId,
                    // Các trường dữ liệu khác mà bạn muốn cập nhật, nếu có
                };

                // Gọi API PUT để cập nhật sản phẩm
                $.ajax({
                    type: 'PUT',
                    url: '/api/mathang/update/' + sanPhamId,
                    contentType: 'application/json',
                    data: JSON.stringify(updatedData), // Chuyển đổi dữ liệu sang JSON
                    success: function(response) {
                        alert('Cập nhật thành công');
                        // Cập nhật lại giao diện sau khi cập nhật thành công (nếu cần)
                        // Ví dụ: Cập nhật lại các thông tin trong dòng sản phẩm
                        var sanPhamRow = '<tr>' +
                            '<td>' + response.tenmathang + '</td>' +
                            '<td>' + response.dongia + '</td>' +
                            '<td>' + response.soluong + '</td>' +
                            '<td>' + '<img src="/websport/img/' + response.id + '.png" class="img-responsive" style="height: 50px; width: 50px" />' + '</td>' +
                            '<td>' + response.gender + '</td>' +
                            '<td>' + response.size + '</td>' +
                            '<td>' + response.giamgia + '</td>' +
                            '<td width="0%">' + '<input type="hidden" id="sanPhamId" value=' + response.id + '>' + '</td>' +
                            '<td> <button class="btn btn-warning btnChiTiet" style="margin-right: 6px">Chi tiết</button>';

                        sanPhamRow += (response.checkTenDanhMuc != -1) ? '<button class="btn btn-primary btnCapNhatLapTop" >Cập nhật</button>' : '<button class="btn btn-primary btnCapNhatOther" >Cập nhật</button>';
                        sanPhamRow += '  <button class="btn -danger btnXoaSanPham">Xóa</button></td>' + '</tr>';
                        // Thay thế dòng sản phẩm cũ bằng dòng sản phẩm mới cập nhật
                        $(this).closest('tr').replaceWith(sanPhamRow);
                    },
                    error: function(xhr, status, error) {
                        console.error('Lỗi khi cập nhật sản phẩm', error);
                        alert('Cập nhật thất bại');
                    }
                });
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
 	        
 	        
 	        
 			success : function(response) {
				alert(response)
 				if(response.status == "success"){
 					$('.lapTopModal').modal('hide');
 					alert("Thêm thành công");
 				} else {
 			    	$('input, textarea').next().remove();
 		            $.each(response.errorMessages, function(key,value){
 		            	if(key != "id"){
 		   	                $('input[name='+ key +']').after('<span class="error">'+value+'</span>');
 		   	                $('textarea[name='+ key +']').after('<span class="error">'+value+'</span>');
 		            	};
 		              });
 				}
 		    	
 			},
 			error : function(e) {
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
 			type : "POST",
 			contentType : "application/json",
 			url : "http://localhost:8080/laptopshop/api/san-pham/save",
 			enctype: 'multipart/form-data',
 			data : data,
 			
 		    // prevent jQuery from automatically transforming the data into a
			// query string
 	        processData: false,
 	        contentType: false,
 	        cache: false,
 	        timeout: 1000000,
 	        
 			success : function(response) {
 				if(response.status == "success"){
 					$('.otherModal').modal('hide');
 					alert("Thêm thành công");
 				} else {
 					$('input, textarea').next().remove();
 		            $.each(response.errorMessages, function(key,value){
 		            	if(key != "id"){
 		   	                $('input[name='+ key +']').after('<span class="error">'+value+'</span>');
 		   	                $('textarea[name='+ key +']').after('<span class="error">'+value+'</span>');
 		            	};
 		              });
 				}
 		    	
 			},
 			error : function(e) {
 				alert("Error!")
 				console.log("ERROR: ", e);
 			}
 		}); 
    }
    
    
    // click cập nhật button 
    // vs danh mục laptop
    $(document).on("click",".btnCapNhatLapTop", function(event){
		event.preventDefault();
		var sanPhamId = $(this).parent().prev().children().val();	
		$('#lapTopForm').removeClass().addClass("updateLaptopForm");
		$('#lapTopForm #btnSubmit').removeClass().addClass("btn btn-primary btnUpdateLaptopForm");
		var href = "http://localhost:4444/api/mathang/"+sanPhamId;
		$.get(href, function(mathang) {
			populate('.updateLaptopForm', mathang);
			$("#idDanhMucLaptop").val(mathang.danhMuc.id);
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
			type : "POST",
			contentType : "application/json",
			url : "http://localhost:8080/laptopshop/api/san-pham/save",
			enctype: 'multipart/form-data',
			data : data,
			
		    // prevent jQuery from automatically transforming the data into a
		// query string
	        processData: false,
	        contentType: false,
	        cache: false,
	        timeout: 1000000,
	        
			success : function(response) {
				if(response.status == "success"){
					$('.lapTopModal').modal('hide');
					alert("Cập nhật thành công");
				} else {
			    	$('input, textarea').next().remove();
		            	if(key != "id"){
 		   	                $('input[name='+ key +']').after('<span class="error">'+value+'</span>');
 		   	                $('textarea[name='+ key +']').after('<span class="error">'+value+'</span>');
 		            	};
				}
		    	
			},
			error : function(e) {
				alert("Error!")
				console.log("ERROR: ", e);
			}
		}); 
    }
    
    
    // với danh mục khác
    $(document).on("click",".btnCapNhatOther", function(event){
		event.preventDefault();
		var sanPhamId = $(this).parent().prev().children().val();		
		$('#otherForm').removeClass().addClass("updateOtherForm");
		$('#otherForm #btnSubmit').removeClass().addClass("btn btn-primary btnUpdateOtherForm");
	
		var href = "http://localhost:8080/laptopshop/api/san-pham/"+sanPhamId;
		$.get(href, function(sanPham) {
			populate('.updateOtherForm', sanPham);
			$("#idDanhMucKhac").val(sanPham.danhMuc.id);
			var hangSXId = sanPham.hangSanXuat.id;
			$("#nhaSXIdKhac").val(hangSXId);	
		});		
		removeElementsByClass("error");		
		$('.updateOtherForm .otherModal').modal();
	});
    
    // btnUpdateOtherForm event click
    $(document).on('click', '.btnUpdateOtherForm', function (event) {
    	event.preventDefault();
	    ajaxPutOther();
		resetData();
    });
 
    function ajaxPutOther() {
    	// PREPARE DATA
   	     var form = $('.updateOtherForm')[0];   	 
	     var data = new FormData(form);  	
    	 // do put
    	 $.ajax({
      		async:false,
  			type : "POST",
  			contentType : "application/json",
  			url : "http://localhost:4444/api/mathang/save",
  			enctype: 'multipart/form-data',
  			data : data,
  			
  		    // prevent jQuery from automatically transforming the data into a
 			// query string
  	        processData: false,
  	        contentType: false,
  	        cache: false,
  	        timeout: 1000000,
  	        
  			success : function(response) {
  				if(response.status == "success"){
  					$('.otherModal').modal('hide');
  					alert("Cập nhật thành công");
  				} else {
  					$('input, textarea').next().remove();
  		            $.each(response.errorMessages, function(key,value){
 		            	if(key != "id"){
 		   	                $('input[name='+ key +']').after('<span class="error">'+value+'</span>');
 		   	                $('textarea[name='+ key +']').after('<span class="error">'+value+'</span>');
 		            	};
  		            });
  				}
  		    	
  			},
  			error : function(e) {
  				alert("Error!")
  				console.log("ERROR: ", e);
  			}
  		}); 
     }
    
    
	// click vào button xóa
    $(document).on("click",".btnXoaSanPham", function() {
		
    	var sanPhamId = $(this).parent().prev().children().val();	
		var workingObject = $(this);
		
		var confirmation = confirm("Bạn chắc chắn xóa sản phẩm này ?");
		if(confirmation){
		  $.ajax({
			  async:false,
			  type : "DELETE",
			  url : "http://localhost:4444/api/mathang/delete/" + sanPhamId,
			  success: function(resultMsg){
				  resetDataForDelete();
				  alert("Xóa thành công");
			  },
			  error : function(e) {
				 console.log("ERROR: ", e);
			  }
		  });	
		}
		resetData();
     });
    
	// click vào button chi tiết
    $(document).on("click",".btnChiTiet", function() {	
    	var mathangId = $(this).parent().prev().children().val();	
    	console.log(mathangId);
    	var href = "http://localhost:4444/api/mathang/product/"+mathangId;
		$.get(href, function(mathang) {
			$('.id').html("<span style='font-weight: bold'>Tên sản phẩm: </span> "+ mathang.id);
			$('.tenmathang').html("<span style='font-weight: bold'>Tên sản phẩm: </span> "+ mathang.tenmathang);
			 $('.dongia').html("<span style='font-weight: bold'>Đơn giá: </span>"+ mathang.dongia);
			  $('.soluong').html("<span style='font-weight: bold'>Số lượng: </span>"+ mathang.soluong);
			  $('.hinhanh').attr("src", encodeURI(mathang.hinhanh));	
			  $('.gioitinh').html("<span style='font-weight: bold'>Giới tính: </span>"+ mathang.gender);
			  $('.size').html("<span style='font-weight: bold'>Size: </span>"+ mathang.size);
			   $('.gioitinh').html("<span style='font-weight: bold'>Size: </span>"+ mathang.gender);
			  $('.giamgia').html("<span style='font-weight: bold'>Giảm giá: </span>"+ mathang.giamgia);
			  $('.ngaythem').html("<span style='font-weight: bold'>Giảm giá: </span>"+ mathang.ngaythem);
			
			
		});
			
    	$('#chiTietModal').modal('show');
    	
    });
    
    // reset table after delete
    function resetDataForDelete(){
       	var count = $('.sanPhamTable tbody').children().length;
    	$('.sanPhamTable tbody tr').remove();
    	var page = $('li.active').children().text();
    	$('.pagination li').remove();
    	console.log(page);
    	if(count == 1){    	
    		ajaxGet(page -1 );
    	} else {
    		ajaxGet(page);
    	}

    };
    
    // reset table after post, put, filter
    function resetData(){   	
    	var page = $('li.active').children().text();
    	$('.sanPhamTable tbody tr').remove();
    	$('.pagination li').remove();
        ajaxGet(page);
    };
    
    // event khi click vào phân trang Sản phẩm
	$(document).on('click', '.pageNumber', function (event){
		event.preventDefault();
		var page = $(this).text();	
    	$('.sanPhamTable tbody tr').remove();
    	$('.pagination li').remove();
    	ajaxGet(page);	
	});
	
	
   $(document).on('keyup', '#searchByname', function (event) {
    event.preventDefault();
    var tenmathang = $('#searchByname').val(); // Lấy giá trị từ ô tìm kiếm
    
    if (tenmathang !== '') {
        $('.sanPhamTable tbody tr').remove(); // Xóa các dòng sản phẩm hiện tại
        $('.pagination li').remove(); // Xóa các mục phân trang hiện tại
        var href = "http://localhost:4444/api/mathang/search/" + encodeURIComponent(tenmathang); 
        console.log(encodeURIComponent(tenmathang))
        $.get(href, function (sanPham) {
            // Xử lý dữ liệu sản phẩm trả về từ API
            $.each(sanPham, function (index, mathang) {
                var sanPhamRow = '<tr>' +
                	'<td>' + mathang.id + '</td>' +
                    '<td>' + mathang.tenmathang + '</td>' +
                    '<td>' + mathang.dongia + '</td>' +
                    '<td>' + mathang.soluong + '</td>' +
                    '<td>' + '<img src="/websport/img/' + mathang.id + '.png" class="img-responsive" style="height: 50px; width: 50px" />' + '</td>' +
                    '<td>' + mathang.gender + '</td>' +
                    '<td>' + mathang.size + '</td>' +
                    '<td>' + mathang.gender + '</td>' +
                    '<td>' + mathang.giamgia + '</td>' +
                    '<td width="0%"><input type="hidden" id="sanPhamId" value="' + mathang.id + '"></td>' +
                    '<td><button class="btn btn-warning btnChiTiet" style="margin-right: 6px">Chi tiết</button>' +
                    '<button class="btn btn-primary btnCapNhat">Cập nhật</button>' +
                    '<button class="btn btn-danger btnXoaSanPham">Xóa</button></td>' +
                    '</tr>';
                $('.sanPhamTable tbody').append(sanPhamRow); // Thêm dòng sản phẩm vào bảng
            });
        });
    } else {
        resetData(); // Gọi hàm resetData() nếu ô tìm kiếm trống
    }
});
	
    // fill input form với JSon Object
    function populate(frm, data) {
    	  $.each(data, function(key, value){
    	    $('[name='+key+']', frm).val(value);
    	  });
    	}
    
	// event khi ẩn modal chi tiết
	$('#chiTietModal').on('hidden.bs.modal', function(e) {
		e.preventDefault();
		$(".chiTietForm p").text(""); // reset text thẻ p
	});
    
    // remove element by class name
    function removeElementsByClass(className){
        var elements = document.getElementsByClassName(className);
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    
    (function ($) {
        $.fn.serializeFormJSON = function () {

            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    })(jQuery);

});