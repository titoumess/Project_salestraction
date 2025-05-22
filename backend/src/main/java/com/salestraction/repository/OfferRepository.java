package com.salestraction.repository;


import com.salestraction.Model.Offer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    // Exemples de méthodes personnalisées
    List<Offer> findAll();
    Offer findById(int id);
    List<Offer> findByTitle(String title);
    //List<Offer> findByCompany_IdCompany(int idCompany);
}