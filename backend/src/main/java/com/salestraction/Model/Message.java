package com.salestraction.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_message;

    private Integer idMatch;
    private LocalDateTime send_date;
    private String content;
    private Integer idSender;
    private Integer idReceiver;
    private Boolean isStudent;

    public Message() {}

    public Message(Integer id_message, Integer id_match, LocalDateTime send_date, String content, Integer id_sender, Integer id_receiver, Boolean is_student) {
        this.id_message = id_message;
        this.idMatch = id_match;
        this.send_date = send_date;
        this.content = content;
        this.idSender = id_sender;
        this.idReceiver = id_receiver;
        this.isStudent = is_student;
    }

    public Integer getId_message() {
        return id_message;
    }

    public void setId_message(Integer id_message) {
        this.id_message = id_message;
    }

    public Integer getId_match() {
        return idMatch;
    }

    public void setId_match(Integer id_match) {
        this.idMatch = id_match;
    }

    public LocalDateTime getSend_date() {
        return send_date;
    }

    public void setSend_date(LocalDateTime send_date) {
        this.send_date = send_date;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getId_sender() {
        return idSender;
    }

    public void setId_sender(Integer id_sender) {
        this.idSender = id_sender;
    }

    public Integer getId_receiver() {
        return idReceiver;
    }

    public void setId_receiver(Integer id_receiver) {
        this.idReceiver = id_receiver;
    }

    public Boolean getIs_student() {
        return isStudent;
    }

    public void setIs_student(Boolean is_student) {
        this.isStudent = is_student;
    }
}

