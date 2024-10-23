package com.csci4050.address.entities;


import com.csci4050.user.entities.Customer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "addresses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "customer_id")
    @JsonIgnoreProperties("billingAddress")
    private Customer customer;

    private String line1;
    private String line2;
    private String city;
    private String state;
    private int zip;
}
