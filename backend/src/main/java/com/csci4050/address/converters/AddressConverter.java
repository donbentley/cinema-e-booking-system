package com.csci4050.address.converters;

import com.csci4050.address.entities.Address;
import com.csci4050.address.requests.AddressRequest;

public class AddressConverter {
    
    public static Address convert(AddressRequest addressRequest) {
        Address address = Address.builder()
            .line1(addressRequest.getLine1())
            .line2(addressRequest.getLine2())
            .city(addressRequest.getCity())
            .state(addressRequest.getState())
            .zip(addressRequest.getZip())
            .customer(addressRequest.getCustomer())
            .build();
        return address;
    }
}
