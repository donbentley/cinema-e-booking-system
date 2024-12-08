package com.csci4050.order.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci4050.order.entities.TicketType;
import com.csci4050.order.repositories.TicketTypeRepository;

@Service
public class TicketTypeService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    // Fetch all ticket types
    public List<TicketType> getAllTicketTypes() {
        return ticketTypeRepository.findAll();
    }

    // Fetch a specific ticket type by ID
    public TicketType getTicketTypeById(Integer id) {
        return ticketTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TicketType not found with ID: " + id));
    }

    // Add a new ticket type
    public TicketType addTicketType(TicketType ticketType) {
        return ticketTypeRepository.save(ticketType);
    }

    // Update an existing ticket type
    public TicketType updateTicketType(Integer id, TicketType ticketType) {
        TicketType existingTicketType = ticketTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TicketType not found with ID: " + id));

        // Update fields (e.g., name and price)
        existingTicketType.setName(ticketType.getName());

        // Check if price is valid before setting it
        if (ticketType.getPrice() != 0.0) { // Ensure price is not 0.0 before updating
            existingTicketType.setPrice(ticketType.getPrice());
        }

        return ticketTypeRepository.save(existingTicketType);
    }

    // Delete a ticket type by ID
    public void deleteTicketType(Integer id) {
        if (!ticketTypeRepository.existsById(id)) {
            throw new RuntimeException("TicketType not found with ID: " + id);
        }
        ticketTypeRepository.deleteById(id);
    }
}
