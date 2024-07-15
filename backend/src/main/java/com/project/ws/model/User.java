package com.project.ws.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.project.ws.validator.UniqueEmail;
import com.project.ws.validator.UniqueUsername;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data // data sayesinde getter setter toString gibi metodlar otomatik oluşuyor.
@Entity
@Table(name="users")
public class User implements UserDetails{
	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1691735184330660105L;

	@Id
    @GeneratedValue
	private long id;
	
	//@Size(min = 4, max = 255, message = "size must be between 4 and 255")
	//@NotNull(message = "{project.constraints.username.NotNull.message}")
	@NotNull
	@Size(min = 4, max = 255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@Size(min=5, max=255)
	@UniqueEmail
	@Pattern(regexp="^[\\w!#$%&’*+/=?`{|}~^-]+(?:\\.[\\w!#$%&’*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", 
			 message = "{project.constraints.email.Pattern.message}")
	private String email;
	
	//@NotNull(message = "must not be null")
	//@Size(min = 4, max = 255, message = "size must be between 4 and 255")
	@NotNull
	@Size(min = 4, max = 255)
	private String displayName;
	
	//@NotNull(message = "must not be null")
	//@Size(min = 8, max = 255, message = "size must be between 8 and 255")
	@NotNull
	@Size(min = 8, max = 255)
	@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$",message = "{project.constraints.password.Pattern.message}")
	private String password;
	
	private boolean active = false;

	private String activationToken;
	
	private String passwordResetToken;

	
	private String image;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
