package com.csci4050.order.controllers;


import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csci4050.order.entities.NewOrder;
import com.csci4050.order.entities.TicketType;
import com.csci4050.order.requests.PriceRequest;
import com.csci4050.order.services.NewOrderService;
import com.csci4050.order.services.NewTicketService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/order")
public class NewOrderController {

    @Autowired
    private NewOrderService orderService;
    @Autowired
    private NewTicketService ticketService;

    @GetMapping("/getPrice")
    public ResponseEntity<?> getPrice(@RequestBody PriceRequest priceRequest) {
        try {
            NewOrder result = orderService.getPrice(priceRequest); 
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/book")
    public ResponseEntity<?> addOrder(@RequestBody NewOrder orderRequest) {
        try {
            NewOrder result = orderService.addOrder(orderRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer id) {
        try {
            String result = orderService.deleteOrder(id);
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getTicketPrices")
    public ResponseEntity<?> getTicketPrices() {
        try {
            List<TicketType> result = ticketService.getAllTicketTypes();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", "Error fetching data"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
}
