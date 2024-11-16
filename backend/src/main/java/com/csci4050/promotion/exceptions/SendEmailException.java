package com.csci4050.promotion.exceptions;

public class SendEmailException extends RuntimeException {
    public SendEmailException() {
        super("An error has occured while sending the email to the mailing list.");
    }
}
