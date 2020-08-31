package com.tr.internship.bookportal.dao;

import com.tr.internship.bookportal.entity.Book;
import com.tr.internship.bookportal.entity.Role;
import com.tr.internship.bookportal.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByUsername(String username);
    Page<List<User>> findAllByUsernameContainingOrUsernameContainsIgnoreCase(String username,String username2,Pageable paged);
    List<User> findByRoles_NameIn(List<String> roles);


}
