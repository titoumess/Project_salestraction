package com.salestraction.repository;

import com.salestraction.model.Offer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    List<Offer> findAll();
    List<Offer> findByTitle(String title);
    List<Offer> findByIdCompany(Integer idCompany);
    List<Offer> findByAdminValidation(Integer adminValidation);
}