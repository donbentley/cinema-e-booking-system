package com.csci4050.paymentcard.requests;

import com.csci4050.customer.entities.Customer;

import lombok.Data;

@Data
public class PaymentCardRequest {
    private Integer id;
    private String nickname;
    private String cardNumber;
    private String expDate;
    private String cvv;
    private String name;
    private Customer customer;
}