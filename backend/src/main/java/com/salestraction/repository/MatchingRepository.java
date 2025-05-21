package com.salestraction.repository;

import com.salestraction.model.Matching;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchingRepository extends JpaRepository<Matching, Integer> {
    // Méthodes personnalisées si besoin, par exemple :
    List<Matching> findByIdStudent(Integer id_student);
    List<Matching> findByIdOffer(Integer id_offer);
}
