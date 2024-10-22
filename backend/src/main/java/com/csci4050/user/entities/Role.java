package com.csci4050.user.entities;

import lombok.Getter;
import lombok.Setter;

import jakarta.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
}