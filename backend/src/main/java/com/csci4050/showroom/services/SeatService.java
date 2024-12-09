package com.csci4050.showroom.services;

import com.csci4050.order.entities.Order;
import com.csci4050.showroom.entities.Seat;
import com.csci4050.order.entities.Ticket;
import com.csci4050.order.entities.TicketType;
import com.csci4050.showroom.repositories.SeatRepository;
import com.csci4050.order.repositories.TicketRepository;
import com.csci4050.order.services.TicketTypeService;
import com.csci4050.showing.entities.Showing;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SeatService {

    private final SeatRepository seatRepository;
    private final TicketRepository ticketRepository;
    private final TicketTypeService ticketTypeService;

    @Autowired
    public SeatService(
            SeatRepository seatRepository,
            TicketRepository ticketRepository,
            TicketTypeService ticketTypeService
    ) {
        this.seatRepository = seatRepository;
        this.ticketRepository = ticketRepository;
        this.ticketTypeService = ticketTypeService;
    }

    /**
     * Get all available seat numbers for a specific showing
     *
     * @param showing The showing to check
     * @return List of available seat numbers
     */
    public List<String> getAvailableSeatNumbers(Showing showing) {
        return seatRepository.findAll().stream()
                .filter(seat
                        -> seat.getShowroom().getId().equals(showing.getShowroom().getId())
                && seat.isAvailable()
                )
                .map(Seat::getSeatNumber)
                .collect(Collectors.toList());
    }

    /**
     * Allocate seats for an order
     *
     * @param showing The showing for which seats are being allocated
     * @param seatNumbers List of seat numbers to allocate
     * @param order The order for which seats are being allocated
     * @return List of created tickets
     */
    @Transactional
    public List<Ticket> allocateSeats(Showing showing, List<String> seatNumbers, Order order) {
        // Validate seat availability
        List<Seat> availableSeats = findAvailableSeatsForShowing(showing, seatNumbers);

        // Get default ticket type (you might want to make this more sophisticated)
        TicketType defaultTicketType = ticketTypeService.getDefaultTicketType();

        // Create tickets and mark seats as unavailable
        return availableSeats.stream()
                .map(seat -> {
                    // Create ticket
                    Ticket ticket = new Ticket();
                    ticket.setShowing(showing);
                    ticket.setSeatNumber(seat.getSeatNumber());
                    ticket.setTicketType(defaultTicketType);
                    ticket.setOrder(order);

                    // Save ticket
                    ticket = ticketRepository.save(ticket);

                    // Mark seat as unavailable
                    seat.setAvailable(false);
                    seat.setTicket(ticket);
                    seatRepository.save(seat);

                    return ticket;
                })
                .collect(Collectors.toList());
    }

    /**
     * Find available seats for a specific showing
     *
     * @param showing The showing to check
     * @param requestedSeatNumbers Seat numbers requested by the user
     * @return List of available seats
     * @throws IllegalStateException if requested seats are not available
     */
    private List<Seat> findAvailableSeatsForShowing(Showing showing, List<String> requestedSeatNumbers) {
        // Find all seats for the showing's showroom
        List<Seat> showroomSeats = seatRepository.findAll().stream()
                .filter(seat -> seat.getShowroom().getId().equals(showing.getShowroom().getId()))
                .collect(Collectors.toList());

        // Check availability of requested seats
        List<Seat> availableSeats = showroomSeats.stream()
                .filter(seat
                        -> requestedSeatNumbers.contains(seat.getSeatNumber())
                && seat.isAvailable()
                )
                .collect(Collectors.toList());

        // Validate all requested seats are available
        List<String> unavailableSeats = requestedSeatNumbers.stream()
                .filter(seatNumber
                        -> availableSeats.stream()
                        .noneMatch(seat -> seat.getSeatNumber().equals(seatNumber))
                )
                .collect(Collectors.toList());

        if (!unavailableSeats.isEmpty()) {
            throw new IllegalStateException("Seats not available: " + unavailableSeats);
        }

        return availableSeats;
    }

    /**
     * Release a seat (for cancellations)
     *
     * @param ticket The ticket associated with the seat
     */
    @Transactional
    public void releaseSeat(Ticket ticket) {
        // Find the seat for this ticket
        Seat seat = seatRepository.findAll().stream()
                .filter(s -> s.getTicket() != null && s.getTicket().getId().equals(ticket.getId()))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("Seat not found for ticket"));

        // Mark seat as available
        seat.setAvailable(true);
        seat.setTicket(null);
        seatRepository.save(seat);
    }

    /**
     * Count available seats for a showing
     *
     * @param showing The showing to count seats for
     * @return Number of available seats
     */
    public int countAvailableSeats(Showing showing) {
        return (int) seatRepository.findAll().stream()
                .filter(seat
                        -> seat.getShowroom().getId().equals(showing.getShowroom().getId())
                && seat.isAvailable()
                )
                .count();
    }
}
