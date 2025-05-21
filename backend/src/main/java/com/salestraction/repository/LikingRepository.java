package com.salestraction.repository;

import com.salestraction.model.Liking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikingRepository extends JpaRepository<Liking, Integer> {
    List<Liking> findByIdOffer(Integer idOffer);
    List<Liking> findByIdStudent(Integer idStudent);
    List<Liking> findByIsStudent(Boolean isStudent);
}