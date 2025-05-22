package com.salestraction.repository;

<<<<<<< HEAD
import com.salestraction.model.Offer;
=======

>>>>>>> a84dc46 (Ajout Authentification + Redirection vers page)
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.salestraction.model.Offer;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    List<Offer> findAll();
    List<Offer> findByTitle(String title);
    List<Offer> findByIdCompany(Integer idCompany); 
    List<Offer> findByAdminValidation(Integer adminValidation);
}