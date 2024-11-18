package com.csci4050.showroom.exceptions;

public class ShowroomNotFoundException extends RuntimeException {
    public ShowroomNotFoundException() {
        super("Showroom not found");
    }
}
