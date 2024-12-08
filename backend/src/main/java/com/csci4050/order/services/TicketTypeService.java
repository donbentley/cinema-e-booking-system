package com.csci4050.order.services;

import com.csci4050.order.entities.TicketType;
import com.csci4050.order.repositories.TicketTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TicketTypeService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    // Get TicketType by ID
    public TicketType getTicketTypeById(Long id) {
        Optional<TicketType> optionalTicketType = ticketTypeRepository.findById(id);
        return optionalTicketType.orElse(null);
    }

    // Add a new TicketType
    public TicketType addTicketType(TicketType ticketType) {
        // Perform any additional validation or processing here if needed
        return ticketTypeRepository.save(ticketType);
    }

    // Update an existing TicketType
    public TicketType updateTicketType(TicketType ticketType) {
        // Ensure the ticket type exists before updating
        if (ticketTypeRepository.existsById(ticketType.getId())) {
            return ticketTypeRepository.save(ticketType);
        } else {
            throw new IllegalArgumentException("Ticket Type not found with ID: " + ticketType.getId());
        }
    }

    // Delete TicketType by ID
    public void deleteTicketType(Long id) {
        if (ticketTypeRepository.existsById(id)) {
            ticketTypeRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Ticket Type not found with ID: " + id);
        }
    }

    // Get all TicketTypes
    public List<TicketType> getAllTicketTypes() {
        return ticketTypeRepository.findAll();
    }
}
