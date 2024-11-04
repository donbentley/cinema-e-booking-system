package com.csci4050.paymentcard.converters;

import org.springframework.beans.factory.annotation.Autowired;

import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.requests.PaymentCardRequest;

public class PaymentCardConverter {
    @Autowired
    
    
    public static PaymentCard convert(PaymentCardRequest paymentCardRequest) {
        PaymentCard paymentCard = PaymentCard.builder()
            .id(paymentCardRequest.getId())
            .nickname(paymentCardRequest.getNickname())
            .cardNumber(paymentCardRequest.getCardNumber())
            .expDate(paymentCardRequest.getExpDate())
            .cvv(paymentCardRequest.getCvv())
            .name(paymentCardRequest.getName())
            .customer(paymentCardRequest.getCustomer())
            .build();
        return paymentCard;
    }
}
