package com.csci4050.user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci4050.user.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}