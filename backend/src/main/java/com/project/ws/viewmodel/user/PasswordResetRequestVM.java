package com.project.ws.viewmodel.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordResetRequestVM {
	
	@NotNull
	@Email
	@Size(min=5, max=255)

	private String email;
}