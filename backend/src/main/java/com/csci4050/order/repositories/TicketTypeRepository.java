package com.csci4050.order.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.csci4050.order.entities.TicketType;

public interface TicketTypeRepository extends JpaRepository<TicketType, Integer> {
    Optional<TicketType> findByName(String name); // Add this method

}
