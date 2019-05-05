package com.ressumes.Resumes.Education;


import com.ressumes.Resumes.Education.Education;
import com.ressumes.Resumes.Education.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/educationapi")
public class EducationController {

    @Autowired
    EducationService educationService;

    @GetMapping(path="/education")
    public @ResponseBody Iterable<Education> getAllEducations() {
        // This returns a JSON or XML with the users
        return educationService.getAllEducation();
    }

    @RequestMapping(method=RequestMethod.POST, value="/education")
    public @ResponseBody String updateEducation(@RequestBody Education education) {
        educationService.updateEducation(education);
        return "Record Created";
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/education/{id}")
    @ResponseBody
    public String deleteEducation(@PathVariable int id){
        educationService.deleteEducation(id);
        return "Record Deleted";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/education")
    @ResponseBody
    public String postEducation(@RequestBody Education education) {
        educationService.updateEducation(education);
        return "Record Updated";
    }
    @RequestMapping(method=RequestMethod.GET, value="/education/{id}")
    public @ResponseBody Optional<Education> getEducationById(@PathVariable(value = "id") Integer educationID) {
        return educationService.EducationById(educationID);
    }
}
