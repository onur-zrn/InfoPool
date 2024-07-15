package com.project.ws.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.ws.error.ActivationNotificationException;
import com.project.ws.error.InvalidTokenException;
import com.project.ws.error.NotFoundException;
import com.project.ws.model.User;
import com.project.ws.service.repository.UserRepository;
import com.project.ws.shared.GenericResponse;
import com.project.ws.shared.Messages;
import com.project.ws.viewmodel.user.PasswordResetRequestVM;
import com.project.ws.viewmodel.user.PasswordUpdateVM;
import com.project.ws.viewmodel.user.UserUpdateVM;

@Service
public class UserService {

	UserRepository userRepository;
	
	
	PasswordEncoder passwordEncoder;
	
	@Autowired
	private EmailService emailservice;
	
	//Autowired gerek yok cunku zaten bir tane constructor var
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
	}
    
	public GenericResponse save(User user) {
		try {      
			user.setPassword(this.passwordEncoder.encode(user.getPassword()));
			user.setActivationToken(UUID.randomUUID().toString());		
			emailservice.sendActivationEmail(user.getEmail(), user.getActivationToken());
			userRepository.save(user);
			String message = Messages.getMessageForLocale("project.usercreate.Success.message");
			return new GenericResponse(message);
		} catch (MailException  ex) {
			   throw new ActivationNotificationException();

		} catch (Exception e) {
			String error_message = Messages.getMessageForLocale("project.usercreate.error.message");
			return new GenericResponse(error_message);
		}

	}


	public Page<User> getUsers(Pageable page, User user) {
		if(user != null) {
			return userRepository.findByUsernameNot(user.getUsername(), page);
		}
		return userRepository.findAll(page);
	}

	public User getByUsername(String username) {
		User inDB = userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException();
		}
		return inDB;
	}
	public User getByEmail(String email) {
		User inDB = userRepository.findByEmail(email);
		if(inDB == null) {
			throw new NotFoundException();
		}
		return inDB;
	}
	public User updateUser(String username, UserUpdateVM updatedUser) {
		User inDB = getByUsername(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		return userRepository.save(inDB);
	}
	
    public void activateUser(String token) {
        User inDB = userRepository.findByActivationToken(token);
        if(inDB == null) {
            throw new InvalidTokenException();
        }
        inDB.setActive(true);
        inDB.setActivationToken(null);
        userRepository.save(inDB);
    }
    
    public void handleResetRequest(PasswordResetRequestVM passwordResetRequest) {
        User inDB = userRepository.findByEmail(passwordResetRequest.getEmail());
        if(inDB == null) throw new NotFoundException();
        inDB.setPasswordResetToken(UUID.randomUUID().toString());
        userRepository.save(inDB);
        this.emailservice.sendPasswordResetEmail(inDB.getEmail(), inDB.getPasswordResetToken());
      }
    
    public void updatePassword(String token, PasswordUpdateVM passwordUpdate) {
        User inDB = userRepository.findByPasswordResetToken(token);
        if(inDB == null) {
            throw new InvalidTokenException();
        }
        inDB.setPasswordResetToken(null);
        inDB.setPassword(passwordEncoder.encode(passwordUpdate.getPassword()));
        inDB.setActive(true);
        inDB.setPasswordResetToken(null);
        userRepository.save(inDB);
    }
}
