package com.csci4050.customer.entities;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import com.csci4050.address.entities.Address;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.user.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "customers")
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

    @OneToOne(mappedBy = "customer", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("customer")
    private Address billingAddress;

    private boolean promotionsSubscriber;

    @Enumerated(EnumType.STRING)
    public UserStatus status;

    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("customer")
    private List<PaymentCard> paymentCards = new ArrayList<>();

    @Column(name = "verification_code", length = 64)
    private String verificationCode;
}
