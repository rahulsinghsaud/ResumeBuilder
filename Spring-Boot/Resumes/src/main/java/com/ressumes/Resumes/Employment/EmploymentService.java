package com.ressumes.Resumes.Employment;

import com.ressumes.Resumes.Employment.Employment;
import com.ressumes.Resumes.Employment.EmploymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmploymentService {
    @Autowired
    private EmploymentRepository employmentRepository;
    public List<Employment> getAllEmployment(){
        List<Employment> employments = new ArrayList<>();
        employmentRepository.findAll().forEach(employments ::add);
        return employments;
    }

    public void addEmployment(Employment employment) {
        employmentRepository.save(employment);
    }

    public void updateEmployment(Employment employment) {
        employmentRepository.save(employment);
    }

    public void deleteEmployment(int EmploymentID) {
        employmentRepository.delete(employmentRepository.getOne(EmploymentID));

    }

    public Optional<Employment> getOneEmployment(int EmploymentID) {
        Optional<Employment> p = employmentRepository.findById(EmploymentID);
        return p ;

    }

    public Optional<Employment> EmploymentById(int employmentID) {
        return employmentRepository.findById(employmentID);
    }
}
