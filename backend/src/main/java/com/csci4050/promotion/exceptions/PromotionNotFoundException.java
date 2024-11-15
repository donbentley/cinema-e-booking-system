package com.csci4050.promotion.exceptions;

public class PromotionNotFoundException extends RuntimeException {
    public PromotionNotFoundException() {
        super("Promotion not found");
    }
}
