package com.Kumar.Project.SpringSecurityy;

import org.springframework.beans.factory.annotation.Autowired;

// import java.net.http.HttpRequest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
   @Autowired 
   private JwtFilter jwtFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http){

        // http.csrf(customizer->customizer.withdefualt());
        http
        .csrf(Customizer->Customizer.disable())
        .cors(Customizer.withDefaults())
        .authorizeHttpRequests(request->request
            .requestMatchers("/user/register", "/user/login").permitAll()
            // .requestMatchers("/product/**").permitAll()
            .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults())
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);



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
    return new BCryptPasswordEncoder(12);
}



@Bean
public AuthenticationManager authenticationManager(
        AuthenticationConfiguration config) throws Exception {

    return config.getAuthenticationManager();
}



}
