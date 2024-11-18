package com.csci4050.showroom.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.csci4050.showroom.converter.ShowroomConverter;
import com.csci4050.showroom.entities.Showroom;
import com.csci4050.showroom.exceptions.ShowroomNotFoundException;
import com.csci4050.showroom.repositories.ShowroomRepository;
import com.csci4050.showroom.requests.ShowroomRequest;

@Service
public class ShowroomService {

    @Autowired
    private ShowroomRepository showroomRepository;

    public Showroom addShowroom(ShowroomRequest showroomRequest) {
        Showroom s = ShowroomConverter.convert(showroomRequest);
        s = showroomRepository.save(s);
        return s;
    }

    public List<Showroom> getAllShowrooms() {
        List<Showroom> showrooms = showroomRepository.findAll();
        return showrooms;
    }

    public Showroom getShowroomById(Integer id) {
        Optional<Showroom> existingShowroom = showroomRepository.findById(id);
        if (!existingShowroom.isPresent()) { throw new ShowroomNotFoundException(); }
        Showroom s = existingShowroom.get();
        return s;
    }

    public String deleteShowing(Integer id) {
        if (showroomRepository.existsById(id)) {
            showroomRepository.deleteById(id);
            return "Showroom deleted successfully";
        } else {
            throw new ShowroomNotFoundException();
        }
    }

    public Showroom updateShowroom(Integer id, ShowroomRequest showroomRequest) {
        Optional<Showroom> existingShowroom = showroomRepository.findById(id);
        if (!existingShowroom.isPresent()) { throw new ShowroomNotFoundException(); }
        Showroom showroomToUpdate = existingShowroom.get();
        Showroom updatedShowroom = ShowroomConverter.convert(showroomRequest);
        updatedShowroom.setId(showroomToUpdate.getId());
        updatedShowroom = showroomRepository.save(updatedShowroom);
        return updatedShowroom;
    }
    
}
