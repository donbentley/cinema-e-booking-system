package com.csci4050.termproject.cinema_e_booking.movie;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


import java.util.List;

public interface MovieRepository extends MongoRepository<Movie, String> {

    @Query("{title:'?0'}")
    public List<Movie> findMovieByTitleContaining(String title);

}