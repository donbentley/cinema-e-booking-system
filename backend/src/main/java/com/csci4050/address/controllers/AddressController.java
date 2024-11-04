package com.csci4050.address.controllers;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csci4050.address.entities.Address;
import com.csci4050.address.requests.AddressRequest;
import com.csci4050.address.services.AddressService;

@RestController
@RequestMapping("/address")
public class AddressController {
    
    @Autowired
    private AddressService addressService;

    @PostMapping("/addNew")
    public ResponseEntity<?> addAddress(@RequestBody AddressRequest addressRequest) {
        try {
            String result = addressService.addAddress(addressRequest);
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Address> getAddress(@PathVariable Integer id) {
        Address address = addressService.getAddressById(id);
        if (address != null) {
            return new ResponseEntity<>(address, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteAddress(@PathVariable Integer id) {
        String result = addressService.deleteAddress(id);
        if (result.equals("Address deleted successfully")) {
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateAddress(@PathVariable Integer id, @RequestBody AddressRequest addressRequest) {
        String result = addressService.updateAddress(id, addressRequest);
        if (result.equals("Address saved successfully")) {
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.NOT_FOUND);
        }
    }
}
