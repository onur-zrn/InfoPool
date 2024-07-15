package com.project.ws.validator;

import org.springframework.beans.factory.annotation.Autowired;

import com.project.ws.model.User;
import com.project.ws.service.repository.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public boolean isValid(String username, ConstraintValidatorContext context) {
		User user = userRepository.findByUsername(username);
		if(user!=null) {
			return false;
		}
		return true;
	}

}
