package com.salestraction.controller;

import com.salestraction.model.Liking;
import com.salestraction.service.LikingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/likings")
public class LikingController {

    @Autowired
    private LikingService likingService;

    @GetMapping
    public List<Liking> getAllLikings() {
        return likingService.getAllLikings();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Liking> getLikingById(@PathVariable Integer id) {
        Optional<Liking> liking = likingService.getLikingById(id);
        return liking.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/offer/{idOffer}")
    public List<Liking> getLikingsByIdOffer(@PathVariable Integer idOffer) {
        return likingService.getLikingsByIdOffer(idOffer);
    }

    @GetMapping("/student/{idStudent}")
    public List<Liking> getLikingsByIdStudent(@PathVariable Integer idStudent) {
        return likingService.getLikingsByIdStudent(idStudent);
    }

    @GetMapping("/is-student/{isStudent}")
    public List<Liking> getLikingsByIsStudent(@PathVariable Boolean isStudent) {
        return likingService.getLikingsByIsStudent(isStudent);
    }

    @PostMapping
    public Liking createLiking(@RequestBody Liking liking) {
        return likingService.saveLiking(liking);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLiking(@PathVariable Integer id) {
        if (likingService.getLikingById(id).isPresent()) {
            likingService.deleteLiking(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}