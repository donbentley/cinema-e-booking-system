package com.csci4050.promotion.exceptions;

public class ActivePromotionException extends RuntimeException {
    public ActivePromotionException() {
        super("Promotion is already active");
    }
}
