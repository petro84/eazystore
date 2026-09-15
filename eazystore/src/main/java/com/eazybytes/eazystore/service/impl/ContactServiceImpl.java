package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.constants.ApplicationConstants;
import com.eazybytes.eazystore.dto.ContactRequestDto;
import com.eazybytes.eazystore.dto.ContactResponseDto;
import com.eazybytes.eazystore.entity.Contact;
import com.eazybytes.eazystore.exception.ResourceNotFoundException;
import com.eazybytes.eazystore.repository.ContactRepository;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements IContactService {
    private final ContactRepository contactRepo;

    @Override
    public void saveContact(ContactRequestDto request) {
        Contact contact = transformToEntity(request);
        contactRepo.save(contact);
    }

    @Override
    public List<ContactResponseDto> getAllOpenMessages() {
        List<Contact> contacts = contactRepo.findByStatus(ApplicationConstants.OPEN_MESSAGE);

        return contacts.stream().map(this::mapToContactResponseDto).toList();
    }

    @Override
    public void updateMessageStatus(Long contactId, String status) {
        Contact contact = contactRepo.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact", "ContactID", contactId.toString()));

        contact.setStatus(status);
        contactRepo.save(contact);
    }

    private Contact transformToEntity(ContactRequestDto request) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(request, contact);
        contact.setStatus(ApplicationConstants.OPEN_MESSAGE);
        return contact;
    }

    private ContactResponseDto mapToContactResponseDto(Contact contact) {
        return new ContactResponseDto(contact.getContactId(), contact.getName(), contact.getEmail(),
                contact.getMobileNumber(), contact.getMessage(), contact.getStatus());
    }
}
