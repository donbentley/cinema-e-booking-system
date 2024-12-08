package com.csci4050.order.exceptions;

public class TicketTypeNotFoundException extends RuntimeException {

    public TicketTypeNotFoundException(String message) {
        super(message);
    }
}
