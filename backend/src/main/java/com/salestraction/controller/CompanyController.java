package com.salestraction.controller;

import com.salestraction.model.Company;
import com.salestraction.model.Student;
import com.salestraction.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/companies")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @GetMapping
    public List<Company> getAllCompanies(@RequestParam(value = "admin_validation", required = false) Integer adminValidation) {
        if (adminValidation != null) {
            return companyService.getCompaniesByAdminValidation(adminValidation);
        } else {
            return companyService.getAllCompanies();
        }
    }

    @GetMapping("/{id}")
    public Company getCompanyById(@PathVariable Integer id) {
        return companyService.getCompanyById(id);
    }

    @PostMapping
    public Company createCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    @DeleteMapping("/{id}")
    public void deleteCompany(@PathVariable Integer id) {
        companyService.deleteCompany(id);
    }

    @PostMapping("/auth")
    public ResponseEntity<?> authenticateCompany(@RequestBody AuthRequest authRequest) {
        Company company = companyService.findByEmail(authRequest.getEmail());
        if (company != null && company.getPassword().equals(authRequest.getPassword())) {
            return ResponseEntity.ok(company); // ou retourne un DTO sans le mot de passe
        } else {
            return ResponseEntity.status(401).body("Identifiants incorrects");
        }
    }

    @PutMapping("/{id}/validate")
    public ResponseEntity<?> validateCompany(@PathVariable Integer id, @RequestBody(required = false) Company company) {
        Company c = companyService.getCompanyById(id);
        c.setAdminValidation(1);
        companyService.saveCompany(c);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}")
    public Company updateCompany(@PathVariable("id") Integer id, @RequestBody Company company) {
        return companyService.updateCompanyWithPasswordCheck(id, company);
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
