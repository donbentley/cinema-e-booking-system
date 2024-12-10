package com.csci4050.order.exceptions;

public class SeatBookedException extends RuntimeException {
    public SeatBookedException() {
        super("Seat is booked for this showing");
    }
}
