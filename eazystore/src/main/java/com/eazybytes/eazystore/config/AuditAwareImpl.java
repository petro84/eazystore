package com.eazybytes.eazystore.config;

import com.eazybytes.eazystore.entity.Customer;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component("auditAwareImpl")
public class AuditAwareImpl implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return Optional.of("Anonymous user");
        }

        Object principal = auth.getPrincipal();
        String username = "";

        if (principal instanceof Customer customer) {
            username = customer.getEmail();
        } else {
            username = principal.toString();
        }

        return Optional.of(username);
    }

}
