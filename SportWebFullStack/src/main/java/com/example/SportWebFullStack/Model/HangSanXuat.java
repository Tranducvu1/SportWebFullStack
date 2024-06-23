package com.example.SportWebFullStack.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor

public class HangSanXuat {

	private Integer id;
    private String tenhang;
    private List<MatHang> mathang;
}