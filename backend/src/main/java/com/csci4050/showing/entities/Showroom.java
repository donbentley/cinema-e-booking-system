package com.csci4050.showing.entities;

import jakarta.persistence.*;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Data;

@Entity
@Table(name = "showrooms")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Showroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private int numOfSeats;
}
