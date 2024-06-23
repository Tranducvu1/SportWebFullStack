package com.example.SportWebFullStack.Controller.client;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import com.example.SportWebFullStack.Model.Banner;
import com.example.SportWebFullStack.Model.DanhMuc;
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Service.BannerService;
import com.example.SportWebFullStack.Service.DanhMucService;
import com.example.SportWebFullStack.Service.MatHangService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Controller
@RequestMapping("/sport")
public class IndexController {
@Autowired
private MatHangService matHangService;
@Autowired
private BannerService bannerService;
@Autowired
private DanhMucService danhMucService;
	@GetMapping()
	public String show(Model model, @RequestParam(value = "keyword", required = false) String keyword) throws JsonMappingException, JsonProcessingException, UnsupportedEncodingException {
		 List<MatHang> products = this.matHangService.getDataFromAPI();
		 model.addAttribute("products", products);
		 System.out.println(products);
		 List<MatHang> Namproducts = this.matHangService.getDataFromAPI();
		 List<MatHang> maleProducts = Namproducts.stream()
                 .filter(p -> "Nam".equals(p.getGender()))
                 .collect(Collectors.toList());
		 model.addAttribute("maleProducts", maleProducts);
		 List<MatHang> femaleProducts = Namproducts.stream()
                 .filter(p -> "Nữ".equals(p.getGender()))
                 .collect(Collectors.toList());
		 model.addAttribute("femaleProducts", femaleProducts);
		 List<MatHang> product = this.matHangService.getDataFromAPI();
		 Collections.reverse(product);
		 model.addAttribute("product", product);
		 List<Banner> banner = this.bannerService.getDataFromAPI();
		 model.addAttribute("banners", banner);
		 List<DanhMuc> danhmuc = this.danhMucService.getDataFromAPI();
	     List<DanhMuc> namdanhmucproducts = danhmuc.stream()
			         .filter(p -> p.getTendanhmuc().contains("Nam"))
			         .collect(Collectors.toList());
			 System.out.println(namdanhmucproducts);
	     model.addAttribute("namdanhmucs",namdanhmucproducts);
		 List<DanhMuc> nudanhmucproducts = danhmuc.stream()
				         .filter(p -> p.getTendanhmuc().contains("Nữ"))
				         .collect(Collectors.toList());
        System.out.println(nudanhmucproducts);
       model.addAttribute("nudanhmucs",nudanhmucproducts);	
       if (keyword != null) {
   		String encodedKeyword = URLEncoder.encode(keyword, "UTF-8");

       List<MatHang> searchResults = matHangService.searchDataFromAPI(encodedKeyword);
		 model.addAttribute("searchs", searchResults);
		 System.out.println("Kết quả tìm kiếm"+searchResults);
		 return "FrontEnd/search";
       }
		return "FrontEnd/index";
	}
	
	@GetMapping("/search")
	public String searchProducts(Model model, @RequestParam("keyword") String keyword) throws JsonMappingException, JsonProcessingException {
	    String encodedKeyword = URLEncoder.encode(keyword, StandardCharsets.UTF_8);
	    List<MatHang> result = matHangService.searchDataFromAPI(encodedKeyword);
	    model.addAttribute("products", result);
	    return "FrontEnd/search";

	

	}

}
