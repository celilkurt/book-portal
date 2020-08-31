package com.tr.internship.bookportal.config;


import com.tr.internship.bookportal.dao.RoleRepository;
import com.tr.internship.bookportal.dao.UserRepository;
import com.tr.internship.bookportal.dto.UserDTO;
import com.tr.internship.bookportal.entity.Role;
import com.tr.internship.bookportal.entity.User;
import com.tr.internship.bookportal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    UserService userService;


    @Override
    public void run(ApplicationArguments args) throws Exception {

        boolean userRoleExists = roleRepository.existsByName("ROLE_USER");
        if (!userRoleExists) {
            Role userRole = new Role();
            userRole.setName("ROLE_USER");
            roleRepository.save(userRole);
        }

        boolean adminRoleExists = roleRepository.existsByName("ROLE_ADMIN");
        if (!adminRoleExists) {
            Role adminRole = new Role();
            adminRole.setName("ROLE_ADMIN");
            roleRepository.save(adminRole);
        }

        List<String> roles = Arrays.asList("ROLE_ADMIN");
        if(userRepository.findByRoles_NameIn(roles).isEmpty()){
            userService.saveAdmin(new UserDTO("admin","pass"));
        }
    }
}