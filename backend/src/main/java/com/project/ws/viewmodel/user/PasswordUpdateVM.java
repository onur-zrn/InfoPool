package com.project.ws.viewmodel.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class PasswordUpdateVM {
	
	@NotNull
	@Size(min=5, max=255)
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "{project.constraints.password.Pattern.message}")

	private String password;
}