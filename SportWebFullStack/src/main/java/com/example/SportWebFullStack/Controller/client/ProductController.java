package com.example.SportWebFullStack.Controller.client;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.example.SportWebFullStack.Model.DonHang;
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Model.MessageResponse;
import com.example.SportWebFullStack.Service.CartService;
import com.example.SportWebFullStack.Service.DanhMucService;
import com.example.SportWebFullStack.Service.DonHangService;
import com.example.SportWebFullStack.Service.MatHangService;

@Controller
@RequestMapping("/sport")
public class ProductController {
	private MessageResponse message;
@Autowired
private MatHangService matHangService;
@Autowired
private DanhMucService danhMucService;
@Autowired
private DonHangService donHangService;
@Autowired
private CartService cartService;



@GetMapping("/product/{idproduct}")
public String Addtocart(Model model, @PathVariable("idproduct") int idproduct) throws Exception {
	try {
		DonHang donhang = new DonHang();
		MatHang matHang = matHangService.getById(idproduct);

		model.addAttribute("product",matHang);
		model.addAttribute("donhang",donhang);
	} catch (Exception e) {
		// TODO: handle exception
		e.printStackTrace();
	}
	
    return "FrontEnd/product";
}

//
//@PostMapping("/product/{idproduct}")
//public String addToCart(@PathVariable("idproduct") int productId, RedirectAttributes redirectAttributes) throws Exception {
//    MatHang product = matHangService.getById(productId);
//    cartService.addToCart(product);
//    return "redirect:/sport/product/cart";
//}


@PostMapping("/product/{idproduct}")
public String addToCart(@PathVariable("idproduct") String productId, RedirectAttributes redirectAttributes) throws Exception {
    try {
        int id = Integer.parseInt(productId);
        MatHang product = matHangService.getById(id);
        cartService.addToCart(product);
		//matHang.getSoluongsanpham();
		
        System.out.println(product);
        redirectAttributes.addFlashAttribute("message", "Sản phẩm đã được thêm vào giỏ hàng");
    } catch (NumberFormatException e) {
        // Xử lý lỗi khi không thể chuyển đổi 'idproduct' sang kiểu int
        e.printStackTrace();
        // Hoặc trả về một trang lỗi
    }
    return "redirect:/sport/product/cart";
}


}
