package com.ressumes.Resumes.Education;

import com.ressumes.Resumes.Education.Education;
import com.ressumes.Resumes.Education.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EducationService {
    @Autowired
    private EducationRepository educationRepository;
    public List<Education> getAllEducation(){
        List<Education> educations = new ArrayList<>();
        educationRepository.findAll().forEach(educations ::add);
        return educations;
    }

    public void addEducation(Education education) {
        educationRepository.save(education);
    }

    public void updateEducation(Education education) {
        educationRepository.save(education);
    }

    public void deleteEducation(int EducationID) {
        educationRepository.delete(educationRepository.getOne(EducationID));

    }

    public Optional<Education> getOneEducation(int EducationID) {
        Optional<Education> p = educationRepository.findById(EducationID);
        return p ;

    }

    public Optional<Education> EducationById(int educationID) {
        return educationRepository.findById(educationID);
    }
}
