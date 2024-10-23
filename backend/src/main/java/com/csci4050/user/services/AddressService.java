package com.csci4050.user.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci4050.user.converters.AddressConverter;
import com.csci4050.user.entities.Address;
import com.csci4050.user.exceptions.AddressAlreadyLinked;
import com.csci4050.user.repositories.AddressRepository;
import com.csci4050.user.requests.AddressRequest;

@Service
public class AddressService {
    
    @Autowired
    private AddressRepository addressRepository;

    public String addAddress(AddressRequest addressRequest) {
        Optional<Address> findByCustomer = addressRepository.findByCustomer(addressRequest.getCustomer());
        if (findByCustomer.isPresent()) { throw new AddressAlreadyLinked(); }

        Address address = AddressConverter.convert(addressRequest);
        addressRepository.save(address);
        return ("Address added successfully");
    }

    public Address getAddressById(Integer id) {
        Optional<Address> address = addressRepository.findById(id);
        return address.orElse(null);
    }

    public String deleteAddress(Integer id) {
        if (addressRepository.existsById(id)) {
            addressRepository.deleteById(id);
            return("Address deleted successfully");
        } else { return ("Address not found"); }
    }

    public String updateAddress(Integer id, AddressRequest addressRequest) {
        Optional<Address> existingAddress = addressRepository.findById(id);
        if (existingAddress.isPresent()) {
            Address addressToUpdate = existingAddress.get();
            Address updatedAddress = AddressConverter.convert(addressRequest);
            updatedAddress.setId(addressToUpdate.getId());
            addressRepository.save(updatedAddress);
            return ("Address saved successfully");
        } else { return ("Address not found"); }
    }
}
