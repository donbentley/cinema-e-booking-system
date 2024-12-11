package com.csci4050.order.exceptions;

public class InvalidPriceException extends RuntimeException {
    public InvalidPriceException() {
        super("The order price is not correct for the given tickets and promotion");
    }
}
