package com.csci4050.showroom.entities;

import jakarta.persistence.*;
import com.csci4050.showroom.entities.Showroom;
import com.csci4050.order.entities.Ticket;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import lombok.Builder;

@Entity
@Table(name = "seats")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "seat_number", nullable = false)
    private String seatNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "showroom_id")
    private Showroom showroom;

    @Column(name = "is_available")
    private boolean isAvailable;
}
