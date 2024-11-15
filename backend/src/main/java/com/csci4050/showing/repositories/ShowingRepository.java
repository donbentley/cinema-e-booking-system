package com.csci4050.showing.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.csci4050.movie.entities.Movie;
import com.csci4050.showing.entities.Showing;
import com.csci4050.showing.entities.Showroom;

@Repository
public interface ShowingRepository extends JpaRepository<Showing, Integer> {
    List<Showing> findAllByMovie(Movie movie);
    Optional<Showing> findByDateTimeAndShowroom(LocalDateTime dateTime, Showroom showroom);
    Optional<Showing> findByDateTimeBetween(LocalDateTime from, LocalDateTime to);
}
