package com.tr.internship.bookportal;

import com.tr.internship.bookportal.interceptor.RequestInInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class BookPortalApplication implements WebMvcConfigurer {

	@Autowired
	private RequestInInterceptor requestInInterceptor;

	public static void main(String[] args) {
		SpringApplication.run(BookPortalApplication.class, args);
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {

		registry.addInterceptor(requestInInterceptor);
	}
}
