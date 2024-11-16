package com.csci4050.showing.exceptions;

public class ShowingNotFoundException extends RuntimeException {
    public ShowingNotFoundException() {
        super("Showing not found");
    }
}
