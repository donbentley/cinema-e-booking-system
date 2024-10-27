package com.csci4050.user.responses;

import lombok.Data;
import java.util.Set;

@Data
public class UserResponse {
    private String token;
    private Set<String> roles;
}
