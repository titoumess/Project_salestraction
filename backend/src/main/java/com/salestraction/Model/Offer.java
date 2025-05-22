package com.salestraction.model;

import jakarta.persistence.*;

@Entity
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_offer;

    private String title;
    private String description;
    private String product_service;
    private Float remuneration;
    private boolean remote;
    private Integer commission;
    private String status;
    private boolean admin_validation = false;
    private Integer id_company;

    public Offer() {}

    public Offer(Integer id_offer, String title, String description, String product_service, Float remuneration,
                 boolean remote, Integer commission, String status, boolean admin_validation, Integer id_company) {
        this.id_offer = id_offer;
        this.title = title;
        this.description = description;
        this.product_service = product_service;
        this.remuneration = remuneration;
        this.remote = remote;
        this.commission = commission;
        this.status = status;
        this.admin_validation = admin_validation;
        this.id_company = id_company;
        
    }

    // Getters et Setters
    public Integer getOffer_id() {
        return id_offer;
    }

    public void setOffer_id(Integer id_offer) {
        this.id_offer = id_offer;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProduct_service() {
        return product_service;
    }

    public void setProduct_service(String product_service) {
        this.product_service = product_service;
    }

    public Float getRemuneration() {
        return remuneration;
    }

    public void setRemuneration(Float remuneration) {
        this.remuneration = remuneration;
    }

    public boolean isRemote() {
        return remote;
    }

    public void setRemote(boolean remote) {
        this.remote = remote;
    }

    public Integer getCommission() {
        return commission;
    }

    public void setCommission(Integer commission) {
        this.commission = commission;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isAdmin_validation() {
        return admin_validation;
    }

    public void setAdmin_validation(boolean admin_validation) {
        this.admin_validation = admin_validation;
    }

    public Integer getId_company() {
        return id_company;
    }

    public void setId_company(Integer id_company) {
        this.id_company = id_company;
    }
}

