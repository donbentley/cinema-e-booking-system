package com.csci4050.termproject.cinema_e_booking.movie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.csci4050.termproject.cinema_e_booking.movie.entities.Movie;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Movie findByTitle(String name);
}