package com.salestraction.model;

import jakarta.persistence.*;

@Entity

public class Company {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_company;

    private String name;
    private String email;
    private String password;
    private String phone_number;
    private Integer postal_code;
    private Integer adminValidation = 0;
    private String siret;

    public Company() {}

    public Company(Integer id_company, String name, String email, String password, String phone_number,
                   Integer postal_code, Integer admin_validation, String siret) {
        this.id_company = id_company;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.postal_code = postal_code;
        this.adminValidation = admin_validation;
        this.siret = siret;
    }

    // Getters et Setters
    public Integer getId_company() {
        return id_company;
    }

    public void setId_company(Integer id_company) {
        this.id_company = id_company;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }


    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public String getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }


    public Integer getPostal_code() {
        return postal_code;
    }

    public void setPostal_code(Integer postal_code) {
        this.postal_code = postal_code;
    }


    public Integer getAdminValidation() {
        return adminValidation;
    }

    public void setAdminValidation(Integer admin_validation) {
        this.adminValidation = admin_validation;
    }


    public String getSiret() {
        return siret;
    }

    public void setSiret(String siret) {
        this.siret = siret;
    }

}
