package com.csci4050.order.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.csci4050.order.entities.Ticket;
import com.csci4050.showing.entities.Showing;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    // Find all tickets for a specific showing
    @Query("SELECT t FROM Ticket t WHERE t.showing = :showing")
    List<Ticket> findTicketsByShowing(@Param("showing") Showing showing);

    // Find tickets for a specific seat number in a showing
    @Query("SELECT t FROM Ticket t WHERE t.seatNumber = :seatNumber AND t.showing = :showing")
    List<Ticket> findTicketsBySeatAndShowing(@Param("seatNumber") String seatNumber, @Param("showing") Showing showing);

    // Find tickets associated with a specific order
    @Query("SELECT t FROM Ticket t WHERE t.order.id = :orderId")
    List<Ticket> findTicketsByOrder(@Param("orderId") Integer orderId);

    // Count tickets for a showing
    @Query("SELECT COUNT(t) FROM Ticket t WHERE t.showing = :showing")
    int countTicketsByShowing(@Param("showing") Showing showing);

    // Find all tickets that are not yet canceled
    @Query("SELECT t FROM Ticket t WHERE t.order IS NOT NULL")
    List<Ticket> findAllActiveTickets();
}
