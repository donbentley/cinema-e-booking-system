package com.csci4050.termproject.cinema_e_booking.movie.converter;

import com.csci4050.termproject.cinema_e_booking.movie.request.MovieRequest;
import com.csci4050.termproject.cinema_e_booking.movie.entities.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;

import java.util.ArrayList;
import java.util.List;

import com.csci4050.termproject.cinema_e_booking.movie.entities.Movie;

public class MovieConverter {

    public static Movie convert(MovieRequest movieRequest) {
        Movie movie = Movie.builder()
            .title(movieRequest.getTitle())
            .category(movieRequest.getCategory())
            .cast(movieRequest.getCast())
            .director(movieRequest.getDirector())
            .producer(movieRequest.getProducer())
            .synopsis(movieRequest.getSynopsis())
            .reviewLink(movieRequest.getReviewLink())
            .pictureLink(movieRequest.getPictureLink())
            .trailerLink(movieRequest.getTrailerLink())
            .mpaaRating(movieRequest.getMpaaRating())
            .build();

    return movie;
    }
    
}
