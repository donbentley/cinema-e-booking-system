package com.csci4050.order.services;

import com.csci4050.order.entities.Order;
import com.csci4050.order.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    // Get Order by ID
    public Order getOrderById(Long id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        return optionalOrder.orElse(null);
    }

    // Add a new Order
    public Order addOrder(Order order) {
        // Perform any additional validation or processing here if needed
        return orderRepository.save(order);
    }

    // Update an existing Order
    public Order updateOrder(Order order) {
        // Ensure the order exists before updating
        if (orderRepository.existsById(order.getId())) {
            return orderRepository.save(order);
        } else {
            throw new IllegalArgumentException("Order not found with ID: " + order.getId());
        }
    }

    // Delete Order by ID
    public void deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Order not found with ID: " + id);
        }
    }

    // Get all Orders
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
