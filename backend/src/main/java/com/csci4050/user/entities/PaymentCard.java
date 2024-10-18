package com.csci4050.user.entities;


import jakarta.persistence.*;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "PaymentCards")
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

    @Column(name = "cvv")
    private String cvv;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

}
