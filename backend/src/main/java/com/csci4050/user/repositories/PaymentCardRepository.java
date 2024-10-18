package com.csci4050.user.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci4050.user.entities.Customer;
import com.csci4050.user.entities.PaymentCard;

@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, Integer> {
    PaymentCard findByCardNumber(String cardNumber);

    List<PaymentCard> findByCustomer(Customer customer);
}