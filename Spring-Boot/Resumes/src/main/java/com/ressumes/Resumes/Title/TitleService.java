package com.ressumes.Resumes.Title;

import com.ressumes.Resumes.Person.Person;
import com.ressumes.Resumes.Person.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TitleService {
    @Autowired
    private TitleRepository titleRepository;
    public List<Title> getAllTitle(){
        List<Title> titles = new ArrayList<>();
        titleRepository.findAll().forEach(titles ::add);
        return titles;
    }

    public void addTitle(Title title) {
        titleRepository.save(title);
    }

    public void updateTitle(Title title) {
        titleRepository.save(title);
    }

    public void deleteTitle(int titleID) {
        titleRepository.delete(titleRepository.getOne(titleID));

    }

    public Optional<Title> getOneTitle(int titleID) {
        Optional<Title> t = titleRepository.findById(titleID);
        return t ;

    }

    public Optional<Title> TitleById(int titleID) {
        return titleRepository.findById(titleID);
    }
}
