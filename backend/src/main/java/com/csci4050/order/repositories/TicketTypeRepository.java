package com.csci4050.order.repositories;

import com.csci4050.order.entities.TicketType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketTypeRepository extends JpaRepository<TicketType, Long> {
}
