package com.example.SportWebFullStack.Controller.Admin;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.util.unit.DataSize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.example.SportWebFullStack.Model.Banner;
import com.example.SportWebFullStack.Model.DanhMuc;
import com.example.SportWebFullStack.Model.HangSanXuat;
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Service.BannerService;
import com.example.SportWebFullStack.Service.DanhMucService;
import com.example.SportWebFullStack.Service.DonHangService;
import com.example.SportWebFullStack.Service.HangSanXuatService;
import com.example.SportWebFullStack.Service.MatHangService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;


import ch.qos.logback.core.model.Model;
import jakarta.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/admin")
public class AdminController {

@Autowired
private MatHangService matHangService;
@Autowired
private BannerService bannerService;
@Autowired
private DonHangService donHangService;
@Autowired
private DanhMucService danhMucService;
@Autowired
private HangSanXuatService hangSanXuatService;
private static final Path UPLOAD_DIRECTORY = Paths.get("uploads");

@GetMapping()
public String login(Model model){
	return "Admin/trangAdmin";
}
@GetMapping("/products")
public String quanLySanPhamPage(ModelMap modelMap, @RequestParam(value = "keyword", required = false) String keyword) throws Exception {
  //  List<MatHang> products = new ArrayList<>();
    List<DanhMuc> categories = danhMucService.getDataFromAPI();
    List<HangSanXuat> ManufacturerS = hangSanXuatService.getDataFromAPI();
//    if (selectedCategoryId != null) {
//        products = danhMucService.GetByProduct(selectedCategoryId);
//    } else if (selecttedManufatures != null) {
//       
//    } else {
//    	 products = matHangService.getDataFromAPI();
//    }
//    if (productId != null) {
//        MatHang product = matHangService.getById(productId);
//        products.add(product);
//    }
//    //sort
//    if (sortOder != null) {
//        products = matHangService.sortByPrice(products, sortOder);
//    }
//    //filter id
//    if(priceRanger !=null) {
//    	products = matHangService.filterByPriceRange(products, priceRanger);
//    }
//    modelMap.addAttribute("products", products);
    modelMap.addAttribute("categories", categories);
    modelMap.addAttribute("manufacturers", ManufacturerS);
    return "Admin/Products/ManagementProducts";
}
@GetMapping("/filter")
public String FilterProducts(ModelMap modelMap,
                             @RequestParam(value = "id", required = false) Integer productId,
                             @RequestParam(value = "selectedCategory", required = false) Integer selectedCategoryId,
                             @RequestParam(value = "selectedManufacturers", required = false) Integer selectedManufacturers,
                             @RequestParam(value = "dongia", required = false) String priceRange,
                             @RequestParam(value = "sapXeptheoGia", required = false) String sortOrder,
                             @RequestParam(value = "keyword", required = false) String keyword) throws Exception {
    // Lấy danh mục và nhà sản xuất từ service
    DanhMuc category = null;
    HangSanXuat manufacturer = null;
    if (selectedCategoryId != null) {
        category = danhMucService.getById(selectedCategoryId);
    }
    if (selectedManufacturers != null) {
        manufacturer = hangSanXuatService.getById(selectedManufacturers);
    }
    
    // Gọi API để lấy dữ liệu sản phẩm từ backend
    List<MatHang> products = matHangService.getDataFromAPI(selectedCategoryId, selectedManufacturers, priceRange, sortOrder);
    
    // Đưa danh sách sản phẩm và các danh mục khác vào model để hiển thị trên view
    modelMap.addAttribute("products", products);
    modelMap.addAttribute("categories", category);
    modelMap.addAttribute("manufacturers", manufacturer);
    
    return "Admin/Products/ManagementProducts";
}

@GetMapping("/new/products")
public String showCreateProductForm(ModelMap modelmap) throws JsonMappingException, JsonProcessingException {
    List<HangSanXuat> ManufacturerS = hangSanXuatService.getDataFromAPI();
    List<DanhMuc> dm = danhMucService.getDataFromAPI();
    modelmap.addAttribute("manufacturers", ManufacturerS);
    modelmap.addAttribute("categories", dm);
    modelmap.addAttribute("products", new MatHang());
    return "Admin/Products/CreateProducts";
}
@PostMapping("/new/products")
public String createProduct(@ModelAttribute("products") @Valid MatHang matHang,
                            BindingResult bindingResult,
                            ModelMap modelMap,
                            @RequestParam("nhaSXId") Integer nhaSXId,
                            @RequestParam("IDDM") Integer danhMucId) throws Exception {
    if (nhaSXId == null || danhMucId == null) {
        if (nhaSXId == null) {
            System.out.println("Không có hãng sản xuất ID");
            modelMap.addAttribute("error", "Không có hãng sản xuất ID");
            return "redirect:/admin/new/products";
        }
        if (danhMucId == null) {
            System.out.println("Không có danh mục ID");
            modelMap.addAttribute("error", "Không có danh mục ID");
            return "redirect:/admin/new/products";
        }
        modelMap.addAttribute("manufacturers", hangSanXuatService.getDataFromAPI());
        return "Admin/Products/CreateProducts"; 
    }

    if (bindingResult.hasErrors()) {
        bindingResult.getAllErrors().forEach(error -> {
            System.out.println(error.toString());
        });
        modelMap.addAttribute("manufacturers", hangSanXuatService.getDataFromAPI());
        return "Admin/Products/CreateProducts";
    }
    try {
        DanhMuc danhMuc = danhMucService.getById(danhMucId);
        if (danhMuc == null) {
            throw new Exception("Không tìm thấy danh mục với ID: " + danhMucId);
        }
        matHang.setDanhMuc(danhMuc);
        HangSanXuat hangSanXuat = hangSanXuatService.getById(nhaSXId);
        if (hangSanXuat == null) {
            throw new Exception("Không tìm thấy hãng sản xuất với ID: " + nhaSXId);
        }
        matHang.setHangSanXuat(hangSanXuat);
       
    } catch (Exception e) {
        modelMap.addAttribute("error", e.getMessage()); 
        modelMap.addAttribute("manufacturers", hangSanXuatService.getDataFromAPI());
        return "Admin/Products/CreateProducts";
    }

    MultipartFile hinhanh = matHang.getHinhAnhPath();
    long fileSizeInBytes = hinhanh.getSize();
	DataSize maxSize = DataSize.ofMegabytes(60);
	if (fileSizeInBytes > maxSize.toBytes()) {
		throw new Exception("Dung lượng ảnh vượt quá giới hạn cho phép");
	}
    //check file
    if(hinhanh != null && !hinhanh.isEmpty()) {
    	String fileName = StringUtils.cleanPath(hinhanh.getOriginalFilename());
    	
    	String uploadDir = "src/main/resources/static/images";
    	Path uploadPath = Paths.get(uploadDir);
    	//save file
    	
    	if(!Files.exists(uploadPath)) {
    		Files.createDirectories(uploadPath);
    	}
    	Path filePath = uploadPath.resolve(fileName);
        Files.copy(hinhanh.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        matHang.setHinhanh("/images/" + fileName);
    	//Path path = Paths.get(filePath);
    //	Files.copy(hinhanh.getInputStream(), path,StandardCopyOption.REPLACE_EXISTING);
    	//matHang.setHinhAnhPath("/uploads/"+fileName);
    }
//    MultipartFile hinhanh = matHang.getHinhanh();
//    String newFile = null;
//    //check file
//    if(hinhanh != null && !hinhanh.isEmpty()) {
//    	newFile = UUID.randomUUID().toString()+"-"+hinhanh.getOriginalFilename();
//    	String fileName = hinhanh.getOriginalFilename()
//    	String applicantPath = request.getServletContext().getRealPath("");
//    	String filePath = "/static/images/"+fileName;
//    	//save file
//    	Path path = Paths.get(filePath);
//    	Files.copy(hinhanh.getInputStream(), path,StandardCopyOption.REPLACE_EXISTING);
//    	matHang.setHinhAnhPath("/uploads/"+fileName);
//    }
 // Kiểm tra xem hinhanhPath đã được lưu hay chưa
    if (matHang.getHinhAnhPath() != null && !matHang.getHinhAnhPath().isEmpty()) {
        System.out.println("Đường dẫn ảnh đã được lưu: " + matHang.getHinhAnhPath());
    } else {
        throw new Exception("Lỗi: Không thể lưu đường dẫn ảnh");
    }
    matHang.setNgaythem(new Timestamp(System.currentTimeMillis()));
    System.out.println("Thông tin sản phẩm mới: " + matHang);
    matHangService.post(matHang); 
    return "redirect:/admin/products";
}


@GetMapping("/products/update/{id}")
public String showUpdateProducts(ModelMap modelMap, @PathVariable("id") Integer id,ModelMap modelmap) throws Exception {
    List<HangSanXuat> ManufacturerS = hangSanXuatService.getDataFromAPI();
    List<DanhMuc> dm = danhMucService.getDataFromAPI();
    MatHang mathang = this.matHangService.getById(id);
    modelmap.addAttribute("manufacturers", ManufacturerS);
    modelmap.addAttribute("categories", dm);
    modelMap.addAttribute("products", mathang);
    return "Admin/Products/UpdateProducts";
}


@PostMapping("/products/update/{id}")
public String UpdateProducts(@PathVariable("id") Integer id,@Validated MatHang matHang,@RequestParam("nhaSXId") Integer nhaSXId,
        				    @RequestParam("IDDM") Integer danhMucId,ModelMap modelMap) throws Exception {
    try {
    	 if (nhaSXId == null || danhMucId == null) {
    	        if (nhaSXId == null) {
    	            System.out.println("Không có hãng sản xuất ID");
    	            modelMap.addAttribute("error", "Không có hãng sản xuất ID");
    	            return "redirect:/admin/update/products";
    	        }
    	        if (danhMucId == null) {
    	            System.out.println("Không có danh mục ID");
    	            modelMap.addAttribute("error", "Không có danh mục ID");
    	            return "redirect:/admin/update/products";
    	        }
    	        modelMap.addAttribute("manufacturers", hangSanXuatService.getDataFromAPI());
    	        return "Admin/Products/UpdateProducts"; 
    	    }
    	 DanhMuc danhMuc = danhMucService.getById(danhMucId);
         matHang.setDanhMuc(danhMuc);
         HangSanXuat hangSanXuat = hangSanXuatService.getById(nhaSXId);
         matHang.setHangSanXuat(hangSanXuat);
    	 System.out.println(matHang);
    	 MultipartFile hinhanh = matHang.getHinhAnhPath();
    	    long fileSizeInBytes = hinhanh.getSize();
    		DataSize maxSize = DataSize.ofMegabytes(60);
    		if (fileSizeInBytes > maxSize.toBytes()) {
    			throw new Exception("Dung lượng ảnh vượt quá giới hạn cho phép");
    		}
    	    //check file
    	    if(hinhanh != null && !hinhanh.isEmpty()) {
    	    	String fileName = StringUtils.cleanPath(hinhanh.getOriginalFilename());
    	    	
    	    	String uploadDir = "src/main/resources/static/images";
    	    	Path uploadPath = Paths.get(uploadDir);
    	    	//save file
    	    	
    	    	if(!Files.exists(uploadPath)) {
    	    		Files.createDirectories(uploadPath);
    	    	}
    	    	Path filePath = uploadPath.resolve(fileName);
    	        Files.copy(hinhanh.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
    	        
    	        matHang.setHinhanh("/images/" + fileName);
    	    }

    	    if (matHang.getHinhAnhPath() != null && !matHang.getHinhAnhPath().isEmpty()) {
    	        System.out.println("Đường dẫn ảnh đã được lưu: " + matHang.getHinhAnhPath());
    	    } else {
    	        throw new Exception("Lỗi: Không thể lưu đường dẫn ảnh");
    	    }
    	 matHang.setNgaythem(new Timestamp(System.currentTimeMillis()));
        matHangService.updateMatHang(matHang);
        return "redirect:/admin/products";
    } catch (Exception e) {
    	e.printStackTrace();
    	System.out.println("Lỗi");
        return "redirect:/admin/products/update/" + id;
    }
}
@GetMapping("/banner")
public String Banner(ModelMap modelMap) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
	modelMap.addAttribute("banners",this.bannerService.getDataFromAPI());
	return "Admin/Banner/quanLyBanner";
}

//@GetMapping("/new/banner")
//public String TaoBannerMoi(ModelMap modelMap) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
//	Banner bn = new Banner();
//	modelMap.addAttribute("banners",bn);
//	return "Admin/Banner/quanLyBanner";
//}
//
//@PostMapping("/new/banner")
//public String CreateBanner(ModelMap modelMap,Banner banner) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
//	bannerService.post(banner);
//	return "redirect:/admin/banner";
//}

@GetMapping("/order")
public String quanLyDonHangPage(ModelMap modelMap, @RequestParam(value = "keyword", required = false) String keyword) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
	if (keyword == null) {
		modelMap.addAttribute("donHangs",this.donHangService.getDataFromAPI());
    } else {
        // Mã hóa tham số keyword trước khi sử dụng nó trong URL
        String encodedKeyword = URLEncoder.encode(keyword, "UTF-8");
        // Sử dụng encodedKeyword khi tạo URL
        modelMap.addAttribute("donHangs", this.donHangService.searchDataFromAPI(encodedKeyword));
    }
	return "Admin/DonHang/quanLyDonHang";
}

@RequestMapping("category/findById") 
@ResponseBody
public DanhMuc findById(Integer id) throws Exception
{
	return danhMucService.getById(id);
}

@GetMapping("/category")
public String quanLyDanhMucPage(ModelMap modelMap, @RequestParam(value = "keyword", required = false) String keyword) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
	if (keyword == null) {
		modelMap.addAttribute("Categorys",this.danhMucService.getDataFromAPI());
    } else {
        // Mã hóa tham số keyword trước khi sử dụng nó trong URL
        String encodedKeyword = URLEncoder.encode(keyword, "UTF-8");
        // Sử dụng encodedKeyword khi tạo URL
        modelMap.addAttribute("Categorys", this.danhMucService.searchDataFromAPI(encodedKeyword));
    }
	return "Admin/Category/ManagementCategory";
}

@GetMapping("/new/category")
public String UICreate(ModelMap modelMap) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
	DanhMuc ct = new DanhMuc();
	modelMap.addAttribute("categorys",ct);
	return "Admin/Category/CreateCategory";
}

@PostMapping("/new/category")
public String CreateCategory(ModelMap modelMap,DanhMuc danhMuc) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
	danhMucService.post(danhMuc);
	return "redirect:/admin/category";
}

@GetMapping("/category/update/{id}")
public String showEdit(ModelMap modelMap, @PathVariable("id") Integer id) throws Exception {
    DanhMuc dm = this.danhMucService.getById(id);
    modelMap.addAttribute("categorys", dm);
    return "Admin/Category/UpdateCategory";
}

@PostMapping("/category/update/{id}")
public String editCategory(@PathVariable("id") String id, @Validated DanhMuc danhMuc) throws Exception {
    try {
        danhMucService.editDanhMuc(danhMuc);
        return "redirect:/admin/category";
    } catch (Exception e) {
    	e.printStackTrace();
        return "redirect:/admin/category/update/" + id;
    }
}

@GetMapping("/nhan-hieu")
public String quanLyNhanHieuPage() {
	return "admin/quanLyNhanHieu";
}

}
