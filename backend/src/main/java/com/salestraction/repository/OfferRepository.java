package com.salestraction.repository;

<<<<<<< HEAD
<<<<<<< HEAD
import com.salestraction.model.Offer;
=======

>>>>>>> a84dc46 (Ajout Authentification + Redirection vers page)
=======
import com.salestraction.model.Offer;
>>>>>>> 9427fdc (Admin dashbord)
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.salestraction.model.Offer;

import java.util.List;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Integer> {
    List<Offer> findAll();
    List<Offer> findByTitle(String title);
<<<<<<< HEAD
    List<Offer> findByIdCompany(Integer idCompany); 
=======
    //List<Offer> findByCompany_IdCompany(int idCompany);
>>>>>>> 9427fdc (Admin dashbord)
    List<Offer> findByAdminValidation(Integer adminValidation);
}