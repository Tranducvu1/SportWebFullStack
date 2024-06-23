package com.example.SportWebFullStack.Service;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.SportWebFullStack.Model.HangSanXuat;
import com.example.SportWebFullStack.Util.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


@Service
public class HangSanXuatService {
	private String apiURL = Utils.BASE_URL + "hangsanxuat";
	private RestTemplate restTemplate = new RestTemplate();
	private HttpHeaders headers = new HttpHeaders();
	
	

	
	public List<HangSanXuat> getDataFromAPI() throws JsonMappingException, JsonProcessingException {
		RequestEntity<?> requestEntity = new RequestEntity<>(HttpMethod.GET,URI.create(apiURL));
		 ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
		    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<HangSanXuat> listEthnic = objectMapper.readValue(json, new TypeReference<List<HangSanXuat>>() {});

		    return listEthnic;
	}
	
	//public List<>
	
	public List<HangSanXuat> searchDataFromAPI(String keyword) throws JsonMappingException, JsonProcessingException {
		String api= apiURL+"/search?keyword="+keyword;
	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
	    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<HangSanXuat> listHangSanXuat = objectMapper.readValue(json, new TypeReference<List<HangSanXuat>>() {});

		    return listHangSanXuat;
	}
	

	
	public Boolean post(HangSanXuat HangSanXuat) {
		String api = apiURL + "/create";
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(HangSanXuat , HttpMethod.POST, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
	    Boolean rs = response.getBody();
		return rs;
	}
	

	
	
	
//	--------------------get và edit----------------------------
	public HangSanXuat getById(Integer HangSanXuatId) throws Exception {
	    List<HangSanXuat> HangSanXuats = getDataFromAPI();
	    Optional<HangSanXuat> optionalHangSanXuat = HangSanXuats.stream()
	            .filter(religion -> religion.getId().equals(HangSanXuatId)).findFirst();
	    if (optionalHangSanXuat.isPresent()) {	
	        return optionalHangSanXuat.get();
	    } else {
	        throw new Exception("HangSanXuat not found with ID: " + HangSanXuatId);
	    }
	}

	
	public Boolean editHangSanXuat(HangSanXuat HangSanXuat) {
		String api = apiURL + "/update/"+ HangSanXuat.getId();
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(HangSanXuat ,  HttpMethod.PUT, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
		Boolean rs = response.getBody();
		return  rs;
	}
	
	
	
	
}

