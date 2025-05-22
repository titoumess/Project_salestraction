package com.salestraction.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.salestraction.model.Company;
import com.salestraction.model.Student;
import com.salestraction.repository.CompanyRepository;

import java.util.List;


@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public List<Company> getCompaniesByAdminValidation(Integer adminValidation) {
        return companyRepository.findByAdminValidation(adminValidation);
    }

    public Company getCompanyById(Integer id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found"));
    }

    public Company saveCompany(Company company) {
        return companyRepository.save(company);
    }

    public void deleteCompany(Integer id) {
        companyRepository.deleteById(id);
    }

    public Company findByEmail(String email) {
        return companyRepository.findByEmail(email);
    }

    public Company updateCompanyWithPasswordCheck(Integer id, Company updatedCompany) {
        Company existingCompany = getCompanyById(id);
        if (updatedCompany.getPassword() == null || updatedCompany.getPassword().isEmpty()) {
            updatedCompany.setPassword(existingCompany.getPassword());
        }
        updatedCompany.setId_company(id);
        return saveCompany(updatedCompany);
    }
}
