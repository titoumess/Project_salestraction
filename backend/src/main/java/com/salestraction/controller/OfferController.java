package com.salestraction.controller;

import com.salestraction.model.Company;
import com.salestraction.model.Offer;
import com.salestraction.service.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    private OfferService offerService;

    @GetMapping
    public List<Offer> getAllOffers(@RequestParam(value = "admin_validation", required = false) Integer adminValidation) {
        if (adminValidation != null) {
            return offerService.getOffersByAdminValidation(adminValidation);
        } else {
            return offerService.getAllOffers();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable int id) {
        Offer offer = offerService.getOfferById(id);
        if (offer != null) {
            return ResponseEntity.ok(offer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/title/{title}")
    public List<Offer> getOffersByTitle(@PathVariable String title) {
        return offerService.getOffersByTitle(title);
    }

    //@GetMapping("/company/{idCompany}")
    //public List<Offer> getOffersByCompanyId(@PathVariable int id_company) {
    //    return offerService.getOffersByCompanyId(id_company);
    //}

    @PostMapping
    public Offer createOffer(@RequestBody Offer offer) {
        return offerService.saveOffer(offer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable int id) {
        Offer offer = offerService.getOfferById(id);
        if (offer != null) {
            offerService.deleteOffer(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/validate")
    public ResponseEntity<?> validateOffer(@PathVariable Integer id, @RequestBody(required = false) Offer offer) {
        Offer o = offerService.getOfferById(id);
        o.setAdminValidation(1);
        offerService.saveOffer(o);
        return ResponseEntity.ok().build();
    }
}