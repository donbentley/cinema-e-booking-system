package com.csci4050.paymentcard.entities;


import com.csci4050.customer.entities.Customer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "payment_cards")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "card_number")
    private String cardNumber;

    @Column(name = "exp_date")
    private String expDate;

    private String cvv;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="customer_id")
    @JsonIgnoreProperties("paymentCards")
    private Customer customer;

}
