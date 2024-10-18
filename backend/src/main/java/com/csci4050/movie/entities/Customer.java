package com.csci4050.movie.entities;


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

    private String first;
    private String last;
    private String email;

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    private BillingAddress billingAddress;

    @Enumerated(EnumType.STRING)
    public UserStatus status;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<String> paymentCards = new ArrayList<>();
}
