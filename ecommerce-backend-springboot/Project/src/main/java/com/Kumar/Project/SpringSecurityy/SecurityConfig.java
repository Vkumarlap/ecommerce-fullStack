package com.Kumar.Project.SpringSecurityy;

import java.net.http.HttpRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){

        // http.csrf(customizer->customizer.withdefualt());
        http
        .csrf(Customizer->Customizer.disable())
        .authorizeHttpRequests(request->request.anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults());



        return http.build();
    }
@Bean
public DaoAuthenticationProvider AuthenticationProvider(UserDetailsService userDetails,PasswordEncoder PE){
    DaoAuthenticationProvider provider=new DaoAuthenticationProvider(userDetails);
    provider.setPasswordEncoder(PE);

    return provider;
}


@Bean
public PasswordEncoder passwordEncoder(){
    return NoOpPasswordEncoder.getInstance();
}



}
