package com.example.SportWebFullStack.Controller.Admin;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
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
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Service.BannerService;
import com.example.SportWebFullStack.Service.DanhMucService;
import com.example.SportWebFullStack.Service.DonHangService;
import com.example.SportWebFullStack.Service.MatHangService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;


import ch.qos.logback.core.model.Model;

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

private static final Path UPLOAD_DIRECTORY = Paths.get("uploads");
@GetMapping()
public String login(Model model){
return "Admin/trangAdmin";
}


@GetMapping("/products")
public String quanLySanPhamPage(ModelMap modelMap,
		@RequestParam(value="id", required = false) Integer productId,
	       @RequestParam(value="danhmuc", required = false) String danhMucId) throws Exception {
	 List<MatHang> products = new ArrayList<>();
	 
	 modelMap.addAttribute("Categorys",danhMucService.getDataFromAPI());
	 
				if(productId !=null) {
	   		
          MatHang product = matHangService.getById(productId);
          products.add(product);
          System.out.println("1"+products);
       } else if(danhMucId != null) {
           
           // products = matHangService.getDataDanhMuc(danhMucId);
            System.out.println("2 "+products);
        } else {
            products = matHangService.getDataFromAPI();
            System.out.println("3"+products);
         }
        modelMap.addAttribute("products", products);
       
        return "Admin/Products/ManagementProducts";
}

private String saveImage(String file) throws IOException {
    String fileName = file.getOriginalFilename();
    Path filePath = UPLOAD_DIRECTORY.resolve(fileName);
    Files.createDirectories(UPLOAD_DIRECTORY);
    Files.write(filePath, file.getBytes());
    return "/uploads/" + fileName;
}

@GetMapping("/new/products")
public String showCreateProductForm(ModelMap modelmap) {
    modelmap.addAttribute("product", new MatHang());
    return "Admin/Products/CreateProducts";
}

@PostMapping("/new/products")
public String createProduct(Model model, @ModelAttribute("product") MatHang mathang, @RequestPart("hinhanh") String file) throws IOException {
    String imageUrl = saveImage(file);
    matHangService.post(mathang);
    return "redirect:/admin/products";
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
public DanhMuc findById(String id) throws Exception
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
public String showEdit(ModelMap modelMap, @PathVariable("id") String id) throws Exception {
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
