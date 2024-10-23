package com.csci4050.user.converters;

import com.csci4050.user.entities.Address;
import com.csci4050.user.requests.AddressRequest;

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
