package com.csci4050.user.requests;

import com.csci4050.user.entities.User;

import lombok.Data;

@Data
public class CustomerRequest {

    private Integer id;
    private String username;
    private String first;
    private String last;
}
