package com.salestraction.controller;

import com.salestraction.model.Student;
import com.salestraction.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents(@RequestParam(value = "admin_validation", required = false) Integer adminValidation) {
        if (adminValidation != null) {
            return studentService.getStudentsByAdminValidation(adminValidation);
        } else {
            return studentService.getAllStudents();
        }
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable Integer id) {
        return studentService.getStudentById(id);
    }

    @PostMapping
    public Student createStudent(@RequestBody Student student) {
        System.out.println(student); // Ajoute ceci pour voir ce que tu reçois
        return studentService.saveStudent(student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Integer id) {
        studentService.deleteStudent(id);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateStudent(@RequestBody AuthRequest authRequest) {
        Student student = studentService.findByEmail(authRequest.getEmail());
        if (student != null && student.getPassword().equals(authRequest.getPassword())) {
            return ResponseEntity.ok(student); // ou retourne un DTO sans le mot de passe
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Identifiants incorrects");
        }
    }

    @PutMapping("/{id}/validate")
    public ResponseEntity<?> validateStudent(@PathVariable Integer id, @RequestBody(required = false) Student student) {
        Student s = studentService.getStudentById(id);
        s.setAdminValidation(1);
        studentService.saveStudent(s);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable Integer id, @RequestBody Student student) {
        return studentService.updateStudentWithPasswordCheck(id, student);
    }


    // Classe interne ou fichier séparé pour recevoir l'email et le mot de passe
    public static class AuthRequest {
        private String email;
        private String password;

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
    }
}