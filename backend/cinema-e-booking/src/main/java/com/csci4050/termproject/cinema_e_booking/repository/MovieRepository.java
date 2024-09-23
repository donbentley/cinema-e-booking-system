package com.csci4050.termproject.cinema_e_booking.repository;

import com.csci4050.termproject.cinema_e_booking.model.Movie;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MovieRepository extends MongoRepository<Movie, String> {

    public List<Movie> findByTitleContaining(String title);

}