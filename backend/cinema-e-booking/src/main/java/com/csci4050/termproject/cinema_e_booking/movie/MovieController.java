package com.csci4050.termproject.cinema_e_booking.movie;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api")
public class MovieController {
    
    @Autowired
    private MovieRepository movieRepo;

    @GetMapping("/movies")
    public ResponseEntity<List<Movie>> FindAllMovies() {
        return ResponseEntity.ok().body(movieRepo.findAll());
    }

    @GetMapping("/movies/{id}")
    public ResponseEntity<Movie> getMovieById(String id){
        Movie movie = movieRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Movie not found for id :: " + id));
        return ResponseEntity.ok().body(movie);
    }

    @PostMapping("/movies")
    public ResponseEntity<Movie> createMovie(@RequestBody Movie movie) {
        return ResponseEntity.ok().body(movieRepo.save(movie));
    }

    @PutMapping("/movies/{id}")
    public ResponseEntity<Movie> updateMovie(String id, @RequestBody Movie movieDetails) throws ResourceNotFoundException {
        Movie movie = movieRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Movie not found for id :: " + id));
        
        movie.setId(movieDetails.getId());
        movie.setCategory(movieDetails.getCategory());
        movie.setCast(movieDetails.getCast());
        movie.setDirector(movieDetails.getDirector());
        movie.setProducer(movieDetails.getProducer());
        movie.setSynopsis(movieDetails.getSynopsis());
        movie.setReviewLink(movieDetails.getReviewLink());
        movie.setPictureLink(movieDetails.getPictureLink());
        movie.setTrailerLink(movieDetails.getTrailerLink());
        movie.setMpaaRating(movieDetails.getMpaaRating());

        return ResponseEntity.ok().body(movieRepo.save(movie));
    } 

    @DeleteMapping("/movies/{id}")
    public Map<String, Boolean> deleteMovie(String id) throws ResourceNotFoundException {
        Movie movie = movieRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Movie not found for id :: " + id));

        movieRepo.delete(movie);
        Map < String, Boolean > response = new HashMap < > ();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
