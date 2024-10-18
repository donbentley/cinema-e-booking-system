package com.csci4050.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.csci4050.user.entities.BillingAddress;

@Repository
public interface BillingAddressRepository extends JpaRepository<BillingAddress, Integer> {
    
}
