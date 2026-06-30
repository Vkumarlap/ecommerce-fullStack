package com.Kumar.Project.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Kumar.Project.Model.Users;

@Repository
public interface UsersRepo extends JpaRepository<Users,Integer> {
    

    Users findByusername(String username);
}
