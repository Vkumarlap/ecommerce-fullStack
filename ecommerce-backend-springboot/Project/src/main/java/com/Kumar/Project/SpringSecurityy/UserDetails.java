package com.Kumar.Project.SpringSecurityy;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Kumar.Project.Model.Users;
import com.Kumar.Project.Repository.UsersRepo;

@Service
public class UserDetails implements UserDetailsService {

   @Autowired
   UsersRepo repo;

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
          
      Users user=repo.findByusername(username);
      if(user ==null){
        throw new UsernameNotFoundException(username);
      }

      return  new UserPrinciples(user);

    }

    
}