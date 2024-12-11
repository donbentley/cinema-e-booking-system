package com.csci4050.order.services;

import java.util.List;
import java.util.Optional;
import java.io.UnsupportedEncodingException;
import java.text.NumberFormat;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.csci4050.customer.services.CustomerService;
import com.csci4050.order.converters.NewOrderConverter;
import com.csci4050.order.entities.NewOrder;
import com.csci4050.order.entities.NewTicket;
import com.csci4050.order.exceptions.InvalidPriceException;
import com.csci4050.order.exceptions.OrderNotFoundException;
import com.csci4050.order.repositories.NewOrderRepository;
import com.csci4050.order.requests.NewOrderRequest;
import com.csci4050.order.requests.PriceRequest;
import com.csci4050.order.requests.TicketRequest;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.exceptions.CardNotFound;
import com.csci4050.paymentcard.repositories.PaymentCardRepository;
import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.exceptions.InactivePromotionException;
import com.csci4050.promotion.exceptions.PromotionNotFoundException;
import com.csci4050.promotion.exceptions.SendEmailException;
import com.csci4050.promotion.repositories.PromotionRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class NewOrderService {

    @Autowired
    private NewTicketService ticketService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PromotionRepository promotionRepository;
    @Autowired
    private NewOrderRepository orderRepository;
    @Autowired
    private PaymentCardRepository paymentCardRepository;

    public NewOrderRequest getPrice(PriceRequest priceRequest) {
        NewOrderRequest o = new NewOrderRequest();
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

    public NewOrder addOrder(NewOrderRequest orderRequest) {
        Optional<PaymentCard> p = paymentCardRepository.findById(orderRequest.getPaymentCard().getId());
        if (!p.isPresent()) { throw new CardNotFound(); }
        if (orderRequest.getPrice() != calculatePrice(orderRequest)) { throw new InvalidPriceException(); }
        NewOrder o = NewOrderConverter.convert(orderRequest);
        o = orderRepository.save(o);
        List<NewTicket> savedTickets = ticketService.addTickets(orderRequest.getTickets(), o);
        o.setTickets(savedTickets);
        o = orderRepository.save(o);
        try {
            sendOrderConfirmationEmail(o);
        } catch (Exception e) {
            throw new SendEmailException();
        }
        return o;
    }

    private void sendOrderConfirmationEmail(NewOrder newOrder) throws MessagingException, UnsupportedEncodingException {
        String toAddress = newOrder.getCustomer().getUser().getEmail();
        String fromAddress = "cinema.ebooking.b11@gmail.com";
        String senderName = "Cinema E-Booking B-11";
        String subject = "Thank you for your order!";
        String content = "Dear [[NAME]],<br>"
            + "This email is a confirmation of the order:<br>"
            + "<h2>[[MOVIE]] at [[DATETIME]]</h2>"
            + "<h3>Tickets:</h3>";
        content = content.replace("[[NAME]]", newOrder.getCustomer().getFirst() + " " + newOrder.getCustomer().getLast());
        content = content.replace("[[MOVIE]]", newOrder.getTickets().get(0).getShowing().getMovie().getTitle());
        content = content.replace("[[DATETIME]]", newOrder.getTickets().get(0).getShowing().getDateTime()
            .format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG, FormatStyle.SHORT)));
        for (NewTicket ticket : newOrder.getTickets()) {
            content += "<h4>[[TICKETTYPE]] Ticket: Seat [[SEAT]]</h4>";
            content = content.replace("[[TICKETTYPE]]", ticket.getTicketType().getName());
            content = content.replace("[[SEAT]]", ticket.getSeatNumber().toString());
        }
        content += "<h3>Order total: $[[PRICE]]</h3>"
            + "Thank you,<br>"
            + "Cinema E-Booking B11.";
        NumberFormat priceFormat = NumberFormat.getInstance();
        priceFormat.setMaximumFractionDigits(2);
        priceFormat.setMinimumFractionDigits(2);
        content = content.replace("[[PRICE]]", priceFormat.format(newOrder.getPrice()));

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        helper.setText(content, true);

        mailSender.send(message);
    }

    public String deleteOrder(Integer id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return "Order deleted successfully";
        } else {
            throw new OrderNotFoundException();
        }
    }

    private double calculatePrice(NewOrderRequest order) {
        Double price = 0.0;
        for (TicketRequest ticket : order.getTickets()) {
            ticketService.checkValidTicket(ticket);
            price += ticket.getTicketType().getPrice();
        }
        if (order.getPromotion() != null) {
            price *= (1.0 - order.getPromotion().getDiscount());
        }
        return price;
    }
    
}
