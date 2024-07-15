package com.project.ws.error;

import com.project.ws.shared.Messages;


public class InvalidTokenException extends RuntimeException{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public InvalidTokenException(){
        super(Messages.getMessageForLocale("project.activate.user.invalid.token"));
    }

}