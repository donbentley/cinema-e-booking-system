package com.csci4050.order.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.csci4050.order.entities.NewOrder;

public interface NewOrderRepository extends JpaRepository<NewOrder, Integer> {
    
}