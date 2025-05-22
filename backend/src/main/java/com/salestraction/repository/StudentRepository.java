package com.salestraction.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.salestraction.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
    // Custom query methods can be defined here if needed
    // For example, findByEmail(String email) to find a student by their email
    Optional<Student> findById(Integer id_student);

    List<Student> findAll();
    Student findByEmail(String email);
    List<Student> findByFirstname(String firstname);
    void deleteById(Integer id_student);
    List<Student> findByAdminValidation(Integer adminValidation);
<<<<<<< HEAD

    Optional<Student> findByEmailAndPassword(String email, String password);
=======
>>>>>>> 9427fdc (Admin dashbord)

}
