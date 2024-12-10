package com.csci4050.order.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci4050.order.entities.NewTicket;
import com.csci4050.order.entities.TicketType;
import com.csci4050.order.exceptions.InvalidSeatException;
import com.csci4050.order.exceptions.SeatBookedException;
import com.csci4050.order.exceptions.TicketTypeNotFoundException;
import com.csci4050.order.repositories.NewTicketRepository;
import com.csci4050.order.repositories.TicketTypeRepository;
import com.csci4050.showing.entities.Showing;
import com.csci4050.showing.exceptions.ShowingNotFoundException;
import com.csci4050.showing.repositories.ShowingRepository;
import com.csci4050.customer.services.CustomerService;
import com.csci4050.order.converters.OrderPriceConverter;
import com.csci4050.order.entities.NewOrder;
import com.csci4050.order.entities.NewTicket;
import com.csci4050.order.entities.Ticket;
import com.csci4050.order.entities.TicketType;
import com.csci4050.order.exceptions.OrderNotFoundException;
import com.csci4050.order.exceptions.TicketTypeNotFoundException;
import com.csci4050.order.repositories.NewOrderRepository;
import com.csci4050.order.repositories.TicketTypeRepository;
import com.csci4050.order.requests.PriceRequest;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.exceptions.CardNotFound;
import com.csci4050.paymentcard.repositories.PaymentCardRepository;
import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.exceptions.InactivePromotionException;
import com.csci4050.promotion.exceptions.PromotionNotFoundException;
import com.csci4050.promotion.repositories.PromotionRepository;

@Service
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
