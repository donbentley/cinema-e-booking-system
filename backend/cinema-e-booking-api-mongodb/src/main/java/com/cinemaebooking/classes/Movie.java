package com.cinemaebooking.classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
@Document
public class Movie {

    public enum Rating {
        G, PG, PG13, R, NC17
    };

    @Id
    private String id;
    private String title;
    private String category;
    private ArrayList<String> cast;
    private String director;
    private String producer;
    private String synopsis;
    @DbRef
    private ArrayList<Review> reviews;
    private String trailer;
    private Rating rating;

}
