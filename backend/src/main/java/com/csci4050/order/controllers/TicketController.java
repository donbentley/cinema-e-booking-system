package com.csci4050.order.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.csci4050.customer.entities.Customer;
import com.csci4050.customer.services.CustomerService;
import com.csci4050.order.entities.Order;
import com.csci4050.order.entities.Ticket;
import com.csci4050.order.requests.OrderRequest;
import com.csci4050.order.services.OrderService;
import com.csci4050.showing.entities.Showing;
import com.csci4050.showing.services.ShowingService;
import com.csci4050.showroom.services.SeatService;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ShowingService showingService;

    @Autowired
    private SeatService seatService;

    @Autowired
    private OrderService orderService;

    /**
     * Simplified seat allocation endpoint
     *
     * @param requestBody Map containing booking details
     * @return List of created tickets
     */
    @PostMapping("/book")
    public ResponseEntity<?> bookSeats(@RequestBody Map<String, Object> requestBody) {
        try {
            // Extract required information directly from the request body
            Integer customerId = (Integer) requestBody.get("customerId");

            Integer showingId = (Integer) requestBody.get("showingId");
            List<String> seatNumbers = (List<String>) requestBody.get("seatNumbers");

            // Find or create customer
            Customer customer = customerService.getCustomerById(customerId);

            // Get showing
            Showing showing = showingService.getShowingById(showingId);

            // Create order
            OrderRequest orderRequest = new OrderRequest();
            orderRequest.setCustomerId(customer.getId());
// Add any additional fields required for OrderRequest

            Order order = orderService.createOrder(orderRequest);

            // Allocate seats and create tickets
            List<Ticket> tickets = seatService.allocateSeats(showing, seatNumbers, order);

            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Booking failed: " + e.getMessage());
        }
    }

    /**
     * Simple endpoint to check seat availability
     *
     * @param showingId ID of the showing
     * @return List of available seats
     */
    @GetMapping("/available/{showingId}")
    public ResponseEntity<?> checkAvailableSeats(@PathVariable Integer showingId) {
        Showing showing = showingService.getShowingById(showingId);
        List<String> availableSeats = seatService.getAvailableSeatNumbers(showing);

        return ResponseEntity.ok(Map.of(
                "showingId", showingId,
                "availableSeats", availableSeats
        ));
    }
}
