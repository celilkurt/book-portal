package com.tr.internship.bookportal.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(ArithmeticException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, ArithmeticException t) {
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put("error", "Aritmetik bir hata oluştu");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, IllegalArgumentException t) {
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put("error", t.getMessage());
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, AccessDeniedException t) {
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put("error", "Lütfen yetkilerinizi kontrol ediniz.");
        return new ResponseEntity<>(map, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(Throwable.class)
    public ResponseEntity<?> handleRuntimeException(HttpServletRequest request, Throwable t) {
        LOGGER.error(t.getMessage(), t);
        Map<String, String> map = new HashMap<>();
        map.put("error", "Bilinmeyen bir hata oluştu");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
