package com.example.SportWebFullStack.Model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class Cart {

    private List<MatHang> MatHangs;

    public void addMatHang(MatHang MatHang) {
        this.getMatHangs().add(MatHang);
    }

    public List<MatHang> getMatHangs() {
        if(MatHangs == null) {
            MatHangs = new ArrayList<>();
        } 
        return MatHangs;
    }

    public void setMatHangs(List<MatHang> MatHangs) {
        this.MatHangs = MatHangs;
    }
    
}