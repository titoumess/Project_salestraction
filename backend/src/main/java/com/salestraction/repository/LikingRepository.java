package com.salestraction.repository;

import com.salestraction.model.Liking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikingRepository extends JpaRepository<Liking, Integer> {
    List<Liking> findByIdOffer(Integer idOffer);
    List<Liking> findByIdStudent(Integer idStudent);
    List<Liking> findByIsStudent(Boolean isStudent);
    Optional<Liking> findByIdOfferAndIdStudentAndIsStudent(Integer idOffer, Integer idStudent, Boolean isStudent);
}