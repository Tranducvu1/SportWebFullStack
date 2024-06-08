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

import com.example.SportWebFullStack.Model.DonHang;
import com.example.SportWebFullStack.Util.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class DonHangService {
	private String apiURL = Utils.BASE_URL + "donhang";
	private RestTemplate restTemplate = new RestTemplate();
	private HttpHeaders headers = new HttpHeaders();
	
	

	
	public List<DonHang> getDataFromAPI() throws JsonMappingException, JsonProcessingException {
		RequestEntity<?> requestEntity = new RequestEntity<>(HttpMethod.GET,URI.create(apiURL));
		 ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
		    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<DonHang> listEthnic = objectMapper.readValue(json, new TypeReference<List<DonHang>>() {});

		    return listEthnic;
	}
	
	
	public List<DonHang> searchDataFromAPI(String keyword) throws JsonMappingException, JsonProcessingException {
		String api= apiURL+"/search?keyword="+keyword;
	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
	    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<DonHang> listDonHang = objectMapper.readValue(json, new TypeReference<List<DonHang>>() {});

		    return listDonHang;
	}
	
//	public MatHang getProductByIdFromCategory(Integer iddm,Integer idproduct) throws JsonMappingException, JsonProcessingException {
//		String api= apiURL+"/"+iddm+"/"+idproduct;
//		System.out.println(api);
//	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
//	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
//	    String json = response.getBody();
//		    ObjectMapper objectMapper = new ObjectMapper();
//		    MatHang listDonHang = objectMapper.readValue(json, new TypeReference<MatHang>() {});
//
//		    return listDonHang;
//	}
//	
	
	public Boolean post(DonHang DonHang) {
		String api = apiURL + "/create";
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(DonHang , HttpMethod.POST, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
	    Boolean rs = response.getBody();
		return rs;
	}
	

	
	
	
//	--------------------get và edit----------------------------
	public DonHang getById(int id) throws Exception {
	    List<DonHang> DonHangs = getDataFromAPI();
	    Optional<DonHang> optionalDonHang = DonHangs.stream()
	            .filter(religion -> religion.getId() == id)
	            .findFirst();
	    if (optionalDonHang.isPresent()) {
	        return optionalDonHang.get();
	    } else {
	        throw new Exception("DonHang not found with ID: " + id);
	    }
	}

	
	public Boolean editDonHang(DonHang DonHang) {
		String api = apiURL + "/update/"+ DonHang.getId();
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(DonHang ,  HttpMethod.PUT, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
		Boolean rs = response.getBody();
		return  rs;
	}


	
	
	
	
}


