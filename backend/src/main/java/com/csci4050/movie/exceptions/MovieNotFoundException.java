package com.csci4050.movie.exceptions;

public class MovieNotFoundException extends RuntimeException {
    public MovieNotFoundException() {
        super("Movie not found");
    }
    
}
