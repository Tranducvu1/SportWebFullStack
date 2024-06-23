package com.example.SportWebFullStack.Service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.io.OutputStream;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Util.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;



@Service
public class MatHangService {
	private String apiURL = Utils.BASE_URL + "mathang";
	private RestTemplate restTemplate = new RestTemplate();
	private HttpHeaders headers = new HttpHeaders();
	private static final String UPLOAD_PATH = "/static/images/";
	

	
	public List<MatHang> getDataFromAPI() throws JsonMappingException, JsonProcessingException {
		RequestEntity<?> requestEntity = new RequestEntity<>(HttpMethod.GET,URI.create(apiURL));
		 ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
		    String json = response.getBody();
		    
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<MatHang> listEthnic = objectMapper.readValue(json, new TypeReference<List<MatHang>>() {});

		    return listEthnic;
	}
	
	public Boolean post(MatHang MatHang) {
		String api = apiURL + "/create";
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(MatHang , HttpMethod.POST, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
	    Boolean rs = response.getBody();
		return rs;
		
	}
	
	public List<MatHang> getDataFromAPI(Integer danhMucId, Integer hangSanXuatId, String priceRange, String sortOrder)
            throws JsonProcessingException {
        // Tạo URL với các tham số truyền vào
        String fullUrl = apiURL +"/filterByPriceRange"+ "?danhMucId=" + danhMucId + "&hangSanXuatId=" + hangSanXuatId + "&priceRange=" + priceRange + "&sortOrder=" + sortOrder;

        // Tạo request entity
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> requestEntity = new HttpEntity<>(headers);

        // Gửi request GET và nhận response
        ResponseEntity<String> response = restTemplate.exchange(fullUrl, HttpMethod.GET, requestEntity, String.class);
        String json = response.getBody();

        // Parse JSON thành danh sách đối tượng MatHang
        ObjectMapper objectMapper = new ObjectMapper();
        List<MatHang> listMatHang = objectMapper.readValue(json, new TypeReference<List<MatHang>>() {});

        return listMatHang;
    }
	
	public List<MatHang> searchDataFromAPI(String keyword) throws JsonMappingException, JsonProcessingException {
		String api= apiURL+"/search?keyword="+keyword;
	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
	    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<MatHang> listMatHang = objectMapper.readValue(json, new TypeReference<List<MatHang>>() {});

		    return listMatHang;
	}
	
	
	public List<MatHang> getDataDanhMuc(Integer idproduct) throws JsonMappingException, JsonProcessingException {
		String api= apiURL+"/mathangbydanhmuc/"+idproduct;
		System.out.println(api);
	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
	    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<MatHang> listMatHang = objectMapper.readValue(json, new TypeReference<List<MatHang>>() {});

		    return listMatHang;
	}
	
	public MatHang getIddm(Integer id) throws JsonMappingException, JsonProcessingException {
		String api= apiURL+"/product/"+id;

	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
	    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    MatHang listMatHang = objectMapper.readValue(json, new TypeReference<MatHang>() {});

		    return listMatHang;
	}
	
//	--------------------get và edit----------------------------
	public MatHang getById(int id) throws Exception {
	    List<MatHang> MatHangs = getDataFromAPI();
	    Optional<MatHang> optionalMatHang = MatHangs.stream()
	            .filter(religion -> religion.getId() == id)
	            .findFirst();
	    if (optionalMatHang.isPresent()) {
	        return optionalMatHang.get();
	    } else {
	        throw new Exception("MatHang not found with ID: " + id);
	    }
	}

	public Boolean updateMatHang(MatHang MatHang) {
		String api = apiURL + "/update/"+ MatHang.getId();
		System.out.println(api);
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(MatHang ,  HttpMethod.PUT, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
		Boolean rs = response.getBody();
		return  rs;
	}
	
	
	public List<MatHang> filterByPriceRange (List<MatHang> products , String priceRange){
		List<MatHang> filerProducts = new ArrayList<>();
		switch (priceRange) {
		case "duoi-2-trieu":
				filerProducts = products.stream()
					.filter(product -> product.getDongia() < 2000000)
					.collect(Collectors.toList());
			break;
		case "2-trieu-den-4-trieu":
				filerProducts = products.stream()
					.filter(product -> product.getDongia() >=2000000  && product.getDongia() < 4000000)
					.collect(Collectors.toList());
		case "4-trieu-den-6-trieu":
				filerProducts  =  products.stream()
					.filter(product -> product.getDongia() >=4000000  && product.getDongia() < 6000000)
					.collect(Collectors.toList());
		case "6-trieu-den-10-trieu":
			filerProducts = products.stream()
                    .filter(product -> product.getDongia() >= 6000000 && product.getDongia() < 10000000)
                    .collect(Collectors.toList());
            break;
        case "tren-10-trieu":
        	filerProducts = products.stream()
                    .filter(product -> product.getDongia() >= 10000000)
                    .collect(Collectors.toList());
            break;
        default:
        	filerProducts = products;
    }

    return filerProducts;
}
	public List<MatHang> sortByPrice(List<MatHang>  products,String sortOrder){
		if(sortOrder.equals("asc")) {
			products.sort(Comparator.comparing(MatHang::getDongia));
		} else if (sortOrder.equals("desc")){
			products.sort(Comparator.comparing(MatHang::getDongia));
		}
		return products;
	}

	
	
	public String saveImage(MultipartFile file) throws IOException {
	    String uploadDir = "/images/"; // Thư mục lưu trữ hình ảnh
	    File uploadPath = new File(uploadDir);

	    if (!uploadPath.exists()) {
	        uploadPath.mkdirs(); // Tạo thư mục nếu chưa tồn tại
	    }

	    String fileName = StringUtils.cleanPath(file.getOriginalFilename());
	    String filePath = Paths.get(uploadDir, fileName).toString();

	    try (OutputStream os = new FileOutputStream(filePath)) {
	        os.write(file.getBytes()); // Lưu trữ file vào thư mục
	    } catch (IOException e) {
	        throw new IOException("Lỗi khi lưu file: " + fileName, e);
	    }

	    return fileName; // Trả về tên file đã lưu
	}

}

