package com.csci4050.order.exceptions;

public class InvalidSeatException extends RuntimeException {
    public InvalidSeatException() {
        super("Seat is not valid for the given showtime");
    }
}
