package com.Kumar.Project.Services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.Kumar.Project.Model.Users;
import com.Kumar.Project.Repository.UsersRepo;

@Service
public class UsersService {
   @Autowired
    UsersRepo repo;

   @Autowired 
   AuthenticationManager authenticationManager;

   @Autowired 
   JWTServices jwtServices;


  private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

public Users addUser(Users user){

   user.setPassword(encoder.encode(user.getPassword()));

   return repo.save(user);

}

public String verify(Users user) {
   

   Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                user.getUsername(),
                                user.getPassword()
                        )
                );

        if (authentication.isAuthenticated()) {
                System.out.println("*********"+jwtServices.generateToken(user.getUsername())+"**************");
            return jwtServices.generateToken(user.getUsername());
        }

        return "failed";
}

}
