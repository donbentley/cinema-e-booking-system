package com.csci4050.showing.requests;

import java.time.LocalDateTime;

import com.csci4050.movie.entities.Movie;
import com.csci4050.showing.entities.Showroom;
import lombok.Data;

@Data
public class ShowingRequest {
    private Integer id;
    private Movie movie;
    private Showroom showroom;
    private String dateTime;
}
