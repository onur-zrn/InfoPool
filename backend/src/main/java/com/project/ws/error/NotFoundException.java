package com.project.ws.error;

import org.springframework.http.HttpStatus;

import org.springframework.web.bind.annotation.ResponseStatus;
import com.project.ws.shared.Messages;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class NotFoundException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public NotFoundException(){
	        super(Messages.getMessageForLocale("project.user.not.found"));
	}
}