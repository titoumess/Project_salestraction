package com.salestraction.service;

import com.salestraction.model.Matching;
import com.salestraction.repository.MatchingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class MatchingService {

    @Autowired
    private MatchingRepository matchRepository;

    public List<Matching> getAllMatches() {
        return matchRepository.findAll();
    }

    public Matching getMatchById(Integer id) {
        return matchRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Match not found"));
    }

    public List<Matching> getMatchesByIdStudent(Integer id_student) {
        return matchRepository.findByIdStudent(id_student);
    }

    public List<Matching> getMatchesByIdOffer(Integer id_offer) {
        return matchRepository.findByIdOffer(id_offer);
    }

    public Matching saveMatch(Matching match) {
        return matchRepository.save(match);
    }

    public void deleteMatch(Integer id) {
        matchRepository.deleteById(id);
    }
}
