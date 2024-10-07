package com.csci4050.termproject.cinema_e_booking.movie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci4050.termproject.cinema_e_booking.movie.converter.MovieConverter;
import com.csci4050.termproject.cinema_e_booking.movie.repositories.MovieRepository;
import com.csci4050.termproject.cinema_e_booking.movie.request.MovieRequest;
import com.csci4050.termproject.cinema_e_booking.movie.entities.Movie;
import com.csci4050.termproject.cinema_e_booking.movie.exceptions.MovieAlreadyExists;

@Service
public class MovieService {
    
    @Autowired
    private MovieRepository movieRepository;

    public String addMovie(MovieRequest movieRequest) {
        Movie findByTitle = movieRepository.findByTitle(movieRequest.getTitle());
        
        if (findByTitle !=  null)
            throw new MovieAlreadyExists();
        
            Movie movie = MovieConverter.convert(movieRequest);

            movieRepository.save(movie);
            return "movie has been added"; 
    }
}
