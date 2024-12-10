package com.csci4050.order.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import com.csci4050.order.entities.NewTicket;
import com.csci4050.order.entities.TicketType;
import com.csci4050.order.exceptions.InvalidSeatException;
import com.csci4050.order.exceptions.SeatBookedException;
import com.csci4050.order.exceptions.TicketTypeNotFoundException;
import com.csci4050.order.repositories.NewTicketRepository;
import com.csci4050.order.repositories.TicketTypeRepository;
import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.repositories.PromotionRepository;
import com.csci4050.showing.entities.Showing;
import com.csci4050.showing.exceptions.ShowingNotFoundException;
import com.csci4050.showing.repositories.ShowingRepository;

public class NewTicketService {

    @Autowired
    private TicketTypeRepository ticketTypeRepository;
    @Autowired
    private NewTicketRepository ticketRepository;
    @Autowired
    private ShowingRepository showingRepository;

    public void checkValidTicket(NewTicket ticket) {
        Optional<TicketType> existingTicketType = ticketTypeRepository.findById(ticket.getTicketType().getId());
        if (!existingTicketType.isPresent()) {
            throw new TicketTypeNotFoundException();
        }
        Optional<NewTicket> existingTicket = ticketRepository.findByShowingAndSeatNumber(
                ticket.getShowing(), ticket.getSeatNumber());
        if (existingTicket.isPresent()) {
            throw new SeatBookedException();
        }
        Optional<Showing> existingShowing = showingRepository.findById(ticket.getShowing().getId());
        if (!existingShowing.isPresent()) {
            throw new ShowingNotFoundException();
        }
        Showing s = existingShowing.get();
        if (ticket.getSeatNumber() < 1 || ticket.getSeatNumber() > s.getShowroom().getNumOfSeats()) {
            throw new InvalidSeatException();
        }
    }

    public List<TicketType> getAllTicketTypes() {
        List<TicketType> ticketTypes = ticketTypeRepository.findAll();
        return ticketTypes;
    }

    public List<NewTicket> addTickets(List<NewTicket> tickets) {
        for (NewTicket ticket : tickets) {
            checkValidTicket(ticket);
        }
        for (NewTicket ticket : tickets) {
            ticket = ticketRepository.save(ticket);
        }
        return tickets;
    }

}
