//package com.example.SportWebFullStack.Model;
//
//
//
//import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
//import com.fasterxml.jackson.annotation.JsonProperty;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageImpl;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//
//import java.util.List;
//
//@JsonIgnoreProperties(ignoreUnknown = true)
//public class MatHangPage {
//
//    @JsonProperty("content")
//    private List<MatHang> content;
//
//    @JsonProperty("pageable")
//    private Pageable pageable;
//
//    @JsonProperty("totalElements")
//    private long totalElements;
//
//    @JsonProperty("totalPages")
//    private int totalPages;
//
//    @JsonProperty("number")
//    private int number;
//
//    @JsonProperty("size")
//    private int size;
//
//    @JsonProperty("sort")
//    private Sort sort;
//
//    public List<MatHang> getContent() {
//        return content;
//    }
//
//    public void setContent(List<MatHang> content) {
//        this.content = content;
//    }
//
//    public Pageable getPageable() {
//        return pageable;
//    }
//
//    public void setPageable(Pageable pageable) {
//        this.pageable = pageable;
//    }
//
//    public long getTotalElements() {
//        return totalElements;
//    }
//
//    public void setTotalElements(long totalElements) {
//        this.totalElements = totalElements;
//    }
//
//    public int getTotalPages() {
//        return totalPages;
//    }
//
//    public void setTotalPages(int totalPages) {
//        this.totalPages = totalPages;
//    }
//
//    public int getNumber() {
//        return number;
//    }
//
//    public void setNumber(int number) {
//        this.number = number;
//    }
//
//    public int getSize() {
//        return size;
//    }
//
//    public void setSize(int size) {
//        this.size = size;
//    }
//
//    public Sort getSort() {
//        return sort;
//    }
//
//    public void setSort(Sort sort) {
//        this.sort = sort;
//    }
//
//    public Page<MatHang> toPage() {
//        Pageable pageable = PageRequest.of(this.number, this.size, this.sort);
//        return new PageImpl<>(this.content, pageable, this.totalElements);
//    }
//}
//
