package com.tr.internship.bookportal.dao;

import com.tr.internship.bookportal.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    boolean existsByName(String name);
    Role findByName(String name);
}
