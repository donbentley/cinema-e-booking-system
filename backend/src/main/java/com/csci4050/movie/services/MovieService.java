package com.csci4050.movie.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.csci4050.movie.converter.MovieConverter;
import com.csci4050.movie.repositories.MovieRepository;
import com.csci4050.movie.requests.MovieRequest;
import com.csci4050.movie.entities.Movie;
import com.csci4050.movie.exceptions.MovieAlreadyExists;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    public String addMovie(MovieRequest movieRequest) {
        Optional<Movie> findByTitle = movieRepository.findByTitle(movieRequest.getTitle());

        if (findByTitle.isPresent())
            throw new MovieAlreadyExists();

        Movie movie = MovieConverter.convert(movieRequest);
        movieRepository.save(movie);
        return "movie has been added";
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    public Movie getMovieById(Integer id) {
        Optional<Movie> movie = movieRepository.findById(id);
        return movie.orElse(null);
    }

    public String deleteMovie(Integer id) {
        if (movieRepository.existsById(id)) {
            movieRepository.deleteById(id);
            return "Movie deleted successfully";
        } else {
            return "Movie not found";
        }
    }

    public String updateMovie(Integer id, MovieRequest movieRequest) {
        Optional<Movie> existingMovie = movieRepository.findById(id);
        if (existingMovie.isPresent()) {
            Movie movieToUpdate = existingMovie.get();
            Movie updatedMovie = MovieConverter.convert(movieRequest);
            updatedMovie.setId(movieToUpdate.getId()); // Retain the original ID
            movieRepository.save(updatedMovie);
            return "Movie updated successfully";
        } else {
            return "Movie not found";
        }
    }
}
