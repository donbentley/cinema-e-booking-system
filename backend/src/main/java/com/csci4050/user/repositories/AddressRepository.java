package com.csci4050.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.csci4050.user.entities.Address;
import com.csci4050.user.entities.Customer;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    Optional<Address> findByCustomer(Customer customer);
}
