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

import com.example.SportWebFullStack.Model.Banner;
import com.example.SportWebFullStack.Util.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class BannerService {
	private String apiURL = Utils.BASE_URL + "banner";
	private RestTemplate restTemplate = new RestTemplate();
	private HttpHeaders headers = new HttpHeaders();
	
	

	
	public List<Banner> getDataFromAPI() throws JsonMappingException, JsonProcessingException {
		RequestEntity<?> requestEntity = new RequestEntity<>(HttpMethod.GET,URI.create(apiURL));
		 ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
		    String json = response.getBody();
		    
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<Banner> listEthnic = objectMapper.readValue(json, new TypeReference<List<Banner>>() {});

		    return listEthnic;
	}
	
	
	public List<Banner> searchDataFromAPI(String keyword) throws JsonMappingException, JsonProcessingException {
		String api= apiURL+"/search?keyword="+keyword;
	    RequestEntity<?> requestEntity = new RequestEntity<>( HttpMethod.GET, URI.create(api));
	    ResponseEntity<String> response = restTemplate.exchange(requestEntity, String.class);
	    String json = response.getBody();
		    ObjectMapper objectMapper = new ObjectMapper();
		    List<Banner> listBanner = objectMapper.readValue(json, new TypeReference<List<Banner>>() {});

		    return listBanner;
	}
	
	
	
	
	public Boolean post(Banner Banner) {
		String api = apiURL + "/create";
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(Banner , HttpMethod.POST, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
	    Boolean rs = response.getBody();
		return rs;
	}
	
	
//	--------------------get và edit----------------------------
	public Banner getById(int id) throws Exception {
	    List<Banner> Banners = getDataFromAPI();
	    Optional<Banner> optionalBanner = Banners.stream()
	            .filter(religion -> religion.getId() == id)
	            .findFirst();
	    if (optionalBanner.isPresent()) {
	        return optionalBanner.get();
	    } else {
	        throw new Exception("Banner not found with ID: " + id);
	    }
	}
	public Boolean editBanner(Banner Banner) {

		String api = apiURL + "/update/"+ Banner.getId();
		headers.setContentType(MediaType.APPLICATION_JSON);
		RequestEntity<?> requestEntity = new RequestEntity<>(Banner ,  HttpMethod.PUT, URI.create(api));
		ResponseEntity<Boolean> response = restTemplate.exchange(requestEntity, Boolean.class);
		Boolean rs = response.getBody();
		return  rs;
	}
	
	
	
}

