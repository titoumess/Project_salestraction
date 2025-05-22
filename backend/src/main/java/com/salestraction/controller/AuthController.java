package com.salestraction.controller;


import com.salestraction.model.Student;
import com.salestraction.model.Company;
import com.salestraction.model.Admin;
import com.salestraction.repository.CompanyRepository;
import com.salestraction.repository.StudentRepository;
import com.salestraction.repository.AdminRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.Map;
import java.util.Optional;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AuthController {

     @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private AdminRepository adminRepository;

    
     @PostMapping("studentsauth/login")
    public ResponseEntity<?> login(@RequestBody Student loginRequest) {
        Optional<Student> student = studentRepository.findByEmailAndPassword(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                         .body(Map.of("message", "Invalid credentials"));
        }
    }

     @PostMapping("companiesauth/login")
    public ResponseEntity<?> login(@RequestBody Company loginRequest) {
        Optional<Company> company = companyRepository.findByEmailAndPassword(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (company.isPresent()) {
            return ResponseEntity.ok(company.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                         .body(Map.of("message", "Invalid credentials"));
        }
    }

     @PostMapping("adminsauth/login")
    public ResponseEntity<?> login(@RequestBody Admin loginRequest) {
        Optional<Admin> admin = adminRepository.findByEmailAndPassword(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );

        if (admin.isPresent()) {
            return ResponseEntity.ok(admin.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                         .body(Map.of("message", "Invalid credentials"));
        }
    }

    

}