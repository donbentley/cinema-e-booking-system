package com.csci4050.termproject.cinema_e_booking.movie.exceptions;

public class MovieAlreadyExists extends RuntimeException{
    public MovieAlreadyExists() {
        super("movie already exists");
    }
}
