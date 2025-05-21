package com.salestraction.service;

import com.salestraction.model.Liking;
import com.salestraction.repository.LikingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikingService {

    @Autowired
    private LikingRepository likingRepository;

    public List<Liking> getAllLikings() {
        return likingRepository.findAll();
    }

    public Optional<Liking> getLikingById(Integer id) {
        return likingRepository.findById(id);
    }

    public List<Liking> getLikingsByIdOffer(Integer idOffer) {
        return likingRepository.findByIdOffer(idOffer);
    }

    public List<Liking> getLikingsByIdStudent(Integer idStudent) {
        return likingRepository.findByIdStudent(idStudent);
    }

    public List<Liking> getLikingsByIsStudent(Boolean isStudent) {
        return likingRepository.findByIsStudent(isStudent);
    }

    public Liking saveLiking(Liking liking) {
        return likingRepository.save(liking);
    }

    public void deleteLiking(Integer id) {
        likingRepository.deleteById(id);
    }
}