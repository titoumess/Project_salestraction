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
    private Integer adminValidation = 0;
    @Column(name = "id_company")
    private Integer idCompany;

    public Offer() {}

    public Offer(Integer id_offer, String title, String description, String product_service, Float remuneration,
                 boolean remote, Integer commission, String status, Integer admin_validation, Integer id_company) {
        this.id_offer = id_offer;
        this.title = title;
        this.description = description;
        this.product_service = product_service;
        this.remuneration = remuneration;
        this.remote = remote;
        this.commission = commission;
        this.status = status;
        this.adminValidation = admin_validation;
        this.idCompany = id_company;
        
    }

    // Getters et Setters
    public Integer getId_offer() {
        return id_offer;
    }

    public void setId_offer(Integer id_offer) {
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

    public Integer getAdminValidation() {
        return adminValidation;
    }

    public void setAdminValidation(Integer admin_validation) {
        this.adminValidation = admin_validation;
    }

    public Integer getIdCompany() {
        return idCompany;
    }

    public void setIdCompany(Integer idCompany) {
        this.idCompany = idCompany;
    }
}

