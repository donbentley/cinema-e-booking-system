package com.csci4050.customer.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci4050.customer.entities.Customer;

import java.util.Optional;
import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    Optional<Customer> findByVerificationCode(String code);
    Optional<Customer> findByUserId(Integer id);
    List<Customer> findAllByPromotionsSubscriberTrue();

}
