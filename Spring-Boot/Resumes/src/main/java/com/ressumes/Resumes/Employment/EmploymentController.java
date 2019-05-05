package com.ressumes.Resumes.Employment;


import com.ressumes.Resumes.Employment.Employment;
import com.ressumes.Resumes.Employment.EmploymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/employmentapi")
public class EmploymentController {

    @Autowired
    EmploymentService employmentService;

    @GetMapping(path="/employment")
    public @ResponseBody Iterable<Employment> getAllEmployments() {
        // This returns a JSON or XML with the users
        return employmentService.getAllEmployment();
    }

    @RequestMapping(method=RequestMethod.POST, value="/employment")
    public @ResponseBody String updateEmployment(@RequestBody Employment employment) {
        employmentService.updateEmployment(employment);
        return "Record Created";
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/employment/{id}")
    @ResponseBody
    public String deleteEmployment(@PathVariable int id){
        employmentService.deleteEmployment(id);
        return "Record Deleted";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/employment")
    @ResponseBody
    public String postEmployment(@RequestBody Employment employment) {
        employmentService.updateEmployment(employment);
        return "Record Updated";
    }
    @RequestMapping(method=RequestMethod.GET, value="/employment/{id}")
    public @ResponseBody Optional<Employment> getEmploymentById(@PathVariable(value = "id") Integer employmentID) {
        return employmentService.EmploymentById(employmentID);
    }
}
