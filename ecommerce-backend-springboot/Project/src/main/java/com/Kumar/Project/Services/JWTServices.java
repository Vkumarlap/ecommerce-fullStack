package com.Kumar.Project.Services;

import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JWTServices {

    private String secretKey = "";

    public JWTServices() {

        try {

            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");

            SecretKey sk = keyGen.generateKey();

            secretKey = Base64.getEncoder()
                    .encodeToString(sk.getEncoded());

        } catch (NoSuchAlgorithmException e) {

            throw new RuntimeException(e);
        }
    }

    // Generate JWT token
    public String generateToken(String username) {

        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(
                    new Date(System.currentTimeMillis() + 60 * 60 * 1000)
                )
                .and()
                .signWith(getKey())
                .compact();
    }

    // Get secret key
    public SecretKey getKey() {

        byte[] keyBytes = Base64.getDecoder()
                .decode(secretKey);

        return Keys.hmacShaKeyFor(keyBytes);
    }

    // Extract username from JWT
    public String extractUserName(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    // Validate JWT
    public boolean validateToken(
            String token,
            UserDetails userDetails) {

        final String username = extractUserName(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

    // Check whether token is expired
    private boolean isTokenExpired(String token) {

        return extractExpiration(token)
                .before(new Date());
    }

    // Extract expiration date from JWT
    private Date extractExpiration(String token) {

        return Jwts.parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration();
    }
}