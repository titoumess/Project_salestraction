package com.salestraction.controller;

import com.salestraction.model.Offer_file;
import com.salestraction.service.Offer_fileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/offer-files")
public class Offer_fileController {

    @Autowired
    private Offer_fileService offerFileService;

    @GetMapping
    public List<Offer_file> getAllOfferFiles() {
        return offerFileService.getAllOfferFiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer_file> getOfferFileById(@PathVariable Integer id) {
        Optional<Offer_file> offerFile = offerFileService.getOfferFileById(id);
        return offerFile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/offer/{idOffer}")
    public List<Offer_file> getOfferFilesByIdOffer(@PathVariable Integer idOffer) {
        return offerFileService.getOfferFilesByIdOffer(idOffer);
    }

    @PostMapping
    public Offer_file createOfferFile(@RequestBody Offer_file offerFile) {
        return offerFileService.saveOfferFile(offerFile);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOfferFile(@PathVariable Integer id) {
        if (offerFileService.getOfferFileById(id).isPresent()) {
            offerFileService.deleteOfferFile(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}