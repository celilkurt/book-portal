package com.tr.internship.bookportal.interceptor;

import com.tr.internship.bookportal.entity.User;
import com.tr.internship.bookportal.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class RequestInInterceptor implements HandlerInterceptor {

    private static final Logger LOGGER = LoggerFactory.getLogger(RequestInInterceptor.class);

    @Autowired
    UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        /*String username = request.getParameter("username");
        User user = userService.getByUsername(username);
        if(user.getRoles().contains(new SimpleGrantedAuthority("ROLE_ADMIN"))){
            response.setHeader("Role","admin");
        }else{
            response.setHeader("Role","user");
        }
        LOGGER.info("Request interceptor bitti: {} ", response.getHeader("role"));*/
        LOGGER.info("Request interceptor başladı: {} {}", request.getRequestURI(), request.getMethod());

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {


        LOGGER.info("Request interceptor bitti: {} {}", request.getRequestURI(), request.getMethod());
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
