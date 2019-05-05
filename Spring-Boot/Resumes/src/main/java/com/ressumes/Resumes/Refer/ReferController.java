package com.ressumes.Resumes.Refer;


import com.ressumes.Resumes.Refer.Refer;
import com.ressumes.Resumes.Refer.ReferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path="/referapi")
public class ReferController {

    @Autowired
    ReferService referService;

    @GetMapping(path="/refer")
    public @ResponseBody Iterable<Refer> getAllRefers() {
        // This returns a JSON or XML with the users
        return referService.getAllRefer();
    }

    @RequestMapping(method=RequestMethod.POST, value="/refer")
    public @ResponseBody String updateRefer(@RequestBody Refer refer) {
        referService.updateRefer(refer);
        return "Record Created";
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/refer/{id}")
    @ResponseBody
    public String deleteRefer(@PathVariable int id){
        referService.deleteRefer(id);
        return "Record Deleted";
    }

    @RequestMapping(method=RequestMethod.PUT, value="/refer")
    @ResponseBody
    public String postRefer(@RequestBody Refer refer) {
        referService.updateRefer(refer);
        return "Record Updated";
    }
    @RequestMapping(method=RequestMethod.GET, value="/refer/{id}")
    public @ResponseBody Optional<Refer> getReferById(@PathVariable(value = "id") Integer referID) {
        return referService.ReferById(referID);
    }
}
