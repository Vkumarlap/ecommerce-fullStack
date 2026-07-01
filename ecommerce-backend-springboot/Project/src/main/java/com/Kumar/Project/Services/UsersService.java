package com.Kumar.Project.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Kumar.Project.Model.Users;
import com.Kumar.Project.Repository.UsersRepo;

@Service
public class UsersService {
   @Autowired
    UsersRepo repo;

public void addUser(Users user){
repo.save(user);
}

}
