package com.ressumes.Resumes.Skills;

import com.ressumes.Resumes.Person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillsRepository extends JpaRepository<Skills, Integer> {


}