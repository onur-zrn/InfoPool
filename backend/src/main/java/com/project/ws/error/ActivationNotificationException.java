package com.project.ws.error;


import com.project.ws.shared.Messages;



public class ActivationNotificationException extends RuntimeException{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ActivationNotificationException(){
        super(Messages.getMessageForLocale("project.email.Validation.message"));
    }

}