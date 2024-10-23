package com.csci4050.paymentcard.converters;

import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.requests.PaymentCardRequest;

public class PaymentCardConverter {
    
    public static PaymentCard convert(PaymentCardRequest paymentCardRequest) {
        PaymentCard paymentCard = PaymentCard.builder()
            .cardNumber(paymentCardRequest.getCardNumber())
            .expDate(paymentCardRequest.getExpDate())
            .cvv(paymentCardRequest.getCvv())
            .customer(paymentCardRequest.getCustomer())
            .build();
        return paymentCard;
    }
}
