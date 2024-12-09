package com.csci4050.showing.controllers;

import com.csci4050.showing.entities.*;
import com.csci4050.showing.exceptions.ShowingNotFoundException;
import com.csci4050.showing.requests.ShowingRequest;
import com.csci4050.showing.services.ShowingService;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/showing")
public class ShowingController {
    @Autowired
    private ShowingService showingService;

    @PostMapping("/addNew")
    public ResponseEntity<?> addShowing(@RequestBody ShowingRequest showingRequest) {
        try {
            Showing result = showingService.addShowing(showingRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllShowings() {
        try {
            List<Showing> result = showingService.getAllShowings();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", "Error fetching data"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getAll/movie/{movieId}")
    public ResponseEntity<?> getAllShowingsByMovie(@PathVariable Integer movieId) {
        try {
            List<Showing> result = showingService.getAllShowingsByMovie(movieId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ShowingNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }

    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getShowing(@PathVariable Integer id) {
        try { 
            Showing showing = showingService.getShowingById(id);
            return new ResponseEntity<>(showing, HttpStatus.OK);
        } catch (ShowingNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteShowing(@PathVariable Integer id) {
        try {
            String result = showingService.deleteShowing(id);
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } catch (ShowingNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateShowing(@PathVariable Integer id, @RequestBody ShowingRequest showingRequest) {
        try {
            Showing result = showingService.updateShowing(id, showingRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ShowingNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getSeats/{id}")
    public ResponseEntity<?> getAvailableSeats(@PathVariable Integer id) {
        try {
            List<Boolean> result = showingService.getAvailableSeats(id);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ShowingNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
