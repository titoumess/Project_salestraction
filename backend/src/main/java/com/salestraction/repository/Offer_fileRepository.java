package com.salestraction.repository;

import com.salestraction.model.Offer_file;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Offer_fileRepository extends JpaRepository<Offer_file, Integer> {
    List<Offer_file> findByIdOffer(Integer idOffer);
}