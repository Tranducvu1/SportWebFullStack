package com.example.SportWebFullStack.Model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponse {
	private String message;

	private Boolean status;

	private String stt;
}