package com.csci4050.promotion.exceptions;

public class InactivePromotionException extends RuntimeException {
    public InactivePromotionException() {
        super("Promotion is not active");
    }
}
