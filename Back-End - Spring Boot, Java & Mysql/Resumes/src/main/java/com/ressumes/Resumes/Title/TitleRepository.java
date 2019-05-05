package com.ressumes.Resumes.Title;

import com.ressumes.Resumes.Person.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TitleRepository extends JpaRepository<Title, Integer> {


}