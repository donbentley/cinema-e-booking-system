package com.csci4050.showing.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.csci4050.movie.entities.Movie;
import com.csci4050.movie.exceptions.MovieNotFoundException;
import com.csci4050.movie.repositories.MovieRepository;
import com.csci4050.order.entities.NewTicket;
import com.csci4050.order.repositories.NewTicketRepository;
import com.csci4050.order.repositories.TicketRepository;
import com.csci4050.showing.converter.ShowingConverter;
import com.csci4050.showing.entities.Showing;
import com.csci4050.showing.exceptions.ShowingNotFoundException;
import com.csci4050.showing.exceptions.TimeConflictException;
import com.csci4050.showing.repositories.ShowingRepository;
import com.csci4050.showing.requests.ShowingRequest;
import com.csci4050.showroom.repositories.ShowroomRepository;

import org.springframework.stereotype.Service;

@Service
public class ShowingService {
    
    @Autowired
    private ShowingRepository showingRepository;
    @Autowired
    private MovieRepository movieRepository;
    @Autowired
    private NewTicketRepository ticketRepository;

    public Showing getShowingById(Integer id) {
        Optional<Showing> existingShowing = showingRepository.findById(id);
        if (!existingShowing.isPresent()) { throw new ShowingNotFoundException(); }
        Showing s = existingShowing.get();
        return s;
    }

    public Showing addShowing(ShowingRequest showingRequest) {
        Showing s = ShowingConverter.convert(showingRequest);
        Optional<Showing> existingShowing = showingRepository.findByDateTimeBetweenAndShowroom(
            s.getDateTime(), s.getDateTime().plusHours(3), s.getShowroom());
        if (existingShowing.isPresent()) { throw new TimeConflictException(); }
        s = showingRepository.save(s);
        return s;
    }

    public String deleteShowing(Integer id) {
        if (showingRepository.existsById(id)) {
            showingRepository.deleteById(id);
            return "Showing deleted successfully";
        } else {
            throw new ShowingNotFoundException();
        }
    }

    public Showing updateShowing(Integer id, ShowingRequest showingRequest) {
        Optional<Showing> s = showingRepository.findById(id);
        if (!s.isPresent()) { throw new ShowingNotFoundException(); }
        Showing showingToUpdate = s.get();
        Showing updatedShowing = ShowingConverter.convert(showingRequest);
        Optional<Showing> existingShowing = showingRepository.findByDateTimeBetweenAndShowroom(
            updatedShowing.getDateTime(), updatedShowing.getDateTime().plusHours(3), updatedShowing.getShowroom());
        if (existingShowing.isPresent()) { throw new TimeConflictException(); }
        updatedShowing.setId(showingToUpdate.getId());
        updatedShowing = showingRepository.save(updatedShowing);
        return updatedShowing;
    }

    public List<Showing> getAllShowings() {
        List<Showing> showings = showingRepository.findAll();
        return showings;
    }

    public List<Showing> getAllShowingsByMovie(Integer movieId) {
        Optional<Movie> m = movieRepository.findById(movieId);
        if (!m.isPresent()) { throw new MovieNotFoundException(); }
        Movie existingMovie = m.get();
        List<Showing> showings = showingRepository.findAllByMovie(existingMovie);
        return showings;
    }

    public List<Boolean> getAvailableSeats(Integer showingId) {
        Optional<Showing> s = showingRepository.findById(showingId);
        if (!s.isPresent()) { throw new ShowingNotFoundException(); }
        Showing showing = s.get();
        List<Boolean> seats = new ArrayList<>();
        for (int i = 0; i < showing.getShowroom().getNumOfSeats(); i++) {
            seats.add(true);
        }
        List<NewTicket> tickets = ticketRepository.findAllByShowing(showing);
        for (NewTicket ticket : tickets) {
            seats.set(ticket.getSeatNumber() - 1, false);
        }
        return seats;
    }
}
