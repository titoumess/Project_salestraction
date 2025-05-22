package com.salestraction.service;

import com.salestraction.Model.Offer;
import com.salestraction.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public Offer getOfferById(int id) {
        return offerRepository.findById(id);
    }

    public List<Offer> getOffersByTitle(String title) {
        return offerRepository.findByTitle(title);
    }

    //public List<Offer> getOffersByCompanyId(int idCompany) {
      //  return offerRepository.findByCompany_IdCompany(idCompany);
    //}

    public Offer saveOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    public void deleteOffer(int id) {
        offerRepository.deleteById(id);
    }
}