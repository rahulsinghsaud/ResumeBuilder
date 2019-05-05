package com.ressumes.Resumes.Person;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PersonService {
    @Autowired
    private PersonRepository personRepository;
    public List<Person> getAllPerson(){
        List<Person> persons = new ArrayList<>();
        personRepository.findAll().forEach(persons ::add);
        return persons;
    }

    public void addPerson(Person person) {
        personRepository.save(person);
    }

    public void updatePerson(Person person) {
        personRepository.save(person);
    }

    public void deletePerson(int PersonID) {
        personRepository.delete(personRepository.getOne(PersonID));

    }

    public Optional<Person> getOnePerson(int PersonID) {
        Optional<Person> p = personRepository.findById(PersonID);
        return p ;

    }

    public Optional<Person> PersonById(int personID) {
        return personRepository.findById(personID);
    }
}
