package com.Kumar.Project.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Kumar.Project.Model.Users;
import com.Kumar.Project.Services.UsersService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    
    @Autowired
    UsersService service;

    @PostMapping("/register")
    public Users addUser(@RequestBody Users user)
    {
        return service.addUser(user);
    }

    @PostMapping("login")
    public String loginUser(@RequestBody Users user)
    {
         
        return service.verify(user);
    }

}
