package com.csci4050.user.requests;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private String username;
    private String password;
    private String first;
    private String last;
}
