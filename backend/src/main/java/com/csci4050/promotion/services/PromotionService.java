package com.csci4050.promotion.services;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import com.csci4050.customer.entities.Customer;
import com.csci4050.customer.repositories.CustomerRepository;
import com.csci4050.promotion.converter.PromotionConverter;
import com.csci4050.promotion.entities.Promotion;
import com.csci4050.promotion.exceptions.InactivePromotionException;
import com.csci4050.promotion.exceptions.ModifyActivePromotionException;
import com.csci4050.promotion.exceptions.PromotionNotFoundException;
import com.csci4050.promotion.exceptions.SendEmailException;
import com.csci4050.promotion.repositories.PromotionRepository;
import com.csci4050.promotion.requests.PromotionRequest;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

@Service
public class PromotionService {

    @Autowired
    public PromotionRepository promotionRepository;

    @Autowired
    public CustomerRepository customerRepository;

    @Autowired
    private JavaMailSender mailSender;


    public List<Promotion> getAllPromotions() {
        List<Promotion> promotions = promotionRepository.findAll();
        return promotions;
    }

    public Promotion addPromotion(PromotionRequest promotionRequest) {
        Promotion p = PromotionConverter.convert(promotionRequest);
        p = promotionRepository.save(p);
        return p;
    }

    public Promotion updatePromotion(Integer id, Promotion promotionUpdate) {
        Optional<Promotion> existingPromotion = promotionRepository.findById(id);
        if (!existingPromotion.isPresent()) { throw new PromotionNotFoundException(); }
        Promotion p = existingPromotion.get();
        if (p.isActive()) { throw new ModifyActivePromotionException(); }
        p.setEvent(promotionUpdate.getEvent());
        p.setDiscount(promotionUpdate.getDiscount());
        p = promotionRepository.save(p);
        return p;
    }

    public Promotion getPromotionById(Integer id) {
        Optional<Promotion> existingPromotion = promotionRepository.findById(id);
        if (!existingPromotion.isPresent()) { throw new PromotionNotFoundException(); }
        Promotion p = existingPromotion.get();
        return p;
    }

    public String deletePromotion(Integer id) {
        if (promotionRepository.existsById(id)) {
            promotionRepository.deleteById(id);
            return "Promotion deleted succesfully";
        } else {
            throw new PromotionNotFoundException();
        }
    }

    public String activatePromotion(Integer id) {
        Optional<Promotion> existingPromotion = promotionRepository.findById(id);
        if (!existingPromotion.isPresent()) { 
            throw new PromotionNotFoundException(); 
        }
        Promotion p = existingPromotion.get();
        p.setActive(true);
        
        // Logging before saving
        System.out.println("Activating promotion: " + p);
    
        promotionRepository.save(p); // Persist change
    
        try {
            sendPromotionEmails(p);
        } catch (Exception e) {
            throw new SendEmailException();
        }
        return "Promotion is active, emails sent to mailing list";
    }
    

    public String sendPromotionEmailById(Integer id) {
        Optional<Promotion> existingPromotion = promotionRepository.findById(id);
        if (!existingPromotion.isPresent()) { throw new PromotionNotFoundException(); }
        Promotion p = existingPromotion.get();
        if (!p.isActive()) { throw new InactivePromotionException(); }

        try {
            sendPromotionEmails(p);
        } catch (Exception e) {
            throw new SendEmailException();
        }
        return "Emails sent to mailing list";
    }

    public void sendPromotionEmails(Promotion p) throws MessagingException, UnsupportedEncodingException {
        List<Customer> customerMailingList = customerRepository.findAllByPromotionsSubscriberTrue();
        for (Customer customer : customerMailingList) {
            sendPromotionEmail(p, customer);
        }
    }

    private void sendPromotionEmail(Promotion p, Customer c) throws MessagingException, UnsupportedEncodingException {
        String toAddress = c.getUser().getEmail();
        String fromAddress = "cinema.ebooking.b11@gmail.com";
        String senderName = "Cinema E-Booking B-11";
        String subject = "A new promotion is active!";
        String content = "Dear [[NAME]],<br>"
            + "A new promotion is active!:<br>"
            + "<h3>[[EVENT]]</h3>"
            + "<h4>[[DISCOUNT]]% off your order.</h4>"
            + "We hope you'll take advantage of this deal. <br>"
            + "Thank you,<br>"
            + "Cinema E-Booking B11.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        
        content = content.replace("[[NAME]]", c.getFirst() + " " + c.getLast());
        content = content.replace("[[EVENT]]", p.getEvent());
        content = content.replace("[[DISCOUNT]]", "" + (int)(p.getDiscount()));
        helper.setText(content, true);

        mailSender.send(message);
    }


    public Promotion redeemPromotionById(Integer id) {
        Optional<Promotion> existingPromotion = promotionRepository.findById(id);
        if (!existingPromotion.isPresent()) { throw new PromotionNotFoundException(); }
        Promotion p = existingPromotion.get();
        if (!p.isActive()) { throw new InactivePromotionException(); }
        return p;
    }
    
}
