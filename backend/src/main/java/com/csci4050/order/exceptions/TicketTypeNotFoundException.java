package com.csci4050.order.exceptions;

public class TicketTypeNotFoundException extends RuntimeException {

    public TicketTypeNotFoundException() {
        super("Ticket type not found");
    }
}
