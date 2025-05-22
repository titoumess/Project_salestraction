package com.salestraction.service;

import com.salestraction.model.Company;
import com.salestraction.model.Offer;
import com.salestraction.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OfferService {

    @Autowired
    private OfferRepository offerRepository;

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    public List<Offer> getOffersByAdminValidation(Integer adminValidation) {
        return offerRepository.findByAdminValidation(adminValidation);
    }

    public Offer getOfferById(int id) {
        return offerRepository.findById(id).orElse(null);
    }

    public List<Offer> getOffersByTitle(String title) {
        return offerRepository.findByTitle(title);
    }

    public List<Offer> getOffersByCompanyId(Integer companyId) {
        return offerRepository.findByIdCompany(companyId);
    }

    public Offer saveOffer(Offer offer) {
        return offerRepository.save(offer);
    }

    public void deleteOffer(int id) {
        offerRepository.deleteById(id);
    }
}