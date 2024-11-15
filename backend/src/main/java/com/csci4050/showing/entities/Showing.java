package com.csci4050.showing.entities;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.csci4050.movie.entities.Movie;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "showings")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Showing {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="movie_id")
    @JsonIgnoreProperties("showings")
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="showroom_id")
    private Showroom showroom;

    private LocalDateTime dateTime;
}
