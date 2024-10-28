package com.csci4050.customer.requests;

import com.csci4050.user.entities.User;

import lombok.Data;

@Data
public class CustomerRequest {

    private String username;
    private String first;
    private String last;
    private boolean promotionsSubscriber;
}
