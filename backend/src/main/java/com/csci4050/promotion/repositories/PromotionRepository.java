package com.csci4050.promotion.repositories;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci4050.promotion.entities.Promotion;

public interface PromotionRepository extends JpaRepository<Promotion, Integer> {
    Optional<Promotion> findByEvent(String event);
}
