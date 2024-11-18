package com.csci4050.showroom.entities;

import jakarta.persistence.*;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "showrooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Showroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private int numOfSeats;
}
