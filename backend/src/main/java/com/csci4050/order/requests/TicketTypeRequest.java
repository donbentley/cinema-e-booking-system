package com.csci4050.order.requests;

import java.math.BigDecimal;

public class TicketTypeRequest {

    private String name; // Name of the ticket type
    private BigDecimal price; // Price of the ticket

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
