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
    public void saveContact(ContactRequestDto request) {
        Contact contact = transformToEntity(request);
        contactRepo.save(contact);
    }

    private Contact transformToEntity(ContactRequestDto request) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(request, contact);
        return contact;
    }
}
