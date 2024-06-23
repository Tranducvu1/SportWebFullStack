package com.example.SportWebFullStack.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DanhMuc {

	private Integer id;
    private String madanhmuc;
    private String tendanhmuc;
    private List<MatHang> mathang;
}