package com.csci4050.order.requests;

import java.util.List;

import com.csci4050.customer.entities.Customer;
import com.csci4050.order.entities.NewTicket;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.promotion.entities.Promotion;

import lombok.Data;

@Data
public class PriceRequest {
    private List<NewTicket> tickets;
    private String promotionString;
}
