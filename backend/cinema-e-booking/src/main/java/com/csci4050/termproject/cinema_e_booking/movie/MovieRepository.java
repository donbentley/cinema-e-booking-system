package com.csci4050.termproject.cinema_e_booking.movie;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {

    public List<Movie> findByTitlesContaining(String title);

}