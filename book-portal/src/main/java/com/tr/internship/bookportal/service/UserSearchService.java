package com.tr.internship.bookportal.service;

import com.tr.internship.bookportal.dao.UserRepository;
import com.tr.internship.bookportal.entity.Book;
import com.tr.internship.bookportal.entity.Role;
import com.tr.internship.bookportal.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserSearchService {

    @Autowired
    UserRepository userRepository;

    public Page<List<User>> getAllByUsername(String key, int pageSize, int pageNumber) {
        Pageable paged = PageRequest.of(pageNumber, pageSize);
        return userRepository.findAllByUsernameContainingOrUsernameContainsIgnoreCase (key,key,paged);
    }

    public List<User> getAllByRole(String key, int pageSize, int pageNumber) {

        List<User> users = userRepository.findAll();
        List<User> responseList = new ArrayList<>();
        for(User user:users){
            String role = user.getRoles().iterator().next().getName();
            if(role.equalsIgnoreCase(key) || role.matches(key))
                responseList.add(user);
            if(responseList.size() == pageSize)
                break;
        }

        return responseList;
    }

}
