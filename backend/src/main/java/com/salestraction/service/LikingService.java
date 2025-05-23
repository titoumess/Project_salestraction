package com.salestraction.service;

import com.salestraction.model.Liking;
import com.salestraction.repository.LikingRepository;
import com.salestraction.repository.MatchingRepository;
import com.salestraction.model.Matching;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LikingService {

    @Autowired
    private LikingRepository likingRepository;

    @Autowired
    private MatchingRepository matchingRepository;

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
        Liking saved = likingRepository.save(liking);

        // Vérifier le like mutuel
        if (liking.getIsStudent()) {
            // L'étudiant aime une offre : vérifier si la startup a déjà liké cet étudiant pour cette offre
            Optional<Liking> startupLike = likingRepository.findByIdOfferAndIdStudentAndIsStudent(
                liking.getIdOffer(), liking.getIdStudent(), false
            );
            if (startupLike.isPresent()) {
                // Créer un match si pas déjà existant
                if (!matchingRepository.existsByIdOfferAndIdStudent(liking.getIdOffer(), liking.getIdStudent())) {
                    Matching match = new Matching();
                    match.setIdOffer(liking.getIdOffer());
                    match.setIdStudent(liking.getIdStudent());
                    match.setMatch_date(LocalDateTime.now());
                    matchingRepository.save(match);
                }
            }
        } else {
            // La startup aime un étudiant : vérifier si l'étudiant a déjà liké cette offre
            Optional<Liking> studentLike = likingRepository.findByIdOfferAndIdStudentAndIsStudent(
                liking.getIdOffer(), liking.getIdStudent(), true
            );
            if (studentLike.isPresent()) {
                // Créer un match si pas déjà existant
                if (!matchingRepository.existsByIdOfferAndIdStudent(liking.getIdOffer(), liking.getIdStudent())) {
                    Matching match = new Matching();
                    match.setIdOffer(liking.getIdOffer());
                    match.setIdStudent(liking.getIdStudent());
                    match.setMatch_date(LocalDateTime.now());
                    matchingRepository.save(match);
                }
            }
        }

        return saved;
    }

    public void deleteLiking(Integer id) {
        likingRepository.deleteById(id);
    }
}