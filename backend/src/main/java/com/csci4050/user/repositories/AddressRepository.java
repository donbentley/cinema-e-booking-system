package com.csci4050.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.csci4050.user.entities.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {
    
}
