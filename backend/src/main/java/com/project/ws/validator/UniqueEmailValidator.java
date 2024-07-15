package com.project.ws.validator;

import org.springframework.beans.factory.annotation.Autowired;

import com.project.ws.model.User;
import com.project.ws.service.repository.UserRepository;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, String> {
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public boolean isValid(String email, ConstraintValidatorContext context) {
		User user = userRepository.findByEmail(email);
		if(user!=null) {
			return false;
		}
		return true;
	}

}
