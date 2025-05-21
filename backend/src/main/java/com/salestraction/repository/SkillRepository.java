package com.salestraction.repository;

import com.salestraction.model.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Integer> {
    // Ajoute ici des méthodes personnalisées si besoin, par exemple :
    Optional<Skill> findByName(String name);

}
