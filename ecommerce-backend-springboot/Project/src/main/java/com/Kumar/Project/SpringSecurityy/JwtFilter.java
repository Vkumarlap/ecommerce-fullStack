package com.Kumar.Project.SpringSecurityy;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.Kumar.Project.Services.JWTServices;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component 
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    JWTServices jwtService;

    @Autowired
    UserDetailsService userDetailsService;



    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;

        // 1. Get JWT from Authorization header
        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            token = authHeader.substring(7);

            // 2. Extract username from JWT
            username = jwtService.extractUserName(token);
        }

        // 3. Check if username exists and user is not already authenticated
        if (username != null
                && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 4. Load user from database
            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            // 5. Validate JWT
            if (jwtService.validateToken(token, userDetails)) {

                // 6. Create authentication object
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                // 7. Add request details
                authentication.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                // 8. Tell Spring Security that user is authenticated
                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);
            }
        }

        // 9. Continue to the next filter
        filterChain.doFilter(request, response);
    }
}