package com.eazybytes.eazystore.controller;

import com.eazybytes.eazystore.dto.ContactRequestDto;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contacts")
@RequiredArgsConstructor
public class ContactController {

    private final IContactService contactSvc;

    @PostMapping
    public String saveContact(@RequestBody ContactRequestDto request) {
        boolean isSaved = contactSvc.saveContact(request);

        if (isSaved) {
            return "Request processed successfully";
        } else {
            return "An error occurred. Please try again or contact support.";
        }
    }

}
