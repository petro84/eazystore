package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.ProfileRequestDto;
import com.eazybytes.eazystore.dto.ProfileResponseDto;
import com.eazybytes.eazystore.entity.Address;
import com.eazybytes.eazystore.entity.Customer;
import com.eazybytes.eazystore.repository.CustomerRepository;
import com.eazybytes.eazystore.service.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements IProfileService {

    private final CustomerRepository customerRepo;

    @Override
    public ProfileResponseDto getProfile() {
        Customer customer = getAuthCustomer();
        return mapCustomerToProfileResponseDto(customer);
    }

    @Override
    public ProfileResponseDto updateProfile(ProfileRequestDto request) {
        Customer customer = getAuthCustomer();
        boolean isEmailUpdated = !customer.getEmail().equals(request.getEmail().trim());
        BeanUtils.copyProperties(request, customer);
        Address address = customer.getAddress();

        if (address == null) {
            address = new Address();
            address.setCustomer(customer);
        }

        address.setStreet(request.getStreet());
        address.setCity(request.getCity());
        address.setState(request.getState());
        address.setPostalCode(request.getPostalCode());
        address.setCountry(request.getCountry());
        customer.setAddress(address);

        customer = customerRepo.save(customer);

        ProfileResponseDto responseDto = mapCustomerToProfileResponseDto(customer);
        responseDto.setEmailUpdated(isEmailUpdated);

        return responseDto;
    }

    public Customer getAuthCustomer() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        assert auth != null;
        String email = auth.getName();
        return customerRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private ProfileResponseDto mapCustomerToProfileResponseDto(Customer customer) {
        ProfileResponseDto responseDto = new ProfileResponseDto();
        BeanUtils.copyProperties(customer, responseDto);

        if (customer.getAddress() != null) {
            responseDto.setStreet(customer.getAddress().getStreet());
            responseDto.setCity(customer.getAddress().getCity());
            responseDto.setState(customer.getAddress().getState());
            responseDto.setPostalCode(customer.getAddress().getPostalCode());
            responseDto.setCountry(customer.getAddress().getCountry());
        } else {
            responseDto.setStreet("");
            responseDto.setCity("");
            responseDto.setState("");
            responseDto.setPostalCode("");
            responseDto.setCountry("");
        }

        return responseDto;
    }
}
