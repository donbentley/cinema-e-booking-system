package com.csci4050.order.converters;

import com.csci4050.order.entities.NewOrder;
import com.csci4050.order.entities.NewTicket;
import com.csci4050.order.requests.TicketRequest;

public class TicketConverter {
    public static NewTicket convert(TicketRequest ticketRequest, NewOrder order) {
        NewTicket ticket = NewTicket.builder()
            .showing(ticketRequest.getShowing())
            .ticketType(ticketRequest.getTicketType())
            .order(order)
            .seatNumber(ticketRequest.getSeatNumber())
            .build();
        return ticket;
    }
}
