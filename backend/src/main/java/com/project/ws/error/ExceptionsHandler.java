package com.project.ws.error;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler({
        ActivationNotificationException.class,
        InvalidTokenException.class,
        NotFoundException.class,
    })
    ResponseEntity<ApiError> handleException(Exception exception, HttpServletRequest request){
        int status = 400;
        String message = "Error";
        String path = "/api/1.0/users/";
        if (exception instanceof ActivationNotificationException) {
           status = 502;
           path="";
        } else if (exception instanceof InvalidTokenException) {
           status = 502;

        } else if (exception instanceof NotFoundException) {
          status = 400;
        }
    	 message = exception.getMessage();

    	ApiError apiError = new ApiError(status, message, path);

        return ResponseEntity.status(apiError.getStatus()).body(apiError);
    }
    
}