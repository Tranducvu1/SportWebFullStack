package com.example.SportWebFullStack.Model;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DonHang {
	
	private int id;
	
   
	private List<MatHang> products;


	private String madonhang;

	private String nhacungcap;
	
	private String tenmathang;

	private String phuongthucvanchuyen;	
	
	private Timestamp ngaydat;
	
	private Timestamp ngaychuyenden;	
	
	private Long phivanchuyen;
	
	private int giamgia;
	
	private Integer soluong;
	
	private String hinhanh;
	
	private Long Money;
	
	
}
