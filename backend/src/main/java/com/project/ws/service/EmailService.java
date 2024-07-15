package com.project.ws.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service("emailService")
public class EmailService {

  private JavaMailSender javaMailSender;

  public EmailService(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }
  
  @Async
  public void sendEmail(SimpleMailMessage email) {
	  javaMailSender.send(email);
  }

	public void sendActivationEmail(String email, String activationtoken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@my-app.com");
        message.setTo(email);
        message.setSubject("Account Activation");
        message.setText("To confirm your account, please click here: "
        		+ "http://localhost:3000/activation/"+activationtoken);
        
        this.sendEmail(message);		
	}

	public void sendPasswordResetEmail(String email, String passwordResetToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("noreply@my-app.com");
        message.setTo(email);
        message.setSubject("Reset your password");
        message.setText("To confirm your account, please click here: "
        		+ "http://localhost:3000/password-reset/"+passwordResetToken);
        
        this.sendEmail(message);
		
	}
}