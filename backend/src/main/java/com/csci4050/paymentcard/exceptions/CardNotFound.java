package com.csci4050.paymentcard.exceptions;

public class CardNotFound extends RuntimeException {
    public CardNotFound() {
        super("Card not found.");
    }
}
