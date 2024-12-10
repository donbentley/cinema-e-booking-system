package com.csci4050.order.repositories;

import com.csci4050.order.entities.NewTicket;
import com.csci4050.showing.entities.Showing;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewTicketRepository extends JpaRepository<NewTicket, Integer> {
    List<NewTicket> findAllByShowing(Showing showing);
    Optional<NewTicket> findByShowingAndSeatNumber(Showing showing, Integer seatNumber);
}
