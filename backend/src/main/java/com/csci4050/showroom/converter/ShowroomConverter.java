package com.csci4050.showroom.converter;

import com.csci4050.showroom.entities.Showroom;
import com.csci4050.showroom.requests.ShowroomRequest;

public class ShowroomConverter {
    public static Showroom convert(ShowroomRequest showroomRequest) {
        Showroom showroom = Showroom.builder()
            .name(showroomRequest.getName())
            .numOfSeats(showroomRequest.getNumOfSeats())
            .build();
        return showroom;
    }
}
