package com.csci4050.order.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci4050.customer.entities.Customer;
import com.csci4050.customer.repositories.CustomerRepository;
import com.csci4050.order.entities.Order;
import com.csci4050.order.entities.Ticket;
import com.csci4050.order.entities.TicketType;
import com.csci4050.order.repositories.OrderRepository;
import com.csci4050.order.repositories.TicketTypeRepository;
import com.csci4050.order.requests.OrderRequest;
import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.repositories.PromotionRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private TicketTypeRepository ticketTypeRepository;

    @Autowired
    private PromotionRepository promotionRepository;

    // Fetch all orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Fetch a specific order by ID
    public Order getOrderById(Integer id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));
    }

    // Create a new order
    public Order createOrder(OrderRequest orderRequest) {
        // Retrieve associated entities
        Customer customer = customerRepository.findById(orderRequest.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + orderRequest.getCustomerId()));

        // Dynamically create tickets based on TicketType IDs
        List<Ticket> tickets = orderRequest.getTicketIds().stream().map(ticketTypeId -> {
            Ticket ticket = new Ticket();
            TicketType ticketType = ticketTypeRepository.findById(ticketTypeId)
                    .orElseThrow(() -> new RuntimeException("TicketType not found with ID: " + ticketTypeId));
            ticket.setTicketType(ticketType); // Set the TicketType for the Ticket
            return ticket;  // Return the created Ticket
        }).toList();

        Promotion promotion = null;
        if (orderRequest.getPromotionId() != null) {
            promotion = promotionRepository.findById(orderRequest.getPromotionId())
                    .orElseThrow(() -> new RuntimeException("Promotion not found with ID: " + orderRequest.getPromotionId()));
        }

        // Create and save the order
        Order order = new Order();
        order.setCustomer(customer);
        order.setTickets(tickets); // Set the list of Tickets
        order.setPromotion(promotion);
        order.setPaymentCard(orderRequest.getPaymentCard());
        return orderRepository.save(order);
    }

    // Update an existing order
    public Order updateOrder(Integer id, OrderRequest orderRequest) {
        // Retrieve the existing order
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + id));

        // Update fields
        if (orderRequest.getCustomerId() != null) {
            Customer customer = customerRepository.findById(orderRequest.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer not found with ID: " + orderRequest.getCustomerId()));
            existingOrder.setCustomer(customer);
        }

        if (orderRequest.getTicketIds() != null && !orderRequest.getTicketIds().isEmpty()) {
            List<Ticket> tickets = orderRequest.getTicketIds().stream().map(ticketTypeId -> {
                Ticket ticket = new Ticket();
                TicketType ticketType = ticketTypeRepository.findById(ticketTypeId)
                        .orElseThrow(() -> new RuntimeException("TicketType not found with ID: " + ticketTypeId));
                ticket.setTicketType(ticketType); // Set the TicketType for the Ticket
                return ticket;
            }).toList();
            existingOrder.setTickets(tickets);
        }

        if (orderRequest.getPromotionId() != null) {
            Promotion promotion = promotionRepository.findById(orderRequest.getPromotionId())
                    .orElseThrow(() -> new RuntimeException("Promotion not found with ID: " + orderRequest.getPromotionId()));
            existingOrder.setPromotion(promotion);
        }

        if (orderRequest.getPaymentCard() != null) {
            existingOrder.setPaymentCard(orderRequest.getPaymentCard());
        }

        return orderRepository.save(existingOrder);
    }

    // Delete an order by ID
    public void deleteOrder(Integer id) {
        if (!orderRepository.existsById(id)) {
            throw new RuntimeException("Order not found with ID: " + id);
        }
        orderRepository.deleteById(id);
    }
}
