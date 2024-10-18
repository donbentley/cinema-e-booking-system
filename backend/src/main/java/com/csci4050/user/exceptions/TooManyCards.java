package com.csci4050.user.exceptions;

public class TooManyCards extends RuntimeException {
    public TooManyCards() {
        super("Too many cards. Delete a card before adding a new one.");
    }
}
