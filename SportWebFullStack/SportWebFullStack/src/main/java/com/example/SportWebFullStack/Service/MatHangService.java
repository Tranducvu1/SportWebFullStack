package com.example.SportWebFullStack.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Util.Utils;

@Service
public class MatHangService {
	private String apiURL = Utils.BASE_URL + "mathang";
	private RestTemplate restTemplate = new RestTemplate();
	private HttpHeaders headers = new HttpHeaders();
	
	

	
	public List<MatHang> getDataFromAPI() throws JsonMappingException, JsonProcessingException {
		RequestEntity<?> requestEntity = new RequestEntity<>(HttpMethod.GET,URI.create(apiURL));
		 ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
		    String json = response.getBody();
		    
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<MatHang> listEthnic = objectMapper.readValue(json, new TypeReference<List<MatHang>>() {});

		    return listEthnic;
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
	public Boolean post(MatHang MatHang) {
		String api = apiURL + "/create";
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(MatHang , HttpMethod.POST, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
	    Boolean rs = response.getBody();
		return rs;
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

	
	public Boolean editMatHang(MatHang MatHang) {

		String api = apiURL + "/edit/"+ MatHang.getId();
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(MatHang ,  HttpMethod.PUT, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
		Boolean rs = response.getBody();
		return  rs;
	}

	
	
	
}

