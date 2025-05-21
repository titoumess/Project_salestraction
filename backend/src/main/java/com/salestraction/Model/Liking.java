package com.salestraction.model;

import jakarta.persistence.*;

@Entity
public class Liking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idLike;

    private Integer idOffer;
    private Integer idStudent;
    private Boolean isStudent;

    public Liking() {}

    public Liking(Integer id_like, Integer id_offer, Integer id_student, Boolean is_student) {
        this.idLike = id_like;
        this.idOffer = id_offer;
        this.idStudent = id_student;
        this.isStudent = is_student;
    }

    public Integer getIdLike() {
        return idLike;
    }

    public void setIdLike(Integer idLike) {
        this.idLike = idLike;
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

    public void setIdStudent(Integer idStudent) {
        this.idStudent = idStudent;
    }

    public Boolean getIsStudent() {
        return isStudent;
    }

    public void setIsStudent(Boolean isStudent) {
        this.isStudent = isStudent;
    }
}

