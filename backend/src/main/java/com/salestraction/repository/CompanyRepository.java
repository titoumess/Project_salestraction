package com.salestraction.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.salestraction.model.Company;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    // Custom query methods can be defined here if needed
    // For example, findByEmail(String email) to find a student by their email
    Optional<Company> findById(Integer id_company);

    List<Company> findAll();
    List<Company> findByEmail(String email);
    List<Company> findByName(String name);
    void deleteById(Integer id_company);
    Optional<Company> findBySiret(String siret);

}