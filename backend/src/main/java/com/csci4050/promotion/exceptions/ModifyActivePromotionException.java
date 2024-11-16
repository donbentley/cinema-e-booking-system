package com.csci4050.promotion.exceptions;

public class ModifyActivePromotionException extends RuntimeException {
    public ModifyActivePromotionException() {
        super("Promotion is active and cannot be modified");
    }
}
