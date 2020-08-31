package com.tr.internship.bookportal.service;

import com.tr.internship.bookportal.dao.RoleRepository;
import com.tr.internship.bookportal.dao.UserRepository;
import com.tr.internship.bookportal.dto.UserDTO;
import com.tr.internship.bookportal.entity.MyUserDetails;
import com.tr.internship.bookportal.entity.Role;
import com.tr.internship.bookportal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserService implements  UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder encoder;

    @Bean
    public PasswordEncoder encoder(){
        return new BCryptPasswordEncoder();
    }


    public Page<User> getAll(int pageSize, int pageNumber) {

        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return userRepository.findAll(paged);
    }




    public Optional<User> getById(Long id) {
        return userRepository.findById(id);

    }


    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }


    public User save(UserDTO userDTO) {

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setRoles(Stream.of(roleRepository.findByName("ROLE_USER")).collect(Collectors.toSet()));

        return userRepository.save(user);
    }


    public User saveAdmin(UserDTO userDTO) {

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(encoder.encode(userDTO.getPassword()));
        user.setRoles(Stream.of(roleRepository.findByName("ROLE_ADMIN")).collect(Collectors.toSet()));

        return userRepository.save(user);
    }

    //Update password
    public User update(UserDTO userDTO) {
        Optional<User> user = userRepository.findById(userDTO.getId());
        if(user.isPresent()){
            user.get().setUsername(userDTO.getUsername());
            if(userDTO.getPassword() != null)
                user.get().setPassword(encoder.encode(userDTO.getPassword()));

            return userRepository.save(user.get());
        }else{
            return null;
        }
    }

    public User getByUsername(String username){

        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent())
            return user.get();
        else
            throw new UsernameNotFoundException("Kullanıcı bulunamadı");

    }

    public String getRoleByUsername(String username){

        Optional<User> user = userRepository.findByUsername(username);
        if(username != null){
            String role = user.get().getRoles().iterator().next().getName();
            return role;
        }else
            throw new UsernameNotFoundException("Kullanıcı bulunamadı");

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> byUsername = userRepository.findByUsername(username);
        if (byUsername.isPresent()) {
            return new MyUserDetails(byUsername.get());
        }
        throw new UsernameNotFoundException("Kullanıcı bulunamadı");
    }
}
