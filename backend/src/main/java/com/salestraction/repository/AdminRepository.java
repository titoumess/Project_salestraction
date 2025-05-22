package com.salestraction.repository;

import com.salestraction.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {
    Admin findByEmail(String email);

    Optional<Admin> findByEmailAndPassword(String email, String password);
}