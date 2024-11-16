package com.csci4050.promotion.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.csci4050.movie.entities.Movie;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "promotions")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Promotion {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    private String event;
    private float discount;
    private boolean active;
}
