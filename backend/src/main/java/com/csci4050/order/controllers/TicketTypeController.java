package com.csci4050.order.controllers;

import com.csci4050.order.entities.TicketType;
import com.csci4050.order.services.TicketTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ticket-type")
public class TicketTypeController {

    @Autowired
    private TicketTypeService ticketTypeService;

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getTicketType(@PathVariable Long id) {
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
    public ResponseEntity<?> deleteTicketType(@PathVariable Long id) {
        ticketTypeService.deleteTicketType(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateTicketType(@RequestBody TicketType ticketType) {
        TicketType updatedTicketType = ticketTypeService.updateTicketType(ticketType);
        return new ResponseEntity<>(updatedTicketType, HttpStatus.OK);
    }
}
