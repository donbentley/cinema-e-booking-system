package com.csci4050.address.exceptions;

public class AddressAlreadyLinked extends RuntimeException {
    public AddressAlreadyLinked() {
        super("Address already linked to this customer");
    }
    
}
