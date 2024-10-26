package com.csci4050.paymentcard.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.requests.PaymentCardRequest;
import com.csci4050.paymentcard.services.PaymentCardService;

@CrossOrigin(origins = "http://localhost:3000") 
@RestController
@RequestMapping("/payment-card")
public class PaymentCardController {

    @Autowired
    private PaymentCardService paymentCardService;

    @PostMapping("/addNew")
    public ResponseEntity<String> addPaymentCard(@RequestBody PaymentCardRequest paymentCardRequest) {
        try {
            String result = paymentCardService.addCard(paymentCardRequest);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentCard> getPaymentCard(@PathVariable Integer id) {
        PaymentCard paymentCard = paymentCardService.getPaymentCardById(id);
        if (paymentCard != null) {
            return new ResponseEntity<>(paymentCard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePaymentCard(@PathVariable Integer id) {
        String result = paymentCardService.deletePaymentCard(id);
        if (result.equals("Card deleted successfully")) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updatePaymentCard(@PathVariable Integer id, @RequestBody PaymentCardRequest paymentCardRequest) {
        String result = paymentCardService.updatePaymentCard(id, paymentCardRequest);
        if (result.equals("Card updated successfully")) {
            return new ResponseEntity<>(result, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(result, HttpStatus.NOT_FOUND);
        }
    }
    
}
