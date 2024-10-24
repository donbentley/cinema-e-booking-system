package com.csci4050.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csci4050.user.requests.CustomerRequest;
import com.csci4050.user.requests.PasswordChangeRequest;
import com.csci4050.user.services.CustomerService;
import com.csci4050.user.entities.Customer;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService userService;

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomer(@PathVariable Integer id) {
        Customer customer = userService.getCustomerById(id);
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateCustomerDetails(@PathVariable Integer id, @RequestBody CustomerRequest userRequest) {
        ResponseEntity<String> result = userService.updateCustomerDetails(id, userRequest);
        return result;
    }

    @PutMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        ResponseEntity<String> result = userService.updatePassword(passwordChangeRequest);
        return result;
    }
}