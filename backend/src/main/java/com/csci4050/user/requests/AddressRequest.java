package com.csci4050.user.requests;

import com.csci4050.user.entities.Customer;

import lombok.Data;

@Data
public class AddressRequest {
    private Integer id;
    private Customer customer;
    private String line1;
    private String line2;
    private String city;
    private String state;
    private int zip;
}
