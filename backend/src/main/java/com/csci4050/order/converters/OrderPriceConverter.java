package com.csci4050.order.converters;

import com.csci4050.order.entities.NewOrder;
import com.csci4050.order.requests.PriceRequest;

public class OrderPriceConverter {
    public static NewOrder convert(PriceRequest priceRequest) {
        NewOrder order = NewOrder.builder()
            .tickets(priceRequest.getTickets())
            .build();
        return order;
    }
}
