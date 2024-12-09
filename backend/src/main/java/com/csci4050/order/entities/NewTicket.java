package com.csci4050.order.entities;
import com.csci4050.showing.entities.Showing;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;

@Entity
@Table(name = "tickets")
@Data
@Builder
public class NewTicket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Showing showing;
    private TicketType ticketType;
    private Integer seatNumber;
}
