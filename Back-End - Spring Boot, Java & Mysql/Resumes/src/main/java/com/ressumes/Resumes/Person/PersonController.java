package com.ressumes.Resumes.Person;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/personapi")
public class PersonController {

    @Autowired
    PersonService personService;

    @GetMapping(path="/person")
    public @ResponseBody Iterable<Person> getAllPersons() {
        // This returns a JSON or XML with the users
        return personService.getAllPerson();
    }

    @RequestMapping(method=RequestMethod.POST, value="/person")
    public @ResponseBody String updatePerson(@RequestBody Person person) {
        personService.updatePerson(person);
        return "Record Created";
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/person/{id}")
    @ResponseBody
    public String deletePerson(@PathVariable int id){
        personService.deletePerson(id);
        return "Record Deleted";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/person")
    @ResponseBody
    public String postPerson(@RequestBody Person person) {
        personService.updatePerson(person);
        return "Record Updated";
    }
    @RequestMapping(method=RequestMethod.GET, value="/person/{id}")
    public @ResponseBody Optional<Person> getPersonById(@PathVariable(value = "id") Integer personID) {
        return personService.PersonById(personID);
    }
}
