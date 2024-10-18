package com.csci4050.user.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "Customers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {

    public enum UserStatus { ACTIVE, INACTIVE, SUSPENDED }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    private String first;
    private String last;
    private String email;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private BillingAddress billingAddress;

    @Enumerated(EnumType.STRING)
    public UserStatus status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PaymentCard> paymentCards = new ArrayList<>();
}
