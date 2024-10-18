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
public class PaymentCard {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer cardId;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    

}
