package com.csci4050.movie.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.csci4050.movie.entities.Movie;

import java.util.Optional;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    Optional<Movie> findByTitle(String title);
    List<Movie> findAllByTitleLike(String title);
}