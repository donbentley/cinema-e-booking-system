package com.csci4050.order.entities;
import java.util.ArrayList;
import java.util.List;
import com.csci4050.customer.entities.Customer;
import com.csci4050.paymentcard.entities.PaymentCard;
import com.csci4050.promotion.entities.Promotion;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "orders")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JsonIgnoreProperties("order")
    private Customer customer;
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("order")
    List<NewTicket> tickets = new ArrayList<>();
    @ManyToOne
    private PaymentCard paymentCard;
    @ManyToOne
    private Promotion promotion;
    private Double price;
}