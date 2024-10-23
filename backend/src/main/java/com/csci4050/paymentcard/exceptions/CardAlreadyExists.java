package com.csci4050.paymentcard.exceptions;

public class CardAlreadyExists extends RuntimeException {
    public CardAlreadyExists() {
        super("Card already exists.");
    }
}
