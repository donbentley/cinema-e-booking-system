package com.csci4050.user.controllers;

import com.csci4050.user.entities.Role;
import com.csci4050.user.entities.User;
import com.csci4050.user.entities.Customer.UserStatus;
import com.csci4050.user.entities.Customer;
import com.csci4050.user.requests.LoginRequest;
import com.csci4050.user.requests.SignupRequest;
import com.csci4050.user.repositories.CustomerRepository;
import com.csci4050.user.repositories.RoleRepository;
import com.csci4050.user.repositories.UserRepository;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<String> authenticateUser(@RequestBody LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getUsernameOrEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        return new ResponseEntity<>("User signed-in successfully!.", HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signupRequest){

        // add check for username exists in a DB
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return new ResponseEntity<>("Username is already taken!", HttpStatus.BAD_REQUEST);
        }
    
        // add check for email exists in DB
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }
    
        // create user object
        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        Role roles = roleRepository.findByName("ROLE_CUSTOMER").get();
        user.setRoles(Collections.singleton(roles));
        User newUser = userRepository.save(user);

        // create customer object
        Customer customer = new Customer();

        customer.setUser(newUser);
        customer.setFirst(signupRequest.getFirst());
        customer.setLast(signupRequest.getLast());
        customer.setStatus(UserStatus.INACTIVE);
        customer.setVerificationCode(RandomStringUtils.randomAlphanumeric(64));
        customerRepository.save(customer);
        return new ResponseEntity<>("User registered successfully", HttpStatus.OK);
    }

    public 
}