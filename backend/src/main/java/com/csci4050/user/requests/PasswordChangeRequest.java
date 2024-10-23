package com.csci4050.user.requests;

import lombok.Data;

@Data
public class PasswordChangeRequest {
    private String usernameOrEmail;
    private String oldPassword;
    private String newPassword;
}
