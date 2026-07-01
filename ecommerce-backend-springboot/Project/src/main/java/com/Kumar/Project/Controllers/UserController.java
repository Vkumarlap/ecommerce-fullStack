package com.Kumar.Project.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Kumar.Project.Model.Users;
import com.Kumar.Project.Services.UsersService;

@RestController
@RequestMapping("/user")
public class UserController {
    
    @Autowired
    UsersService service;

    @PostMapping("/register")
    public void addUser(@RequestBody Users user)
    {
        service.addUser(user);
    }

}
