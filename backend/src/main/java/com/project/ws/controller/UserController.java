package com.project.ws.controller;


import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.ws.error.ActivationNotificationException;
import com.project.ws.error.ApiError;
import com.project.ws.error.InvalidTokenException;
import com.project.ws.model.User;
import com.project.ws.service.UserService;
import com.project.ws.shared.CurrentUser;
import com.project.ws.shared.GenericResponse;
import com.project.ws.shared.Messages;
import com.project.ws.viewmodel.user.PasswordResetRequestVM;
import com.project.ws.viewmodel.user.PasswordUpdateVM;
import com.project.ws.viewmodel.user.UserUpdateVM;
import com.project.ws.viewmodel.user.UserVM;

@RestController
@RequestMapping("/api/1.0")
public class UserController {
 
	@Autowired//bizim yerimize repositoryleri set eder.
	UserService userService;
	
	@PostMapping("/users/signup")
	public GenericResponse createUser(@Valid @RequestBody User user) {
		return userService.save(user);
	}
	@GetMapping("/users")
	Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
		return userService.getUsers(page, user).map(UserVM::new);
	}
	
	@GetMapping("/users/{username}")
	UserVM getUser(@PathVariable String username) {
		User user = userService.getByUsername(username);
		return new UserVM(user);
	}
	//user update
	@PutMapping("/users/{username}")
	@PreAuthorize("#username == principal.username")
	//spring security controls is it forbidden or editable profile principal = currentuser, username is path variable parameter
	UserVM updateUser(@Valid @RequestBody UserUpdateVM updatedUser, @PathVariable String username) {
		User user = userService.updateUser(username, updatedUser);
		return new UserVM(user);
	}
	//activate user
    @PatchMapping("/users/{token}")
    GenericResponse activateUser(@PathVariable String token){
        userService.activateUser(token);
        String message = Messages.getMessageForLocale("project.activate.user.success.message");
        return new GenericResponse(message);
    }
	
    //Reset Password
    @PostMapping("/users/password-reset")
    GenericResponse passwordResetRequest(@Valid @RequestBody PasswordResetRequestVM passwordResetRequest) {
      userService.handleResetRequest(passwordResetRequest);
      String message = Messages.getMessageForLocale("project.user.reset.password.message");
      return new GenericResponse(message);
      }
    
    @PatchMapping("/users/{token}/password")
    GenericResponse setPassword(@PathVariable String token, @Valid @RequestBody PasswordUpdateVM passwordUpdate){
    	userService.updatePassword(token, passwordUpdate);
        String message = Messages.getMessageForLocale("project.user.update.password.message");
    	return new GenericResponse(message);

    }
    /*
    @ExceptionHandler(ActivationNotificationException.class)
    ResponseEntity<ApiError> handleActivationNotificationException(ActivationNotificationException exception){
		int status = 502;
    	String message = exception.getMessage();
		String path = "/api/1.0/users/signup";		
    	ApiError apiError = new ApiError(status,message,path);
        return ResponseEntity.status(502).body(apiError);
    }
    
    @ExceptionHandler(InvalidTokenException.class)
    ResponseEntity<ApiError> handleInvalidTokenException(InvalidTokenException exception){
		int status = 502;
    	String message = exception.getMessage();
		String path = "/api/1.0/users";	
    	ApiError apiError = new ApiError(status,message,path);
        return ResponseEntity.status(502).body(apiError);
    }
	*/
}
