package com.example.SportWebFullStack.Model;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MatHang {

    private int id;
    private String mamathang;
    private String tenmathang;
    private String maphanloai;
    private String size;
    private MultipartFile hinhanh;
    private String gioitinh;
    private Long dongia;
    private String danhgia;
    private int soluong; 
    private String hangsanxuat;
    private String mota;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime ngaythem;
    private Long giamgia;
    private int danhmuc_id;
   
}
