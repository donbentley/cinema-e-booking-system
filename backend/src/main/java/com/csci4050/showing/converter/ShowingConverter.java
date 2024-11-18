package com.csci4050.showing.converter;

import java.time.LocalDateTime;

import com.csci4050.showing.entities.Showing;
import com.csci4050.showing.requests.ShowingRequest;

public class ShowingConverter {
    
    public static Showing convert(ShowingRequest showingRequest) {
        Showing showing = Showing.builder()
            .movie(showingRequest.getMovie())
            .showroom(showingRequest.getShowroom())
            .dateTime(LocalDateTime.parse(showingRequest.getDateTime()))
            .build();
        return showing;
    }
}
