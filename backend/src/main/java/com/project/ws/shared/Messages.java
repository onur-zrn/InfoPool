package com.project.ws.shared;

import java.util.Locale;
import java.util.ResourceBundle;

import org.springframework.context.i18n.LocaleContextHolder;

public class Messages {

    public static String getMessageForLocale(String messageKey) {
    	Locale locale =  LocaleContextHolder.getLocale();

        return ResourceBundle.getBundle("ValidationMessages", locale).getString(messageKey); 
    } 
}