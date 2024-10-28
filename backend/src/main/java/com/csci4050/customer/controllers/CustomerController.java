package com.csci4050.customer.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csci4050.customer.entities.Customer;
import com.csci4050.customer.requests.CustomerRequest;
import com.csci4050.customer.services.CustomerService;
import com.csci4050.user.requests.PasswordChangeRequest;
import java.util.Collections;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
    private CustomerService userService;

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getCustomer(@PathVariable Integer id) {
        Customer customer = userService.getCustomerById(id);
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("Error", "Customer not found"), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/customer-info")
    public ResponseEntity<?> getCustomerInfo() {
        Customer customer = userService.getCustomerDetails();
        if (customer != null) {
            return new ResponseEntity<>(customer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("Error", "Customer not found"), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/put/{id}")
    public ResponseEntity<?> updateCustomerDetails(@PathVariable Integer id, @RequestBody CustomerRequest userRequest) {
        ResponseEntity<?> result = userService.updateCustomerDetails(id, userRequest);
        return result;
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody PasswordChangeRequest passwordChangeRequest) {
        ResponseEntity<?> result = userService.updatePassword(passwordChangeRequest);
        return result;
    }
}