package com.eazybytes.eazystore.util;

import com.eazybytes.eazystore.constants.ApplicationConstants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final Environment env;

    public String generateJwtToken(Authentication authentication) {
        String jwt = "";

        String secret = env.getProperty(ApplicationConstants.JWT_SECRET_KEY, ApplicationConstants.JWT_SECRET_DEFAULT_VALUE);

        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        User fetchedUser = (User) authentication.getPrincipal();
        jwt = Jwts.builder().issuer("Eazy Bank").subject("JWT Token")
                .claim("username", Objects.requireNonNull(fetchedUser).getUsername())
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime() + 60 * 60 * 1000))
                .signWith(secretKey).compact();

        return jwt;
    }
}
