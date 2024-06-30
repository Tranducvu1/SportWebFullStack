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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
	  private HttpSession session;
@Autowired
private MatHangService matHangService;
	@Autowired
	private CartService cartService;
	@GetMapping("/product/cart") 
	public String viewCart(ModelMap modelmap) throws Exception  {
	  Map<Integer, MatHang> items = new HashMap<>();
	  session.getAttribute("cartItems");
	  if (items == null) {
          items = new HashMap<>();
          session.setAttribute("cartItems", items);
      }

	  for (Map.Entry<Integer, MatHang> entry : items.entrySet()) {
		    Integer id = entry.getKey();
		    MatHang item = entry.getValue();
		    // Xử lý thông tin của mỗi mặt hàng ở đây
		    System.out.println("ID: " + id + ", Tên: " + item.getTenmathang() + ", Số lượng: " + item.getSoluongsanpham());
		}
      int soluong = items.size();
	//  int soluong = 0;
	  Map<Integer, String> quantity = new HashMap<>();
	  List<MatHang> listsp = cartService.getCartItems();
	  for (MatHang item : listsp) {
	    if (!items.containsKey(item.getId())) {
	      items.put(item.getId(), item);
	      System.out.println(item);
	      soluong++;
	      System.out.println(item.getSoluong());
	      quantity.put(item.getId(), "" + item.getSoluongsanpham()); 
	      
	    }
	  }
	  modelmap.addAttribute("soluong", soluong);
	  modelmap.addAttribute("cartItems", items.values());
	  modelmap.addAttribute("quantity", quantity);

	  return "FrontEnd/cart";  

	}

	
	@PostMapping("/product/addToCart")
    public String addToCart(@RequestParam Integer productId, @RequestParam Integer quantity) throws Exception {
        Map<Integer, MatHang> items = (Map<Integer, MatHang>) 
        
        		session.getAttribute("cartItems");
        if (items == null) {
            items = new HashMap<>();
            session.setAttribute("cartItems", items);
        }
        
        MatHang product = matHangService.getById(productId);
        if (product != null) {
            if (items.containsKey(productId)) {
                MatHang existingItem = items.get(productId);
                existingItem.setSoluong(existingItem.getSoluongsanpham() + quantity);
            } else {
                product.setSoluong(quantity);
                items.put(productId, product);
            }
        }
        
        return "redirect:/product/cart";
    }


	@PostMapping("/product/updateCart")
    @ResponseBody
    public Map<String, Object> updateCart(@RequestParam Integer productId, @RequestParam Integer quantity) {
        Map<Integer, MatHang> items = (Map<Integer, MatHang>) session.getAttribute("cartItems");
        Map<String, Object> response = new HashMap<>();

        if (items != null && items.containsKey(productId)) {
            MatHang item = items.get(productId);
            item.setSoluong(quantity);
            
            response.put("success", true);
            response.put("newQuantity", quantity);
            response.put("newTotal", item.getDongia() * quantity);
        } else {
            response.put("success", false);
        }

        return response;
    }

	
}
