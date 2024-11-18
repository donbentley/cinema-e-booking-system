package com.csci4050.showroom.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.csci4050.showing.exceptions.ShowingNotFoundException;
import com.csci4050.showroom.entities.Showroom;
import com.csci4050.showroom.exceptions.ShowroomNotFoundException;
import com.csci4050.showroom.requests.ShowroomRequest;
import com.csci4050.showroom.services.ShowroomService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/showroom")
public class ShowroomController {
    
    @Autowired
    private ShowroomService showroomService;

    @PostMapping("/addNew")
    public ResponseEntity<?> addShowroom(@RequestBody ShowroomRequest showroomRequest) {
        try {
            Showroom result = showroomService.addShowroom(showroomRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllShowrooms() {
        try {
            List<Showroom> result = showroomService.getAllShowrooms();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", "Error fetching data"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getShowroom(@PathVariable Integer id) {
        try {
            Showroom showroom = showroomService.getShowroomById(id);
            return new ResponseEntity<>(showroom, HttpStatus.OK);
        } catch (ShowroomNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteShowroom(@PathVariable Integer id) {
        try {
            String result = showroomService.deleteShowing(id);
            return new ResponseEntity<>(Collections.singletonMap("msg", result), HttpStatus.OK);
        } catch (ShowingNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateShowroom(@PathVariable Integer id, @RequestBody ShowroomRequest showroomRequest) {
        try {
            Showroom result = showroomService.updateShowroom(id, showroomRequest);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (ShowroomNotFoundException e) {
            return new ResponseEntity<>(Collections.singletonMap("msg", e.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
}
