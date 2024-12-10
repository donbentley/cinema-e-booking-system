package com.csci4050.order.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci4050.customer.services.CustomerService;
import com.csci4050.order.converters.OrderPriceConverter;
import com.csci4050.order.entities.NewOrder;
import com.csci4050.order.entities.NewTicket;
import com.csci4050.order.entities.Ticket;
import com.csci4050.order.entities.TicketType;
import com.csci4050.order.exceptions.OrderNotFoundException;
import com.csci4050.order.exceptions.TicketTypeNotFoundException;
import com.csci4050.order.repositories.NewOrderRepository;
import com.csci4050.order.repositories.TicketTypeRepository;
import com.csci4050.order.requests.PriceRequest;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.exceptions.CardNotFound;
import com.csci4050.paymentcard.repositories.PaymentCardRepository;
import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.exceptions.InactivePromotionException;
import com.csci4050.promotion.exceptions.PromotionNotFoundException;
import com.csci4050.promotion.repositories.PromotionRepository;

@Service
public class NewOrderService {

    @Autowired
    private NewTicketService ticketService;
    @Autowired
    private CustomerService customerService;

    @Autowired
    private TicketTypeRepository ticketTypeRepository;
    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private NewOrderRepository orderRepository;
    @Autowired
    private PaymentCardRepository paymentCardRepository;

    public NewOrder getPrice(PriceRequest priceRequest) {
        NewOrder o = new NewOrder();
        o.setCustomer(customerService.getCustomerDetails());
        if (!priceRequest.getPromotionString().equals("")) {
            Optional<Promotion> p = promotionRepository.findByEvent(priceRequest.getPromotionString());
            if (!p.isPresent()) {throw new PromotionNotFoundException();}
            Promotion promotion = p.get();
            if (!promotion.isActive()) {throw new InactivePromotionException();}
            o.setPromotion(promotion);
        }
        o.setTickets(priceRequest.getTickets());
        o.setPrice(calculatePrice(o));
        return o;
    }

    public NewOrder addOrder(NewOrder orderRequest) {
        List<NewTicket> savedTickets = ticketService.addTickets(orderRequest.getTickets());
        Optional<PaymentCard> p = paymentCardRepository.findById(orderRequest.getPaymentCard().getId());
        if (!p.isPresent()) { throw new CardNotFound(); }
        orderRequest.setTickets(savedTickets);
        NewOrder newOrder = orderRepository.save(orderRequest);
        return newOrder;
    }

    public String deleteOrder(Integer id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return "Order deleted successfully";
        } else {
            throw new OrderNotFoundException();
        }
    }

    private double calculatePrice(NewOrder order) {
        Double price = 0.0;
        for (NewTicket ticket : order.getTickets()) {
            ticketService.checkValidTicket(ticket);
            price += ticket.getTicketType().getPrice();
        }
        if (order.getPromotion() != null) {
            price *= (1.0 - order.getPromotion().getDiscount());
        }
        return price;
    }
    
}
