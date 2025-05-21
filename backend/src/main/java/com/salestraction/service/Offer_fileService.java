package com.salestraction.service;

import com.salestraction.model.Offer_file;
import com.salestraction.repository.Offer_fileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class Offer_fileService {

    @Autowired
    private Offer_fileRepository offerFileRepository;

    public List<Offer_file> getAllOfferFiles() {
        return offerFileRepository.findAll();
    }

    public Optional<Offer_file> getOfferFileById(Integer id) {
        return offerFileRepository.findById(id);
    }

    public List<Offer_file> getOfferFilesByIdOffer(Integer idOffer) {
        return offerFileRepository.findByIdOffer(idOffer);
    }

    public Offer_file saveOfferFile(Offer_file offerFile) {
        return offerFileRepository.save(offerFile);
    }

    public void deleteOfferFile(Integer id) {
        offerFileRepository.deleteById(id);
    }
}