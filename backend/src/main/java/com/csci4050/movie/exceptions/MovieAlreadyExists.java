package com.csci4050.movie.exceptions;

public class MovieAlreadyExists extends RuntimeException{
    public MovieAlreadyExists() {
        super("movie already exists");
    }
}
