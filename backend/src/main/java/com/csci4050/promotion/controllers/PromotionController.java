package com.csci4050.promotion.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.exceptions.ActivePromotionException;
import com.csci4050.promotion.exceptions.InactivePromotionException;
import com.csci4050.promotion.exceptions.PromotionNotFoundException;
import com.csci4050.promotion.exceptions.SendEmailException;
import com.csci4050.promotion.requests.PromotionRequest;
import com.csci4050.promotion.services.PromotionService;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping("/promotion")
public class PromotionController {
    
    @Autowired
    private PromotionService promotionService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllPromotions() {
        try {
            List<Promotion> result = promotionService.getAllPromotions();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", "Error fetching data"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addNew")
    public ResponseEntity<?> addPromotion(@RequestBody PromotionRequest promotionRequest) {
        try {
            Promotion result = promotionService.addPromotion(promotionRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPromotionById(@PathVariable Integer id) {
        try {
            Promotion result = promotionService.getPromotionById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PromotionNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/redeem/{id}")
    public ResponseEntity<?> redeemPromotionById(@PathVariable Integer id) {
        try {
            Promotion result = promotionService.redeemPromotionById(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PromotionNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePromotion(@PathVariable Integer id, @RequestBody Promotion promotion) {
        try {
            Promotion result = promotionService.updatePromotion(id, promotion);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (PromotionNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePromotion(@PathVariable Integer id) {
        try { 
            String result = promotionService.deletePromotion(id);
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } catch (PromotionNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/activate/{id}")
    public ResponseEntity<?> activatePromotion(@PathVariable Integer id) {
        try {
            String result = promotionService.activatePromotion(id);
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } catch (PromotionNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (ActivePromotionException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (SendEmailException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/send-promotion/{id}")
    public ResponseEntity<?> sendPromotion(@PathVariable Integer id) {
        try {
            String result = promotionService.sendPromotionEmailById(id);
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } catch (PromotionNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (InactivePromotionException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        } catch (SendEmailException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
