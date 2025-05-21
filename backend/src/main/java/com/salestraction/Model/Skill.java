package com.salestraction.model;

import jakarta.persistence.*;

@Entity

public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_skill;

    private String name;

    public Skill() {}

    public Skill(Integer id_skill, String name) {
        this.id_skill = id_skill;
        this.name = name;
    }

    // Getters et Setters
    public Integer getSkill_id() {
        return id_skill;
    }

    public void setSkill_id(Integer id_skill) {
        this.id_skill = id_skill;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}