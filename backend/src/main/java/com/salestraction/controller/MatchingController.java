package com.salestraction.controller;

import com.salestraction.model.Matching;
import com.salestraction.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/matching")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    @GetMapping
    public List<Matching> getAllMatches() {
        return matchingService.getAllMatches();
    }

    @GetMapping("/{id}")
    public Matching getMatchById(@PathVariable Integer id) {
        return matchingService.getMatchById(id);
    }

    @GetMapping("/student/{id_student}")
    public List<Matching> getMatchesByIdStudent(@PathVariable Integer id_student) {
        return matchingService.getMatchesByIdStudent(id_student);
    }

    @GetMapping("/offer/{id_offer}")
    public List<Matching> getMatchesByIdOffer(@PathVariable Integer id_offer) {
        return matchingService.getMatchesByIdOffer(id_offer);
    }

    @PostMapping
    public Matching createMatch(@RequestBody Matching match) {
        return matchingService.saveMatch(match);
    }

    @DeleteMapping("/{id}")
    public void deleteMatch(@PathVariable Integer id) {
        matchingService.deleteMatch(id);
    }
}
