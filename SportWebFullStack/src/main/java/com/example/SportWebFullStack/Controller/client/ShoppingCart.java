package com.example.SportWebFullStack.Controller.client;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.SportWebFullStack.Model.Cart;
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Service.CartService;
import com.example.SportWebFullStack.Service.MatHangService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/sport")
public class ShoppingCart {
@Autowired
private MatHangService matHangService;
	@Autowired
	private CartService cartService;
	@GetMapping("/product/cart") 
	public String viewCart(ModelMap modelmap) throws Exception  {
	  Map<Integer, MatHang> items = new HashMap<>();
	  int soluong = 0;
	  Map<Integer, String> quantity = new HashMap<>();
	  List<MatHang> listsp = cartService.getCartItems();

	  for (MatHang item : listsp) {
	    if (!items.containsKey(item.getId())) {
	      // Chưa có, thêm mới   
	      items.put(item.getId(), item);
	      // Tăng tổng số lượng  
	      soluong++;

	      // Thêm số lượng
	      quantity.put(item.getId(), "" + item.getSoluong()); 
	    }

	  }
	  
	  modelmap.addAttribute("soluong", soluong);

	  modelmap.addAttribute("cartItems", items.values());

	  modelmap.addAttribute("quantity", quantity);

	  return "FrontEnd/cart";  

	}




	
}
