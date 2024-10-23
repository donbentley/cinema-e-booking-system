package com.csci4050.paymentcard.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.csci4050.paymentcard.converters.PaymentCardConverter;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.paymentcard.exceptions.CardAlreadyExists;
import com.csci4050.paymentcard.exceptions.TooManyCards;
import com.csci4050.paymentcard.repositories.PaymentCardRepository;
import com.csci4050.paymentcard.requests.PaymentCardRequest;


@Service
public class PaymentCardService {

    @Autowired
    private PaymentCardRepository paymentCardRepository;

    
    
    public String addCard(PaymentCardRequest paymentCardRequest) {

        List<PaymentCard> findByCustomer = paymentCardRepository.findByCustomer(paymentCardRequest.getCustomer());
        if (findByCustomer.size() >= 3) { throw new TooManyCards(); }

        PaymentCard findByCardNumber = paymentCardRepository.findByCardNumber(paymentCardRequest.getCardNumber());
        if (findByCardNumber != null) { throw new CardAlreadyExists(); }
        
        PaymentCard paymentCard = PaymentCardConverter.convert(paymentCardRequest);
        paymentCardRepository.save(paymentCard);
        return ("Card added successfully");
    }

    public PaymentCard getPaymentCardById(Integer id) {
        Optional<PaymentCard> paymentCard = paymentCardRepository.findById(id);
        return paymentCard.orElse(null);
    }

    public String deletePaymentCard(Integer id) {
        if (paymentCardRepository.existsById(id)) {
            paymentCardRepository.deleteById(id);
            return ("Card deleted successfully");
        } else {
            return ("Card not found");
        }
    }

    public String updatePaymentCard(Integer id, PaymentCardRequest paymentCardRequest) {
        Optional<PaymentCard> existingPaymentCard = paymentCardRepository.findById(id);
        if (existingPaymentCard.isPresent()) {
            PaymentCard cardToUpdate = existingPaymentCard.get();
            PaymentCard updatedPaymentCard = PaymentCardConverter.convert(paymentCardRequest);
            updatedPaymentCard.setId(cardToUpdate.getId());
            paymentCardRepository.save(updatedPaymentCard);
            return ("Card updated successfully");
        } else {
            return ("Card not found");
        }
    }

}