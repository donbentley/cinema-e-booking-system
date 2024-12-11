package com.csci4050.order.requests;

import com.csci4050.order.entities.TicketType;
import com.csci4050.showing.entities.Showing;

import lombok.Data;

@Data
public class TicketRequest {
    private Showing showing;
    private TicketType ticketType;
    private Integer seatNumber;
}
