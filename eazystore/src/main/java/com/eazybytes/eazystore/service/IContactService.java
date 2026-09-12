package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.ContactRequestDto;

public interface IContactService {

    void saveContact(ContactRequestDto request);

}
