package com.ressumes.Resumes.Title;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/titleapi")
public class TitleController {

    @Autowired
    TitleService titleService;

    @GetMapping(path="/title")
    public @ResponseBody Iterable<Title> getAllTitles() {
        // This returns a JSON or XML with the users
        return titleService.getAllTitle();
    }

    @RequestMapping(method=RequestMethod.POST, value="/title")
    public @ResponseBody String updateTitle(@RequestBody Title title) {
        titleService.updateTitle(title);
        return "Record Created";
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/title/{id}")
    @ResponseBody
    public String deleteTitle(@PathVariable int id){
        titleService.deleteTitle(id);
        return "Record Deleted";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/title")
    @ResponseBody
    public String postTitle(@RequestBody Title Title) {
        titleService.updateTitle(Title);
        return "Record Updated";
    }
    @RequestMapping(method=RequestMethod.GET, value="/title/{id}")
    public @ResponseBody Optional<Title> getTitleById(@PathVariable(value = "id") Integer TitleID) {
        return titleService.TitleById(TitleID);
    }
}
