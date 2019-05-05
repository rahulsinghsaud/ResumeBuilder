package com.ressumes.Resumes.Skills;


import com.ressumes.Resumes.Skills.Skills;
import com.ressumes.Resumes.Skills.SkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/skillsapi")
public class SkillsController {

    @Autowired
    SkillsService skillsService;

    @GetMapping(path="/skills")
    public @ResponseBody Iterable<Skills> getAllSkills() {
        // This returns a JSON or XML with the users
        return skillsService.getAllSkills();
    }

    @RequestMapping(method=RequestMethod.POST, value="/skills")
    public @ResponseBody String updateSkills(@RequestBody Skills skills) {
        skillsService.updateSkills(skills);
        return "Record Created";
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/skills/{id}")
    @ResponseBody
    public String deleteSkills(@PathVariable int id){
        skillsService.deleteSkills(id);
        return "Record Deleted";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/skills")
    @ResponseBody
    public String postSkills(@RequestBody Skills skills) {
        skillsService.updateSkills(skills);
        return "Record Updated";
    }
    @RequestMapping(method=RequestMethod.GET, value="/skills/{id}")
    public @ResponseBody Optional<Skills> getSkillsById(@PathVariable(value = "id") Integer skillsID) {
        return skillsService.SkillsById(skillsID);
    }
}
