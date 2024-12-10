package com.csci4050.order.requests;

import java.util.List;

import com.csci4050.order.entities.NewTicket;

import lombok.Data;

@Data
public class PriceRequest {
    private List<NewTicket> tickets;
    private String promotionString;
}
