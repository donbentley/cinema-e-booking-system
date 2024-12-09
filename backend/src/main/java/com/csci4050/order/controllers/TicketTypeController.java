package com.csci4050.order.controllers;

import java.util.List;

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

import com.csci4050.order.entities.TicketType;
import com.csci4050.order.services.TicketTypeService;

@RestController
@RequestMapping("/ticket-type")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React app
public class TicketTypeController {

    @Autowired
    private TicketTypeService ticketTypeService;

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTicketType(@PathVariable Integer id) {
        TicketType ticketType = ticketTypeService.getTicketTypeById(id);
        if (ticketType != null) {
            return new ResponseEntity<>(ticketType, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Ticket Type not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addTicketType(@RequestBody TicketType ticketType) {
        TicketType savedTicketType = ticketTypeService.addTicketType(ticketType);
        return new ResponseEntity<>(savedTicketType, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteTicketType(@PathVariable Integer id) {
        ticketTypeService.deleteTicketType(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTicketType(@RequestBody TicketType ticketType) {
        TicketType updatedTicketType = ticketTypeService.updateTicketType(ticketType.getId(), ticketType);
        return new ResponseEntity<>(updatedTicketType, HttpStatus.OK);
    }

    // New endpoint to fetch all ticket types
    @GetMapping("/get-all")
    public ResponseEntity<List<TicketType>> getAllTicketTypes() {
        List<TicketType> ticketTypes = ticketTypeService.getAllTicketTypes();
        return new ResponseEntity<>(ticketTypes, HttpStatus.OK);
    }
}
