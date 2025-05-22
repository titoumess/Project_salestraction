package com.salestraction.repository;

import com.salestraction.model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.salestraction.model.Offer;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    // Exemples de méthodes personnalisées
    List<Offer> findAll();
    Offer findById(int id);
    List<Offer> findByTitle(String title);
    //List<Offer> findByCompany_IdCompany(int idCompany);
    List<Offer> findByAdminValidation(Integer adminValidation);
}