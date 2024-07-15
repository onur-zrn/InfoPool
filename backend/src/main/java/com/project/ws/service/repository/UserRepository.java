package com.project.ws.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.ws.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);
	
	User findByEmail(String email);
	
	User findByActivationToken(String token);
	
	User findByPasswordResetToken(String token);


	Page<User> findByUsernameNot(String username, Pageable page);
}
