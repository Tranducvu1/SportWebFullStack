package com.example.SportWebFullStack.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.SportWebFullStack.Model.DanhMuc;
import com.example.SportWebFullStack.Model.MatHang;
import com.example.SportWebFullStack.Util.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class DanhMucService {
	private String apiURL = Utils.BASE_URL + "danhmuc";
	private RestTemplate restTemplate = new RestTemplate();
	private HttpHeaders headers = new HttpHeaders();
	
	

	
	public List<DanhMuc> getDataFromAPI() throws JsonMappingException, JsonProcessingException {
		RequestEntity<?> requestEntity = new RequestEntity<>(HttpMethod.GET,URI.create(apiURL));
		 ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
		    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<DanhMuc> listEthnic = objectMapper.readValue(json, new TypeReference<List<DanhMuc>>() {});

		    return listEthnic;
	}
	
	
	public List<DanhMuc> searchDataFromAPI(String keyword) throws JsonMappingException, JsonProcessingException {
		String api= apiURL+"/search?keyword="+keyword;
	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
	    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<DanhMuc> listDanhMuc = objectMapper.readValue(json, new TypeReference<List<DanhMuc>>() {});

		    return listDanhMuc;
	}
	
//	public MatHang getProductByIdFromCategory(Integer iddm,Integer idproduct) throws JsonMappingException, JsonProcessingException {
//		String api= apiURL+"/"+iddm+"/"+idproduct;
//		System.out.println(api);
//	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
//	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
//	    String json = response.getBody();
//		    ObjectMapper objectMapper = new ObjectMapper();
//		    MatHang listDanhMuc = objectMapper.readValue(json, new TypeReference<MatHang>() {});
//
//		    return listDanhMuc;
//	}
//	
	
	public Boolean post(DanhMuc DanhMuc) {
		String api = apiURL + "/create";
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(DanhMuc , HttpMethod.POST, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
	    Boolean rs = response.getBody();
		return rs;
	}
	

	
	
	
//	--------------------get và edit----------------------------
	public DanhMuc getById(String id) throws Exception {
	    List<DanhMuc> DanhMucs = getDataFromAPI();
	    Optional<DanhMuc> optionalDanhMuc = DanhMucs.stream()
	            .filter(religion -> religion.getId().equals(id))
	            .findFirst();
	    if (optionalDanhMuc.isPresent()) {	
	        return optionalDanhMuc.get();
	    } else {
	        throw new Exception("DanhMuc not found with ID: " + id);
	    }
	}

	
	public Boolean editDanhMuc(DanhMuc DanhMuc) {
		String api = apiURL + "/update/"+ DanhMuc.getId();
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(DanhMuc ,  HttpMethod.PUT, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
		Boolean rs = response.getBody();
		return  rs;
	}


	
	
	
	
}

