package com.csci4050.movie.entities;


import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "BillingAddresses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BillingAddress {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @MapsId
    private Customer customer;

    private String line1;
    private String line2;
    private String city;
    private String state;
    private int zip;
}
