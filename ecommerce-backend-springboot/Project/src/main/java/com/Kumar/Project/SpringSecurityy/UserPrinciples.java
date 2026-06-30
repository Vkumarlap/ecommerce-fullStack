package com.Kumar.Project.SpringSecurityy;

import java.util.Collection;

import java.util.Collections;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.Kumar.Project.Model.Users;

public class UserPrinciples implements UserDetails {

    Users user;
    public UserPrinciples(Users user)
    {  
   this.user=user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public @Nullable String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
       return user.getUsername();
    }
    
}
