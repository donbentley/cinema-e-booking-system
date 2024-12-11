package com.csci4050.order.converters;

import com.csci4050.order.requests.NewOrderRequest;
import com.csci4050.order.entities.NewOrder;

public class NewOrderConverter {
    public static NewOrder convert(NewOrderRequest newOrderRequest) {
        NewOrder order = NewOrder.builder()
            .customer(newOrderRequest.getCustomer())
            .paymentCard(newOrderRequest.getPaymentCard())
            .promotion(newOrderRequest.getPromotion())
            .price(newOrderRequest.getPrice())
            .build();
        return order;
    }
}
