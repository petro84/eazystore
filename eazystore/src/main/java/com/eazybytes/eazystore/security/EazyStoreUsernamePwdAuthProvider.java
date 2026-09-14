package com.eazybytes.eazystore.security;

import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.entity.Role;
import com.eazybytes.eazystore.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.Nullable;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@RequiredArgsConstructor
public class EazyStoreUsernamePwdAuthProvider implements AuthenticationProvider {
    private final CustomerRepository customerRepo;
    private final PasswordEncoder passwordEncoder;

    @Override
    public @Nullable Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String username = authentication.getName();
        String pwd = Objects.requireNonNull(authentication.getCredentials()).toString();
        Customer customer = customerRepo.findByEmail(username).orElseThrow(() ->
                new UsernameNotFoundException("User details not found for user: " + username));
        Set<Role> roles = customer.getRoles();
        List<SimpleGrantedAuthority> authorities = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName())).toList();

        if (passwordEncoder.matches(pwd, customer.getPasswordHash())) {
            return new UsernamePasswordAuthenticationToken(customer, null, authorities);
        } else {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return (UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication));
    }
}
