package com.salestraction.model;

import jakarta.persistence.*;

@Entity
public class Offer_file {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_file;

    private String fileName;
    private String fileUrl;
    private String fileType;
    private Integer idOffer;

    public Offer_file() {}

    public Offer_file(Integer id_file, String fileName, String fileUrl, String fileType, Integer idOffer) {
        this.id_file = id_file;
        this.fileName = fileName;
        this.fileUrl = fileUrl;
        this.fileType = fileType;
        this.idOffer = idOffer;
    }

    public Integer getId_file() {
        return id_file;
    }

    public void setId_file(Integer id_file) {
        this.id_file = id_file;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public Integer getIdOffer() {
        return idOffer;
    }

    public void setIdOffer(Integer idOffer) {
        this.idOffer = idOffer;
    }
}

