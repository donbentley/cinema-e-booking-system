package com.csci4050.showing.exceptions;

public class TimeConflictException extends RuntimeException {
    public TimeConflictException() {
        super("There is a time conflict with another showing in this showroom at the specified date and time.");
    }
}
