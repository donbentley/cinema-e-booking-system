package com.csci4050.customer.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

import com.csci4050.user.repositories.UserRepository;
import com.csci4050.user.requests.PasswordChangeRequest;
import com.csci4050.customer.entities.Customer;
import com.csci4050.customer.repositories.CustomerRepository;
import com.csci4050.customer.requests.CustomerRequest;
import com.csci4050.user.entities.User;

import java.util.Collections;

@Service
public class CustomerService {
    
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Customer getCustomerById(Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.orElse(null);
    }

    public Customer getCustomerDetails() {
        String email = (String)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            return null;
        }
        User existingUser = user.get();
        Optional<Customer> customer = customerRepository.findByUserId(existingUser.getId());
        if (!customer.isPresent()) {
            return null;
        }
        return customer.get();
    }

    public ResponseEntity<?> updateCustomerDetails(Integer id, CustomerRequest customerRequest) {
        Optional<Customer> existingCustomer = customerRepository.findById(id);
        
        if (!existingCustomer.isPresent()) {
            return new ResponseEntity<>(Collections.singletonMap("msg", "Customer not found"), HttpStatus.NOT_FOUND);
        }

        Customer customerToUpdate = existingCustomer.get();
        User userToUpdate = customerToUpdate.getUser();
        if (!userToUpdate.getUsername().equals(customerRequest.getUsername())
            && userRepository.existsByUsername(customerRequest.getUsername())) {
            return new ResponseEntity<>(Collections.singletonMap("msg", "Username is already taken"), HttpStatus.BAD_REQUEST);
        }

        customerToUpdate.setFirst(customerRequest.getFirst());
        customerToUpdate.setLast(customerRequest.getLast());
        customerToUpdate.setPromotionsSubscriber(customerRequest.isPromotionsSubscriber());
        userToUpdate.setUsername(customerRequest.getUsername());
        customerRepository.save(customerToUpdate);
        userRepository.save(userToUpdate);

        return new ResponseEntity<>(Collections.singletonMap("msg", "Customer updated successfully"), HttpStatus.OK);
    }

    public ResponseEntity<?> updatePassword(PasswordChangeRequest passwordChangeRequest) {
        
        Optional<User> existingUser = 
            userRepository.findByUsername(passwordChangeRequest.getUsernameOrEmail());
        
        if (!existingUser.isPresent()) {
            existingUser = userRepository.findByEmail(passwordChangeRequest.getUsernameOrEmail());
            if (!existingUser.isPresent()) {
                return new ResponseEntity<>(Collections.singletonMap("msg", "User not found"), HttpStatus.NOT_FOUND);
            }
        }
        User user = existingUser.get();
        if (!passwordEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())) {
            return new ResponseEntity<>(Collections.singletonMap("msg", "Password is incorrect"), HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
        userRepository.save(user);
        return new ResponseEntity<>(Collections.singletonMap("msg", "New password saved successfully"), HttpStatus.OK);
    }
}
