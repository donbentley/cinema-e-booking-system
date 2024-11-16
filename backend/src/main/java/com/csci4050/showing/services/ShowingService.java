package com.csci4050.showing.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.showing.entities.Showing;
import com.csci4050.showing.repositories.ShowingRepository;
import com.csci4050.showing.repositories.ShowroomRepository;
import com.csci4050.showing.requests.ShowingRequest;
import org.springframework.stereotype.Service;

@Service
public class ShowingService {
    
    @Autowired
    private ShowingRepository showingRepository;

    @Autowired
    private ShowroomRepository showroomRepository;

    public Showing getShowingById(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getShowingById'");
    }

    public Showing addShowing(ShowingRequest showingRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'addShowing'");
    }

    public String deleteShowing(Integer id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'deleteShowing'");
    }

    public Showing updateShowing(Integer id, ShowingRequest showingRequest) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'updateShowing'");
    }

    public List<Showing> getAllShowings() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllShowings'");
    }

    public List<Showing> getAllShowingsByMovie(Integer movieId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllShowingsByMovie'");
    }
}
