package com.ressumes.Resumes.Employment;

import com.ressumes.Resumes.Employment.Employment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmploymentRepository extends JpaRepository<Employment, Integer> {


}