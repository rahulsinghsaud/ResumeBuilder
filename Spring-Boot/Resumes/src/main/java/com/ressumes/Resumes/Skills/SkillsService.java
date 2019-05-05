package com.ressumes.Resumes.Skills;

import com.ressumes.Resumes.Skills.Skills;
import com.ressumes.Resumes.Skills.SkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SkillsService {
    @Autowired
    private SkillsRepository skillsRepository;
    public List<Skills> getAllSkills(){
        List<Skills> skills = new ArrayList<>();
        skillsRepository.findAll().forEach(skills ::add);
        return skills;
    }

    public void addSkills(Skills skills) {
        skillsRepository.save(skills);
    }

    public void updateSkills(Skills skills) {
        skillsRepository.save(skills);
    }

    public void deleteSkills(int SkillsID) {
        skillsRepository.delete(skillsRepository.getOne(SkillsID));

    }

    public Optional<Skills> getOneSkills(int SkillsID) {
        Optional<Skills> p = skillsRepository.findById(SkillsID);
        return p ;

    }

    public Optional<Skills> SkillsById(int skillsID) {
        return skillsRepository.findById(skillsID);
    }
}
