package com.ressumes.Resumes.Education;

import com.ressumes.Resumes.Education.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Integer> {


}