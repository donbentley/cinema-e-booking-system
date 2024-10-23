package com.csci4050.user.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.csci4050.user.repositories.CustomerRepository;
import com.csci4050.user.repositories.UserRepository;
import com.csci4050.user.requests.CustomerRequest;
import com.csci4050.user.requests.PasswordChangeRequest;
import com.csci4050.paymentcard.converters.PaymentCardConverter;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.exceptions.CardAlreadyExists;
import com.csci4050.paymentcard.exceptions.TooManyCards;
import com.csci4050.paymentcard.requests.PaymentCardRequest;
import com.csci4050.user.entities.Customer;
import com.csci4050.user.entities.User;

@Service
public class UserService {
    
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

    public ResponseEntity<String> updateCustomerDetails(Integer id, CustomerRequest customerRequest) {
        Optional<Customer> existingCustomer = customerRepository.findById(id);
        
        if (!existingCustomer.isPresent()) {
            return new ResponseEntity<>("Customer not found", HttpStatus.NOT_FOUND);
        }

        Customer customerToUpdate = existingCustomer.get();
        User userToUpdate = customerToUpdate.getUser();
        if (userToUpdate.getUsername() != customerRequest.getUsername()
            && userRepository.existsByUsername(customerRequest.getUsername())) {
            return new ResponseEntity<>("Username is already taken", HttpStatus.BAD_REQUEST);
        }

        customerToUpdate.setFirst(customerRequest.getFirst());
        customerToUpdate.setLast(customerRequest.getLast());
        userToUpdate.setUsername(customerRequest.getUsername());
        customerRepository.save(customerToUpdate);
        userRepository.save(userToUpdate);

        return new ResponseEntity<>("Customer updated successfully", HttpStatus.OK);
    }

    public ResponseEntity<String> updatePassword(PasswordChangeRequest passwordChangeRequest) {
        
        Optional<User> existingUser = 
            userRepository.findByUsername(passwordChangeRequest.getUsernameOrEmail());
        
        if (!existingUser.isPresent()) {
            existingUser = userRepository.findByEmail(passwordChangeRequest.getUsernameOrEmail());
            if (!existingUser.isPresent()) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }
        }
        User user = existingUser.get();
        if (!passwordEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())) {
            return new ResponseEntity<>("Password is incorrect", HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));
        userRepository.save(user);
        return new ResponseEntity<>("New password saved successfully", HttpStatus.OK);
    }
}
