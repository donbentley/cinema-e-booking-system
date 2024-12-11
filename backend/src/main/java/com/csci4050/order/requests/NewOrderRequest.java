package com.csci4050.order.requests;

import java.util.List;

import com.csci4050.customer.entities.Customer;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.promotion.entities.Promotion;

import lombok.Data;

@Data
public class NewOrderRequest {
    private Customer customer;
    private List<TicketRequest> tickets;
    private PaymentCard paymentCard;
    private Promotion promotion;
    private Double price;
}
