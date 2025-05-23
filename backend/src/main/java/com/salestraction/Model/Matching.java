package com.salestraction.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity

public class Matching {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_match;


    private Integer idOffer;
    private Integer idStudent;
    private LocalDateTime match_date;

    public Matching() {}

    public Matching(Integer id_match, String name, Integer idOffer, Integer idStudent, LocalDateTime match_date) {
        this.id_match = id_match;
        this.idOffer = idOffer;
        this.idStudent = idStudent;
        this.match_date = match_date;
    }


    // Getters et Setters   
    public Integer getId_match() {
        return id_match;
    }

    public void setId_match(Integer id_match) {
        this.id_match = id_match;
    }


    public Integer getIdOffer() {
        return idOffer;
    }

    public void setIdOffer(Integer idOffer) {
        this.idOffer = idOffer;
    }


    public Integer getIdStudent() {
        return idStudent;
    }

    public void setIdStudent(Integer id_student) {
        this.idStudent = id_student;
    }

    
    public LocalDateTime getMatch_date() {
        return match_date;
    }

    public void setMatch_date(LocalDateTime match_date) {
        this.match_date = match_date;
    }

}
