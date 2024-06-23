package com.example.SportWebFullStack.Controller.client;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.SportWebFullStack.Model.DanhMuc;
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Service.DanhMucService;
import com.example.SportWebFullStack.Service.MatHangService;

@Controller
@RequestMapping("/sport")
public class DanhMucController {
@Autowired
private MatHangService matHangService;
@Autowired
private DanhMucService danhMucService;
@GetMapping("/danhmuc/{idproduct}")
public String login(Model model,@PathVariable("idproduct") Integer idproduct) throws Exception {
	 List<DanhMuc> danhmuc = this.danhMucService.getDataFromAPI();
	List<DanhMuc> namdanhmucproducts = danhmuc.stream()
	         .filter(p -> p.getTendanhmuc().contains("Nam"))
	         .collect(Collectors.toList());
	 System.out.println(namdanhmucproducts);
model.addAttribute("namdanhmucs",namdanhmucproducts);
List<DanhMuc> nudanhmucproducts = danhmuc.stream()
		         .filter(p -> p.getTendanhmuc().contains("Nữ"))
		         .collect(Collectors.toList());
System.out.println(nudanhmucproducts);
model.addAttribute("nudanhmucs",nudanhmucproducts);	
	//List<MatHang> mathang = this.matHangService.getDataDanhMuc(idproduct);
	 DanhMuc danhmucs = this.danhMucService.getById(idproduct);
	
	 model.addAttribute("danhmucs",danhmucs);
	
	 //model.addAttribute("mathangs",mathang);
			return "FrontEnd/list";
}
}
