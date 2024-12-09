package com.csci4050.showroom.entities;

import jakarta.persistence.*;

import lombok.NoArgsConstructor;
import com.csci4050.showroom.entities.Seat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "showrooms")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Showroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private int numOfSeats;

    @OneToMany(mappedBy = "showroom")
    private List<Seat> seats;
}
