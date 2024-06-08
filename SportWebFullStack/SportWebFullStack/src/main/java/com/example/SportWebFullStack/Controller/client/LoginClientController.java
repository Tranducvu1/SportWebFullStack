package com.example.SportWebFullStack.Controller.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;



@Controller
@RequestMapping("/sport/login")
public class LoginClientController {

	@GetMapping()
	public String login(Model model) {
		return "FrontEnd/login";
	}
	
	
}
