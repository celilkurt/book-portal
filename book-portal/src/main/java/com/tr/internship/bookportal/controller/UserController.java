package com.tr.internship.bookportal.controller;


import com.tr.internship.bookportal.dto.UserDTO;
import com.tr.internship.bookportal.entity.User;
import com.tr.internship.bookportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers(@RequestParam(name="pageSize", defaultValue = "2") int pageSize,
                                                  @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(userService.getAll(pageSize,pageNumber));

    }

    @GetMapping("/get")
    public ResponseEntity<?> getUser(@RequestBody UserDTO userDTO){

        Optional<User> user = userService.getUser(userDTO);
        if(user.isPresent())
            return ResponseEntity.ok(user.get());
        else
            throw new IllegalArgumentException("Kitap Bulunamadı.");
    }


    @GetMapping("/role/{username}")
    public ResponseEntity<?> getRoleByUsername(@PathVariable String username){

        return ResponseEntity.ok(userService.getRoleByUsername(username));

    }

    @PostMapping
    public ResponseEntity<?> addUser( @Valid @RequestBody UserDTO userDTO){


        User user2 = userService.save(userDTO);
        if(user2 != null)
            return ResponseEntity.ok(user2);
        else
            throw new IllegalArgumentException("Girilen bilgiler geçersiz.");

    }


    @PutMapping
    public ResponseEntity<?> updateBook(@Valid @RequestBody UserDTO userDTO){
        User user2 = userService.update(userDTO);
        if(user2 != null)
            return ResponseEntity.ok(user2);
        else
            throw new IllegalArgumentException("Girilen bilgiler geçersiz.");
    }


    @DeleteMapping
    public void deleteBookById(@PathVariable Long id){

        userService.deleteById(id);

    }

    @GetMapping("/username/{key}")
    public ResponseEntity<?> getAllByCategory(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                             @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(userService.getAllByUsername(key,pageSize,pageNumber));
    }

    @GetMapping("/role/{key}")
    public ResponseEntity<?> getAllByRoles(@PathVariable String key, @RequestParam(name="pageSize", defaultValue = "10") int pageSize,
                                                    @RequestParam(name="pageNumber", defaultValue = "0") int pageNumber){

        return ResponseEntity.ok(userService.getAllByRole(key,pageSize,pageNumber));
    }

}
