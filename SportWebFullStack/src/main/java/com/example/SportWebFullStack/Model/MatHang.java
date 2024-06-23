package com.example.SportWebFullStack.Model;

import java.sql.Timestamp;

import javax.persistence.Transient;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Transient
    @JsonIgnore
    private MultipartFile hinhAnhPath;
    private String hinhanh;
    private String gender;
    private Long dongia;
    private String danhgia;
    private int soluong; 
    private String mota;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Timestamp ngaythem;
    private Long giamgia;
    private int danhmuc_id;
    private DanhMuc danhMuc;
    private HangSanXuat hangSanXuat;
    
    public HangSanXuat getHangSanXuat() {
        return hangSanXuat;
    }

    public void setHangSanXuat(HangSanXuat hangSanXuat) {
        this.hangSanXuat = hangSanXuat;
    }
}
