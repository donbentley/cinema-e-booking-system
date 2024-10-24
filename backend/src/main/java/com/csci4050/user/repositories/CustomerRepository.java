package com.csci4050.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.csci4050.user.entities.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    public Customer findByVerificationCode(String code);
}
