package com.salestraction.repository;

import com.salestraction.Model.Student;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Custom query methods can be defined here if needed
    // For example, findByEmail(String email) to find a student by their email
    Optional<Student> findById(Integer id_student);

    List<Student> findAll();
    List<Student> findByEmail(String email);
    List<Student> findByFirstname(String firstname);
    void deleteById(Integer id_student);

}
