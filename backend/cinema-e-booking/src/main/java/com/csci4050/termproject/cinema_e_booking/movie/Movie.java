package com.csci4050.termproject.cinema_e_booking.movie;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

@Document
public class Movie {

    @Id
    private String id;

    private String title;
    private String category;
    private List<String> cast;
    private String director;
    private String producer;
    private String synopsis;
    private String reviewLink;
    private String pictureLink;
    private String trailerLink;
    private String mpaaRating;

}
