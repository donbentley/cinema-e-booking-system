package com.csci4050.showroom.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.csci4050.showing.entities.Showing;
import com.csci4050.showroom.entities.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {

    // Find all seats for a specific showing
    @Query("SELECT s FROM Seat s WHERE s.ticket.showing = :showing")
    List<Seat> findSeatsByShowing(@Param("showing") Showing showing);

    // Find available seats for a specific showing
    @Query("SELECT s FROM Seat s WHERE s.ticket.showing = :showing AND s.isAvailable = true")
    List<Seat> findAvailableSeats(@Param("showing") Showing showing);

    // Find a specific seat by seat number and showing
    Optional<Seat> findBySeatNumberAndTicketShowing(String seatNumber, Showing showing);

    // Count available seats for a showing
    @Query("SELECT COUNT(s) FROM Seat s WHERE s.ticket.showing = :showing AND s.isAvailable = true")
    int countAvailableSeats(@Param("showing") Showing showing);
}
