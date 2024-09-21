package com.cinemaebooking.classes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document
public class Review {
    @Id
    private String name;
    private String rating;
    private String reviewText;
}
