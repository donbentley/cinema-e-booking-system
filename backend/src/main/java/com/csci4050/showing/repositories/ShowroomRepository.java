package com.csci4050.showing.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci4050.showing.entities.Showroom;

@Repository
public interface ShowroomRepository extends JpaRepository<Showroom, Integer> {
    
}
