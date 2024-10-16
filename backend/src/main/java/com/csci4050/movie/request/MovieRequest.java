package com.csci4050.movie.request;

import java.util.List;

import lombok.Data;

@Data
public class MovieRequest {
    private Integer id;
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
