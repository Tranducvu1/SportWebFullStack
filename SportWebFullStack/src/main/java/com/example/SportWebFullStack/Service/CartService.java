package com.example.SportWebFullStack.Service;

import org.springframework.stereotype.Service;

import com.example.SportWebFullStack.Model.MatHang;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    private List<MatHang> cartItems = new ArrayList<>();

    public void addToCart(MatHang MatHang) {
        cartItems.add(MatHang);
    }

    public List<MatHang> getCartItems() {
        return cartItems;
    }

    // Các phương thức khác liên quan đến giỏ hàng...
}
