package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.dto.PaymentIntentRequestDto;
import com.eazybytes.eazystore.dto.PaymentIntentResponseDto;
import com.eazybytes.eazystore.service.IPaymentService;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements IPaymentService {
    @Override
    public PaymentIntentResponseDto createPaymentIntent(PaymentIntentRequestDto request) {
        try {
            PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                    .setAmount(request.amount())
                    .setCurrency(request.currency())
                    .addPaymentMethodType("card")
                    .build();

            PaymentIntent paymentIntent = PaymentIntent.create(params);
            return new PaymentIntentResponseDto(paymentIntent.getClientSecret());
        } catch (Exception e) {
            throw new RuntimeException("Failed to create paymentIntent", e);
        }
    }
}
