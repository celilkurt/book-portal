package com.tr.internship.bookportal.service;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface CRUDService <P,R>{

    public List<R> getAll();

    public Optional<R> getById(Long id);

    public void deleteById(Long id);

    public R save(P record);

    public R update(P record);

}
