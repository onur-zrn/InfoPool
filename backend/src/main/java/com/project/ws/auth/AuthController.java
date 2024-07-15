package com.project.ws.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.ws.model.User;
import com.project.ws.service.repository.UserRepository;
import com.project.ws.shared.CurrentUser;
import com.project.ws.viewmodel.user.UserVM;


@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		return new UserVM(user);
	}

}