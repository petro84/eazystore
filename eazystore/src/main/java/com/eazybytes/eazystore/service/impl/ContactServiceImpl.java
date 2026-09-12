package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ContactRequestDto;
import com.eazybytes.eazystore.entity.Contact;
import com.eazybytes.eazystore.repository.ContactRepository;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements IContactService {
    private final ContactRepository contactRepo;

    @Override
    public boolean saveContact(ContactRequestDto request) {
        try {
            Contact contact = transformToEntity(request);
            contact.setCreatedAt(Instant.now());
            contact.setCreatedBy(request.getName());
            contactRepo.save(contact);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private Contact transformToEntity(ContactRequestDto request) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(request, contact);
        return contact;
    }
}
