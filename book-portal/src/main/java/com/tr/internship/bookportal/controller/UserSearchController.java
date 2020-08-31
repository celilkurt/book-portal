package com.tr.internship.bookportal.controller;


import com.tr.internship.bookportal.dao.UserRepository;
import com.tr.internship.bookportal.entity.Book;
import com.tr.internship.bookportal.entity.User;
import com.tr.internship.bookportal.service.UserSearchService;
import com.tr.internship.bookportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/search")
public class UserSearchController {

    @Autowired
    UserSearchService userSearchService;

    @GetMapping("/username/{key}")
    public ResponseEntity<Page<List<User>>> getAllByCategory(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                             @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(userSearchService.getAllByUsername(key,pageSize,pageNumber));
    }

    @GetMapping("/role/{key}")
    public ResponseEntity<List<User>> getAllByRoles(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                             @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(userSearchService.getAllByRole(key,pageSize,pageNumber));
    }


}
