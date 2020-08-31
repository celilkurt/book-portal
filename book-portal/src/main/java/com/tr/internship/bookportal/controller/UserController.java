package com.tr.internship.bookportal.controller;


import com.tr.internship.bookportal.dto.UserDTO;
import com.tr.internship.bookportal.entity.User;
import com.tr.internship.bookportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Page<User>> getAllUsers(@RequestParam(name="pageSize", defaultValue = "2") int pageSize,
                                                  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(userService.getAll(pageSize,pageNumber));

    }

    @GetMapping("/id/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        Optional<User> user = userService.getById(id);
        if(user.isPresent())
            return ResponseEntity.ok(user.get());
        else
            throw new IllegalArgumentException("Kitap Bulunamadı.");
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<User> getUserById(@PathVariable String username){
        User user = userService.getByUsername(username);
        if(user != null)
            return ResponseEntity.ok(user);
        else
            throw new IllegalArgumentException("Kitap Bulunamadı.");
    }

    @GetMapping("/role/{username}")
    public ResponseEntity<String> getRoleByUsername(@PathVariable String username){

        return ResponseEntity.ok(userService.getRoleByUsername(username));

    }

    @PostMapping
    @Validated
    public ResponseEntity<User> addUser( @Valid @RequestBody UserDTO userDTO){


        User user2 = userService.save(userDTO);
        if(user2 != null)
            return ResponseEntity.ok(user2);
        else
            throw new IllegalArgumentException("Girilen bilgiler geçersiz.");

    }


    @PutMapping
    @Validated
    public ResponseEntity<User> updateBook(@Valid @RequestBody UserDTO userDTO){
        User user2 = userService.update(userDTO);
        if(user2 != null)
            return ResponseEntity.ok(user2);
        else
            throw new IllegalArgumentException("Girilen bilgiler geçersiz.");
    }


    @DeleteMapping("/id/{id}")
    public void deleteBookById(@PathVariable Long id){

        userService.deleteById(id);

    }

}
