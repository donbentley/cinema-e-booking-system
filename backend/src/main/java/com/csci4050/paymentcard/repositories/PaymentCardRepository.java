package com.csci4050.paymentcard.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.user.entities.Customer;

@Repository
public interface PaymentCardRepository extends JpaRepository<PaymentCard, Integer> {
    PaymentCard findByCardNumber(String cardNumber);

    List<PaymentCard> findByCustomer(Customer customer);
}