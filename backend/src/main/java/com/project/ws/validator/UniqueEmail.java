package com.project.ws.validator;


import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ FIELD })
@Retention(RUNTIME)
@Constraint(validatedBy = { UniqueEmailValidator.class })
public @interface UniqueEmail {
	
	String message() default "{project.constraints.email.UniqueEmail.message}";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
}
