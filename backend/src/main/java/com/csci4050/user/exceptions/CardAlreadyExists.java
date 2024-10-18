package com.csci4050.user.exceptions;

public class CardAlreadyExists extends RuntimeException {
    public CardAlreadyExists() {
        super("Card already exists.");
    }
}
